/* ============================================================================
 * perf-boot.js — 纯性能引导脚本（2026-10-09）
 *
 * 定位：必须挂在 inject.head 的**最前面**（早于 beauty-boot.js 与所有业务脚本），
 *       因为它要包装 window.addEventListener，只有先执行才能拦截到后续注册的监听。
 *
 * 约束：零业务侵入 —— 不改动 Butterfly / fomal.js 的任何业务逻辑、判断与顺序，
 *       只做两件纯粹的性能事：
 *         1) resize 回调统一防抖（避免拖动窗口/转屏时几十次同步布局计算）
 *         2) scroll 监听统一 passive（消除滚动阻塞）
 *         3) 页面不可见时给 <html> 挂 .perf-hidden，由 CSS 暂停常驻装饰动画
 *
 * 不做的事（避免破坏功能）：
 *   - 不把 touchmove / wheel 改成 passive：Fancybox 灯箱滑动、右键菜单依赖
 *     preventDefault，改成 passive 会让页面跟着一起滚，属于功能变化。
 *   - 不拦截 setInterval / requestAnimationFrame：那是业务逻辑，动了就侵入了。
 * ==========================================================================*/
(function () {
  'use strict';

  var RESIZE_WAIT = 120; // 防抖窗口：人眼感知不到 120ms 的重排延迟，但能砍掉 90%+ 的回调
  var origAdd = window.addEventListener.bind(window);
  var origRemove = window.removeEventListener.bind(window);

  // 保存「原函数 -> 包装函数」的映射，保证 removeEventListener 仍能正确解绑
  var wrapMap = window.__perfWrapMap || (window.__perfWrapMap = []);

  window.addEventListener = function (type, fn, opts) {
    if (typeof fn !== 'function') return origAdd(type, fn, opts);

    /* 优化问题#8：resize 高频回调统一 120ms 防抖，不改变任何业务逻辑，零业务侵入｜Hexo Butterfly */
    if (type === 'resize' && !fn.__perfDebounced) {
      var timer = null;
      var wrapped = function (e) {
        clearTimeout(timer);
        timer = setTimeout(function () { fn(e); }, RESIZE_WAIT);
      };
      wrapped.__perfDebounced = true;
      fn.__perfDebounced = true;
      wrapMap.push([fn, wrapped]);
      return origAdd(type, wrapped, opts);
    }

    /* 优化问题#8：scroll 监听统一 passive，消除滚动阻塞，零业务侵入｜Hexo Butterfly */
    // 仅在调用方没有显式传 opts 时才补 passive，绝不覆盖已有的 { passive: false }
    if (type === 'scroll' && opts == null) {
      return origAdd(type, fn, { passive: true });
    }

    return origAdd(type, fn, opts);
  };

  window.removeEventListener = function (type, fn, opts) {
    if (typeof fn === 'function' && type === 'resize') {
      for (var i = 0; i < wrapMap.length; i++) {
        if (wrapMap[i][0] === fn) {
          return origRemove(type, wrapMap[i][1], opts);
        }
      }
    }
    return origRemove(type, fn, opts);
  };

  /* 优化问题#9：页面不可见时挂 .perf-hidden，配合 CSS 暂停常驻动画，零业务侵入｜Hexo Butterfly */
  function syncHiddenFlag() {
    var root = document.documentElement;
    if (!root) return;
    // 页面已隐藏时用户看不到任何画面，暂停动画不存在视觉差异
    root.classList.toggle('perf-hidden', document.hidden === true);
  }
  document.addEventListener('visibilitychange', syncHiddenFlag, { passive: true });
  syncHiddenFlag();
})();
