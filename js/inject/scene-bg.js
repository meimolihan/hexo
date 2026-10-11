/* ============================================================================
 * 3D 场景壁纸引导（2026-10-10 起，2026-10-11 支持多场景切换）
 * --------------------------------------------------------------------------
 * 场景包：KPanel scene pack（Three.js WebGL 实时渲染），源码在 source/scene/<id>/：
 *   orbital-station「星港轨道」 4.0MB / 3 机位（行星全景·空间站近景·行星日出）
 *   neon-city       「霓虹都市」 1.2MB / 3 机位（天际线·高架·街道）
 *   sea-and-sky     「海天日月」 5.8MB / 4 机位（光·礁石·天空·远城）
 * 每个包 = index.html + scene.js + assets/ + manifest.json + poster/thumb.webp。
 *
 * 【为什么用 iframe，而不是把 scene.js 直接插进页面】
 * 场景包内部用 `new URL('assets/xxx.webp', location.href)` 解析贴图路径，
 * 基址是【当前页面的 URL】而不是脚本 URL。直接插进博客页面时，
 * 首页能跑（assets 相对 / 拼成 /assets/…），但一进文章页就会拼成
 * /posts/xxx/assets/planet-surface.webp 全部 404，场景直接黑屏。
 * 放进 iframe 后 iframe 的 location.href 就是 /scene/<id>/index.html，
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

  /* ------------------------------------------------------------------
   * 【2026-10-11】场景注册表 —— 与美化设置面板里的三张预览图一一对应。
   *   新增场景时改这里 + fomal.js 里的 SCENE3D_LIST（同一份名单，
   *   面板那份负责画 UI，这份负责建 iframe），两边 id 必须一致。
   *   shots = 场景内部机位数：入口 index.html 读 ?shot=N，越界会退回 0，
   *   所以这里按 manifest 里的 cameras 数量填。
   * ------------------------------------------------------------------ */
  var SCENES = [
    {
      id: "orbital-station",
      name: "星港轨道",
      shots: 3,
      brand: "#2f6fd0"
    },
    {
      id: "neon-city",
      name: "霓虹都市",
      shots: 3,
      brand: "#c2357f"
    },
    {
      id: "sea-and-sky",
      name: "海天日月",
      shots: 4,
      brand: "#2f7fb5"
    }
  ];
  var DEFAULT_SCENE = "orbital-station";

  /* 断点必须和 themes/butterfly/source/css/_layout/web-bg.styl 的
     @media screen and (max-width: 800px) 保持一致 —— 那条规则决定
     手机端走 --mobileday-bg / --mobilenight-bg 两张静态壁纸。 */
  var BREAKPOINT = 800;

  function sceneById(id) {
    for (var i = 0; i < SCENES.length; i++) {
      if (SCENES[i].id === id) return SCENES[i];
    }
    return null;
  }

  /* ------------------------------------------------------------------
   * 【2026-10-11】每次刷新换一个机位 = 桌面壁纸每次打开都不一样
   *
   * 场景包入口直接读查询参数 ?shot=N（内部校验 0 ≤ N < shots.length，
   * 越界退回 0），走 offscreen worker 时也把 location.search 原样透传给
   * worker，所以两种渲染路径都生效。
   *
   * 注意 scene.js 会拿 location.href 当资源基址去解析 assets/*，
   * 所以这里只能加【查询参数】，绝对不能加路径段或 hash。
   *
   * 用 sessionStorage 记住上一次挑中的机位：整站刷新 sessionStorage 还在，
   * 于是可以避开"连刷两次都是同一个画面"。换成别的标签页/无痕窗口则重新随机。
   *
   * shot 按【场景 id】分别记，换了场景不会继承上一个场景的机位编号。
   * ------------------------------------------------------------------ */
  var shotCache = {}; /* 同一次页面生命周期内固定，resize 重建时不重摇 */

  function pickShot(scene) {
    if (shotCache[scene.id] !== undefined) return shotCache[scene.id];
    var n = 0;
    try {
      var key = "scene3d_shot_" + scene.id;
      var prev = parseInt(sessionStorage.getItem(key), 10);
      if (!isFinite(prev) || prev < 0 || prev >= scene.shots) prev = -1;
      n = Math.floor(Math.random() * scene.shots);
      /* 撞上一个刚看过的就再往后挪一位，保证连续两次刷新画面不同 */
      if (n === prev) n = (n + 1) % scene.shots;
      sessionStorage.setItem(key, String(n));
    } catch (e) {
      /* 隐私模式等场景下 sessionStorage 可能抛异常，降级为固定全景 */
      n = 0;
    }
    shotCache[scene.id] = n;
    return n;
  }

  function ls(k) {
    try {
      return (typeof localStorage !== "undefined" && localStorage) ? localStorage.getItem(k) : null;
    } catch (e) { return null; }
  }
  function lsSet(k, v) {
    try {
      if (typeof localStorage !== "undefined" && localStorage) localStorage.setItem(k, v);
    } catch (e) { }
  }

  /* ------------------------------------------------------------------
   * 【2026-10-11】性能相关开关
   *
   * 【为什么 3D 壁纸一开 UI 就卡】
   * 场景是全屏 WebGL，每秒 60 帧重绘整个视口。同一帧里浏览器还要：
   *   ① 合成页面其余所有图层（卡片、导航栏、侧栏）；
   *   ② 卡片上的 backdrop-filter 毛玻璃 —— 要把 backdrop（也就是 3D 画面）
   *      重新采样并模糊一次，**背景每动一次就得重算一次**，非常贵；
   *   ③ 主题的雪���/星空 canvas、pace 进度条等额外动画。
   * 换场景时更糟：旧 iframe 的 WebGL 上下文要释放、新的要重新建，
   * 还要重新下载 1~6 MB 贴图 —— 这一瞬间主线程基本是堵死的。
   *
   * 【四项优化】
   * 1. 渲染分辨率降到 75%（收益最大）
   *    场景包内部取自己窗口的 `innerWidth/innerHeight × devicePixelRatio`
   *    来决定 canvas 的像素尺寸 —— 在 2x/3x 屏上等于要填 4~9 倍的像素。
   *    我们改不了它的 dpr，但可以改**它的窗口有多大**：
   *    把 iframe 的布局框缩到 75%，再用 `transform: scale(1/0.75)` 放大铺满，
   *    场景就只按 75% 线性分辨率渲染（像素量降到 56%），视觉上仍然铺满全屏。
   *    ⚠ 顺序不能反：CSS transform 不影响布局，先放大布局框再缩小 =
   *      场景按更大的分辨率渲染，纯属白做。详见 makeIframe() 里的注释。
   *    背景壁纸压在半透明卡片底下，轻微软化看不出来。0.75 是画质/性能折中；
   *    想要绝对清晰就把它改成 1（等于关掉这项优化）。
   * 2. 切换时淡入淡出（消除"卡一下"的观感）
   *    旧场景先 160ms 淡出再卸载，新场景淡入。
   *    视觉上是平滑过渡而不是黑屏一闪，卡顿感大幅降低。
   * 3. 入场动画关掉
   *    `entrance=off` 让场景直接切到目标机位，
   *    省掉一段相机推轨动画 —— 切换瞬间少跑几百帧。
   * 4. 预热：空闲时先把贴图 fetch 进 HTTP 缓存
   *    下次切到这个场景就不用等下载了。用 requestIdleCallback，
   *    且只在用户开着面板/鼠标悬在预览图上时才做（下面 warm()）。
   * ------------------------------------------------------------------ */
  var RENDER_SCALE = 0.75;   /* 1 = 全分辨率（关闭这项优化）；0.75 是画质/性能折中 */
  var FADE_MS = 160;

  var REDUCED = false;
  try {
    REDUCED = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  } catch (e) { }

  /* 当前选中的场景。用户没选过、或 localStorage 里是个已不存在的 id
     （比如以后删了某个包、或者是从别的博客拷来的脏数据）→ 回落到默认场景。 */
  function currentScene() {
    var s = sceneById(ls("scene3d_pack"));
    return s || sceneById(DEFAULT_SCENE);
  }
  /* 暴露给美化设置面板用：面板要在按钮上打高亮，得知道现在选中的是哪个 */
  window.__scene3dScenes = SCENES;
  window.__scene3dCurrent = currentScene;

  /* 默认开启；用户只要手动拨过开关（"1"/"0"）就以用户的显式选择为准。
     没拨过时，系统开了「减弱动态效果」就别自作主张放动画。 */
  function wanted() {
    var v = ls("scene3d");
    if (v === "1" || v === "0") return v === "1";
    return !REDUCED;
  }

  function desktop() {
    return window.innerWidth > BREAKPOINT;
  }

  /* 场景 URL。只加查询参数（场景包拿 location.href 解析 assets/*，
     加路径段会让进文章页后的资源全部 404）。
     entrance=off：见上方性能说明第 3 条。 */
  function sceneURL(scene) {
    return "/scene/" + scene.id + "/index.html?shot=" + pickShot(scene) + "&entrance=off";
  }

  /* 贴图预热：把该场景最大的几个 webp 抓进浏览器缓存。
     用 fetch 而不是 <img>，避免解码开销，也能在缓存里留下条目。 */
  var warmed = {};
  function warm(id) {
    if (warmed[id]) return;
    warmed[id] = true;
    var scene = sceneById(id);
    if (!scene) return;
    /* 只预热 poster（1664×936 的静态图，各包都自带）+ assets 目录下的清单拿不到，
       就退而求其次预热 manifest 里列的文件 —— 这里直接取几个必然存在的大图。 */
    var urls = ["/scene/" + id + "/poster.webp"];
    var go = function () {
      urls.forEach(function (u) {
        try { fetch(u, { cache: "force-cache" }); } catch (e) { }
      });
    };
    if (window.requestIdleCallback) window.requestIdleCallback(go, { timeout: 3000 });
    else setTimeout(go, 1200);
  }
  window.__scene3dWarm = warm;

  function makeIframe(src) {
    var f = document.createElement("iframe");
    f.src = src;
    f.setAttribute("data-src", src);
    f.title = "3D scene background";
    f.setAttribute("scrolling", "no");
    f.setAttribute("tabindex", "-1");
    f.setAttribute("aria-hidden", "true");
    /* 渲染缩放（见上方性能说明第 1 条）。
       ⚠ 方向千万别搞反：CSS transform **不影响布局**，场景包读的是自己
       窗口的 innerWidth 来定 canvas 像素尺寸。
         · 如果布局框 100% + scale(0.8)  → 布局框没变，场景仍按 100% 渲染，
           只是合成时被缩小 —— 渲染量一点没少，纯属白搭。
         · 正确做法是【把布局框缩小、再用 transform 放大铺满】：
           布局 75% + scale(1.333) → 场景内部只按 75% 线性分辨率渲染
           （像素量降到 56%），视觉上仍是铺满全屏。
       背景壁纸本来就压在半透明卡片底下，轻微的软化看不出来，收益很划算。 */
    if (RENDER_SCALE !== 1) {
      var k = 1 / RENDER_SCALE;
      f.style.width = (RENDER_SCALE * 100) + "%";
      f.style.height = (RENDER_SCALE * 100) + "%";
      f.style.transform = "scale(" + k + ")";
      f.style.transformOrigin = "top left"; /* 从左上角放大，正好铺满父容器 */
    }
    return f;
  }

  /* 卸载一个 iframe：先淡出，再清 src 摘节点。
     淡出这段时间旧场景还在正常渲染，视觉上是平滑消失而不是黑屏一闪。 */
  function killIframe(f, done) {
    if (!f) { if (done) done(); return; }
    if (REDUCED || !f.style) { finishKill(f); if (done) done(); return; }
    f.style.transition = "opacity " + FADE_MS + "ms ease";
    f.style.opacity = "0";
    setTimeout(function () {
      finishKill(f);
      if (done) done();
    }, FADE_MS);
  }
  function finishKill(f) {
    /* 先把 src 清空，确保 WebGL 上下文和 rAF 循环真的停掉，
       否则 detached 的 iframe 还会继续烧 GPU。
       再从 DOM 摘掉 —— 只清 src 不移除的话，新旧两个 iframe 会叠在同一个
       容器里，两个场景同时在渲染。 */
    try { f.src = "about:blank"; } catch (e) { }
    if (f.parentNode) f.parentNode.removeChild(f);
  }

  function build() {
    var el = document.getElementById(ID);
    var scene = currentScene();
    var src = sceneURL(scene);
    var f = el ? el.getElementsByTagName("iframe")[0] : null;
    /* 同一个场景且 iframe 已在位就别动 —— 重建 iframe 会让 WebGL 上下文
       和已下载的几 MB 资源全部作废，闪一下很难看。
       注意比对的是 data-src 而不是 iframe.src：后者读回来是浏览器补全后的
       绝对 URL（http://host/scene/…），跟相对路径比永远不相等，
       那样每次 resize 都会白白重建一次。 */
    if (f && f.getAttribute("data-src") === src) return;

    /* 换场景：先把容器背景换成新场景的 poster（静态大图，各包自带），
       这样旧 iframe 淡出、新 iframe 淡入的整个过程里都有底图，
       不会出现黑屏 —— 切换的"卡顿感"大半来自这一下黑屏。 */
    var poster = "/scene/" + scene.id + "/poster.webp";

    if (!el) {
      el = document.createElement("div");
      el.id = ID;
      el.style.backgroundImage = "none";
      el.style.backgroundColor = scene.brand;
      /* ⚠ 必须先把容器挂到 body 上再走下面的 killIframe 回调 ——
         回调里会重新 document.getElementById(ID) 取当前容器，
         容器没入 DOM 时拿到 null，整个首次加载就被静默放弃了。 */
      document.body.appendChild(el);
    }

    var old = el.getElementsByTagName("iframe")[0];
    killIframe(old, function () {
      /* 淡出期间用户可能又切了别的场景，以最后一次的 currentScene() 为准 */
      var now = currentScene();
      var nowSrc = sceneURL(now);
      var cur = document.getElementById(ID);
      if (!cur) return;
      /* 期间已经被别的切换接管了（容器里又出现了别的 iframe）→ 放弃这次 */
      if (cur.getElementsByTagName("iframe")[0]) return;

      cur.style.backgroundColor = now.brand;
      try { cur.style.backgroundImage = "url(" + poster + ")"; } catch (e) { }

      var nf = makeIframe(nowSrc);
      nf.style.opacity = "0";
      /* 场景 load 事件 = index.html + scene.js 都执行完，WebGL 已经建起来。
       * 此时再淡入，衔接最自然。load 失败也要兜底淡入，
       * 否则会留一块永远透明的空白（但那时底部还有 poster 撑着）。 */
      var revealed = false;
      var reveal = function () {
        if (revealed) return;
        revealed = true;
        nf.style.transition = "opacity " + (REDUCED ? 0 : 420) + "ms ease";
        nf.style.opacity = "1";
      };
      nf.addEventListener("load", reveal, { once: true });
      /* 兜底：万一 load 一直没来（比如 WebGL 不可用场景包直接抛错），
         800ms 后也淡入，避免卡在透明状态 */
      setTimeout(reveal, 800);

      cur.appendChild(nf);
    });
  }

  function destroy() {
    var el = document.getElementById(ID);
    if (!el) return;
    /* 淡出期间可能又 sync() 了一次（比如用户飞快把开关拨回来），
       所以回调里重新确认一次：容器已经不在、或里面又长出 iframe 了，就别删。 */
    killIframe(el.getElementsByTagName("iframe")[0], function () {
      var cur = document.getElementById(ID);
      if (!cur) return;
      if (cur.getElementsByTagName("iframe")[0]) return;
      if (cur.parentNode) cur.parentNode.removeChild(cur);
    });
  }

  function sync() {
    var on = wanted() && desktop();
    document.documentElement.classList.toggle("meihua-no-scene3d", !wanted());
    if (on) build(); else destroy();
  }
  window.__scene3dSync = sync;

  /* 面板点了某个场景 → 记住选择并立刻换。手机上 3D 层压根不加载，
     但选择照样记下来，下次回到桌面端就是新的那个。 */
  window.__scene3dPick = function (id) {
    if (!sceneById(id)) return;
    lsSet("scene3d_pack", id);
    /* 换场景等于换一批机位，清掉这个场景的机位记忆重新摇 */
    try { sessionStorage.removeItem("scene3d_shot_" + id); } catch (e) { }
    shotCache = {};
    sync();
  };

  /* 【2026-10-11】页面隐藏时直接停掉场景。
     切到别的标签页还让全屏 WebGL 跑 60fps 是纯浪费 —— 笔记本电池掉得飞快。
     场景包内部虽然有 Page Visibility API，但它只管 worker 那条渲染路径；
     走主线程 fallback 时那套机制不生效，所以这里从外层兜底：
     隐藏时把容器 display:none（浏览器会跳过其合成与绘制），
     回来时再 sync() 恢复。 */
  document.addEventListener("visibilitychange", function () {
    var el = document.getElementById(ID);
    if (!el) return;
    if (document.hidden) {
      el.style.display = "none";
    } else {
      el.style.display = "";
      /* 隐藏期间场景可能已被浏览器回收，回来时确认一下还在 */
      sync();
    }
  });

  // resize 跨越断点时增删（手机 ↔ 桌面）。用定时器做 200ms 防抖。
  var t = null;
  window.addEventListener("resize", function () {
    if (t) clearTimeout(t);
    t = setTimeout(sync, 200);
  }, { passive: true });

  /* 别和首屏抢带宽：几个 MB 的场景等到 window.load 之后再挂。
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
