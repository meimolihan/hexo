/* ============================================================================
 * source/js/inject/beauty-boot.js —— 美化模块首屏预置脚本
 * ----------------------------------------------------------------------------
 * 本文件对应 _config.butterfly.yml 的 inject.head 段（原位置是内联的beautyBoot script，
 * 这里抽成独立文件），配置里是同步 <script src>（没有加 defer），
 * 所以执行时机与内联时完全一样：head 解析期、首帧之前。
 * ----------------------------------------------------------------------------
 * 首屏预置：提前把 localStorage 里的美化设置写进上面这些 style 标签，
 * 消除「刷新时先闪默认壁纸 / 默认字体，再跳成自定义」的一帧闪烁。
 * 取值与 source/js/fomal.js 的美化模块默认值逐字一致（键缺失时用 fomal.js 的应用默认值）。
 *
 * 【注意】这里不能依赖任何 fomal.js 里的函数（那些要等defer 的 fomal.js 执行后才存在），
 * 所以全部写成自包含的 IIFE，重复的键名映射也在这里内联一份。
 * ========================================================================== */

(function () {
  var d = document.documentElement;
  function ls(k) {
    try {
      var s = (typeof localStorage !== "undefined" && localStorage) ? localStorage : null;
      return s ? s.getItem(k) : null;
    } catch (e) { return null; }
  }
  function def(v, dv) { return (v == null || v === "" || v === "undefined" || v === "null") ? dv : v; }
  function tag(id, txt) { var el = document.getElementById(id); if (el) el.textContent = txt; }

  var SAME = ";--darkmode-bg:";

  // 1) 自定义壁纸
  var bg = def(ls("blogbg"), "default").replace(/^\s+|\s+$/g, "");
  if (bg !== "default" && /^(#|url\(|linear-gradient|radial-gradient|https?:)/.test(bg)) {
    tag("defineBg", ":root{--default-bg:" + bg + SAME + bg + ";--mobileday-bg:" + bg + ";--mobilenight-bg:" + bg + ";}");
  } else {
    tag("defineBg", ":root{--default-bg: url(https://picsum.photos/id/1015/1920/1080);" +
      "--darkmode-bg:url(https://picsum.photos/id/1044/1920/1080);" +
      "--mobileday-bg: url(https://picsum.photos/id/1018/1920/1080);" +
      "--mobilenight-bg: url(https://picsum.photos/id/1039/1920/1080);}");
  }

  // 2) 卡片透明度
  tag("transPercent", ":root{--trans-light: rgba(253, 253, 253, " + def(ls("transNum"), "92") +
    "%) !important; --trans-dark: rgba(25, 25, 25, " + def(ls("transNum"), "92") + "%) !important} ");

  // 3) 背景滤镜（模糊 / 饱和度 / 对比度）
  if (def(ls("bgFilterOn"), "1") === "0") {
    tag("bgFilterParam", ":root{--bg-filter:none;}");
  } else {
    var bfv = ls("bgFilterVal");
    if (bfv) tag("bgFilterParam", ":root{--bg-filter:" + bfv + ";}");
  }

  // 4) 主题色（与 fomal.js 里的 map 保持一致）
  var cmap = {
    red: "rgb(241, 71, 71)", orange: "rgb(241, 162, 71)", yellow: "rgb(241, 238, 71)",
    green: "rgb(57, 197, 187)", blue: "rgb(102, 204, 255)", heoblue: "rgb(66, 90, 239)",
    darkblue: "rgb(97, 100, 159)", purple: "rgb(179, 71, 241)", pink: "rgb(237, 112, 155)",
    black: "rgb(0, 0, 0)"
  };
  var tc = def(ls("themeColor"), "green");
  if (cmap[tc]) tag("themeColor", ":root{--theme-color:" + cmap[tc] + " !important}");

  // 5) 字体（含代码块字体）
  // 默认值必须与 fomal.js 的 FONT_DEFAULT 保持一致（2026-10-09 由 LXGW 改为 YSHST）。
  // 两处不一致会导致「首次访问」和「刷新已有设置」显示不同字体。
  var ft = def(ls("font"), "YSHST");
  if (ft === "default") {
    // 系统默认字体栈：与 fomal.js 的 setFont 逐字一致。原来只写 -apple-system，
    // 这个关键字在 Windows 上不存在，会让只声明 var(--global-font) 的标题掉到浏览器默认字体。
    var sysStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif";
    d.style.setProperty("--global-font", sysStack);
    var st = document.createElement("style");
    st.textContent = "body{font-family:" + sysStack + "}";
    (document.head || document.getElementsByTagName("head")[0]).appendChild(st);
  } else {
    d.style.setProperty("--global-font", ft);
  }
  var cft = def(ls("codeFont"), "JetBrainsMono");
  d.style.setProperty("--code-font", cft);

  // 6) 右侧部件 / 顶栏常驻 / 侧栏显隐 / 侧栏位置 / 霓虹灯 / 帧率
  tag("rightSide", ":root{--rightside-display: " + (def(ls("rs"), "block") === "none" ? "none" : "block") + "}");

  // 6.5) 灯笼挂件 / 音乐播放（2026-10-09 新增）。
  // 和fomal.js 的 applyLantern()/applyMusic() 一致：靠反向类控制显示。
  // 这里必须在 head 阶段就挂上 —— 否则关掉的状态要等 fomal.js（defer）执行完才生效，
  // 页面会先闪一下挂件再消失。
  // 2026-10-09：灯笼默认改为关闭（默认值为 "0"），新访客首次访问不再显示灯笼；
  // 默认值必须和 fomal.js 里 applyLantern()/initItem() 的写法保持一致，否则会闪一下。
  if (def(ls("lantern"), "0") !== "1") d.classList.add("meihua-no-lantern");
  if (def(ls("music"), "1") !== "1") d.classList.add("meihua-no-music");

  // 6.6) 挂绳猫咪 / 页脚宠物（2026-10-10 新增）。
  // 同样必须在 head 阶段挂反向类：挂绳猫咪是 nekoScroll 用 inline style 显示的，
  // 等 fomal.js（defer）跑完再挂会先闪一下猫咪。默认值为 neko="0"（关）、pet="1"（开），
  // 必须和 fomal.js 的 applyNeko()/applyPet()/initItem() 完全一致。
  if (def(ls("neko"), "0") !== "1") d.classList.add("meihua-no-neko");
  if (def(ls("pet"), "1") !== "1") d.classList.add("meihua-no-pet");

  if (def(ls("nav"), "1") === "0") {
    tag("nav-display", ":root{--nav-fixed-display:none;--nav-visible-display:inline-flex;}");
  } else {
    tag("nav-display", ":root{--nav-fixed-display:inline-flex;--nav-visible-display:none;}");
    // 顶栏常驻：直接给 #page-header 挂 .meihua-nav-fixed，不等滚动到阈值
    d.classList.add("meihua-nav-fixed");
  }

  if (def(ls("aside"), "1") === "0") {
    d.classList.add("hide-aside");
    tag("aside-show", ":root{--aside-content-display: none;}");
  } else {
    tag("aside-show", ":root{--aside-content-display: block;}");
  }

  if (def(ls("asidePos"), "1") === "0") {
    d.classList.add("meihua-aside-left");
    d.classList.remove("meihua-aside-right");
    tag("aside-pos", ":root{--first-child-order: 1;--aside-order: 0;--aside-padding-left: 0px;--aside-padding-right: 15px;}");
  } else {
    d.classList.remove("meihua-aside-left");
    d.classList.add("meihua-aside-right");
    tag("aside-pos", ":root{--first-child-order: 0;--aside-order: 1;--aside-padding-left: 15px;--aside-padding-right: 0px;}");
  }

  if (def(ls("light"), "true") === "false") {
    tag("menu_shadow", ":root{--menu-shadow: none;}");
  } else {
    tag("menu_shadow", ":root{--menu-shadow: 0 0 1px var(--theme-color);}");
  }

  var fp = document.getElementById("fps");
  if (fp) fp.style.display = (def(ls("fpson"), "1") === "0") ? "none" : "block";
})();