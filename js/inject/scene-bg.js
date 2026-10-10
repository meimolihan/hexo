/* ============================================================================
 * 3D 场景壁纸引导（2026-10-10）
 * --------------------------------------------------------------------------
 * 场景包：orbital-station「星港轨道」（KPanel scene pack，Three.js WebGL 实时渲染）
 * 源码：source/scene/orbital-station/（index.html + scene.js + assets/，约 4 MB）
 *
 * 【为什么用 iframe，而不是把 scene.js 直接插进页面】
 * 场景包内部用 `new URL('assets/xxx.webp', location.href)` 解析贴图路径，
 * 基址是【当前页面的 URL】而不是脚本 URL。直接插进博客页面时，
 * 首页能跑（assets 相对 / 拼成 /assets/…），但一进文章页就会拼成
 * /posts/xxx/assets/planet-surface.webp 全部 404，场景直接黑屏。
 * 放进 iframe 后 iframe 的 location.href 就是 /scene/orbital-station/index.html，
 * 无论外层页面在哪一级路径，资源都能正确解析。
 *
 * 【为什么不用 CSS 背景】
 * 它是逐帧 render 的 WebGL 画布，不是图片，CSS 的 url() 承载不了。
 *
 * 【层级】#scene3d-bg 固定在 z-index:-998 —— 主题 #web_bg 是 -999，
 * 所以 3D 层盖住静态壁纸、又在所有内容之下；pointer-events:none 保证不挡点击。
 * 关闭开关时整个容器被移除，静态壁纸自动露出来。
 *
 * 【pjax】本脚本在 inject.bottom 且不带 data-pjax，只在首次加载执行一次；
 * 容器挂在 <body> 上（不在 pjax 替换的 #body-wrap 里），翻页时场景不会重启。
 * 但 fomal.js 带 defer 且面板开关要回调它，所以把同步函数挂到 window 上。
 * 顶层用 IIFE 包住，重复执行也不会污染全局。
 * ========================================================================== */
(function () {
  if (window.__scene3dBooted) return;
  window.__scene3dBooted = true;

  var ID = "scene3d-bg";
  var SRC = "/scene/orbital-station/index.html";
  /* 断点必须和 themes/butterfly/source/css/_layout/web-bg.styl 的
     @media screen and (max-width: 800px) 保持一致 —— 那条规则决定
     手机端走 --mobileday-bg / --mobilenight-bg 两张静态壁纸。 */
  var BREAKPOINT = 800;

  function ls(k) {
    try {
      return (typeof localStorage !== "undefined" && localStorage) ? localStorage.getItem(k) : null;
    } catch (e) { return null; }
  }

  /* 默认开启；用户只要手动拨过开关（"1"/"0"）就以用户的显式选择为准。
     没拨过时，系统开了「减弱动态效果」就别自作主张放动画。 */
  function wanted() {
    var v = ls("scene3d");
    if (v === "1" || v === "0") return v === "1";
    try {
      if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    } catch (e) { }
    return true;
  }

  function desktop() {
    return window.innerWidth > BREAKPOINT;
  }

  function build() {
    if (document.getElementById(ID)) return;
    var box = document.createElement("div");
    box.id = ID;
    var f = document.createElement("iframe");
    f.src = SRC;
    f.title = "3D scene background";
    f.setAttribute("scrolling", "no");
    f.setAttribute("tabindex", "-1");
    f.setAttribute("aria-hidden", "true");
    box.appendChild(f);
    document.body.appendChild(box);
  }

  function destroy() {
    var el = document.getElementById(ID);
    /* 先清空 iframe 的 src 再移除，确保 WebGL 上下文和 rAF 循环真的停掉，
       否则有些浏览器里 detached 的 iframe 还会继续烧 GPU。 */
    if (!el) return;
    var f = el.getElementsByTagName("iframe")[0];
    if (f) { try { f.src = "about:blank"; } catch (e) { } }
    if (el.parentNode) el.parentNode.removeChild(el);
  }

  function sync() {
    var on = wanted() && desktop();
    document.documentElement.classList.toggle("meihua-no-scene3d", !wanted());
    if (on) build(); else destroy();
  }
  window.__scene3dSync = sync;

  // resize 跨越断点时增删（手机 ↔ 桌面）。用定时器做 200ms 防抖。
  var t = null;
  window.addEventListener("resize", function () {
    if (t) clearTimeout(t);
    t = setTimeout(sync, 200);
  }, { passive: true });

  /* 别和首屏抢带宽：4 MB 的场景等到 window.load 之后再挂。
     用 requestIdleCallback 让开主线程，不支持的浏览器退化为 300ms 延时。 */
  function boot() {
    var go = function () {
      if (window.requestIdleCallback) {
        window.requestIdleCallback(function () { sync(); }, { timeout: 2000 });
      } else {
        setTimeout(sync, 300);
      }
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
  }

  boot();
})();
