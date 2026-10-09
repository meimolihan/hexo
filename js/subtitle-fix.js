/* ============================================================================
 * 站点副标题「一言」请求的容错覆盖2026-10-09
 * ---------------------------------------------------------------------------
 * 【问题】
 * 主题模板 themes/butterfly/layout/includes/third-party/subtitle.pug 在
 * subtitle.source = 1 时生成这样一段：
 *     function subtitleType () {
 *       fetch('https://v1.hitokoto.cn')
 *         .then(r => r.json())
 *         .then(data => { ... })          // ← 没有 .catch()
 *     }
 * 而 hitokoto 这个第三方服务实测不稳定：连续 5 次请求里有 1 次直接超时 20 秒，
 * 响应耗时常见 3-7 秒。fetch 一旦超时/断网，由于链路上没有 .catch()，
 * 就会抛出未捕获的 Promise 异常：
 *     Uncaught (in promise) TypeError: Failed to fetch
 *       at subtitleType
 * 副标题区域同时会一直空着（没有兜底文案）。
 *
 * 【做法】
 * 不改主题文件（改了会被主题更新覆盖），而是在它之后定义一个同名的
 * subtitleType —— 后定义的全局函数会覆盖先前的，逻辑完全照搬主题，
 * 只补三件事：
 *   1. AbortController 超时 6秒：宁可放弃，也不要让控制台报未捕获异常；
 *   2. .catch() 兜底：失败时回落到_config 里的静态副标题，不留空白；
 *   3. 校验响应：hitokoto 偶尔返回空body，response.json() 会抛。
 *
 * 【为什么用 6秒】
 * 实测该服务正常响应 1.5-3 秒，偶发 7 秒。6 秒是个折中：
 * 够覆盖绝大多数正常请求，又不会让访客盯着空白副标题等太久。
 * ========================================================================== */
(function () {
  'use strict';

  // 拿主题生成的静态副标题作为兜底文案（拿不到就退化为空）
  var FALLBACK = (typeof window.__meihuaSubFallback === 'string')
    ? window.__meihuaSubFallback
    : '';

  var TIMEOUT = 6000;

  function renderTyped(sub) {
    var el = document.getElementById('subtitle');
    if (!el) return;
    if (typeof Typed === 'function') {
      window.typed = new Typed('#subtitle', {
        strings: sub,
        startDelay: 300,
        typeSpeed: 150,
        loop: true,
        backSpeed: 50
      });
    } else {
      el.innerHTML = sub[0];
    }
  }

  window.subtitleType = function () {
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = setTimeout(function () {
      // 到点仍未返回就主动中断，走 catch 分支
      if (ctrl) { try { ctrl.abort(); } catch (e) { /* 忽略 */ } }
    }, TIMEOUT);

    var opts = ctrl ? { signal: ctrl.signal } : undefined;

    fetch('https://v1.hitokoto.cn', opts)
      .then(function (response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function (data) {
        clearTimeout(timer);
        if (!data || !data.hitokoto) throw new Error('返回内容为空');
        var sub = [];
        sub.unshift(data.hitokoto, '出自 ' + (data.from || '一言'));
        renderTyped(sub);
      })
      .catch(function (err) {
        // 走到这里说明：超时 /断网 / 返回空 / HTTP 非 2xx —— 一律静默降级。
        // 不再抛未捕获异常，控制台保持干净；副标题退回静态文案。
        clearTimeout(timer);
        if (FALLBACK) {
          var el = document.getElementById('subtitle');
          if (el && typeof Typed !== 'function') el.innerHTML = FALLBACK;
        }
        console.warn('一言接口不可用，副标题已降级为静态文案：', err && err.message ? err.message : err);
      });
  };

  // 主题模板在脚本里已经调用过一次 subtitleType()，这里覆盖定义后，
  // 若页面尚未渲染出副标题（上次请求失败），用兜底文案补上。
  document.addEventListener('DOMContentLoaded', function () {
    var el = document.getElementById('subtitle');
    if (el && !el.innerHTML.trim() && FALLBACK) el.innerHTML = FALLBACK;
  });
})();