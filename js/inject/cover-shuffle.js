/*!
 * cover-shuffle —— 「每次刷新，文章封面都换一张」
 * ---------------------------------------------------------------------------
 * 背景：构建期 random_img.js 用 FNV-1a 稳定哈希给每篇文章分配封面（同一篇文章
 *   永远同一张，利于 CDN/浏览器缓存）。但用户想看到的是「刷新一次换一批图」。
 *   稳定分配和刷新换图是矛盾的，所以这里在**客户端**再打乱一次：
 *   只动「默认图池」的封面，手动指定过封面的文章（front-matter 写了 cover，
 *   生成的 URL 不在 /img/cover/ 下）保持原样不被改写。
 *
 * 插入位置很关键：必须放在 inject.bottom 里、lazyload.min.js 之前同步执行。
 *   post_lazyload.js 在构建期把所有 <img src=...> 改写成
 *   src=<1×1 透明 gif> data-lazy-src=<真实地址>，
 *   真正的替换由 main.js 的 new LazyLoad({data_src:'lazy-src'}) 完成。
 *   我们在它之前把 data-lazy-src 换掉 → 浏览器首次请求的就是新图，
 *   零闪烁、零额外请求（占位图从未被真正下载过）。
 *
 * pjax：带 data-pjax，翻页后对新插入的封面再洗一次牌。
 *   脚本整体包在 IIFE 里、顶层无 let/const —— pjax 会二次执行同一份代码，
 *   顶层 let/const 会直接 SyntaxError 让整个脚本废掉。
 */
(function () {
  'use strict'

  /* 24 张本地默认图池，与 _config.butterfly.yml → cover.default_cover 一一对应。
     改那边记得同步改这里（构建期产物里不会自动带过来）。 */
  var POOL = [
    '/img/cover/cover-01.webp', '/img/cover/cover-02.webp',
    '/img/cover/cover-03.webp', '/img/cover/cover-04.webp',
    '/img/cover/cover-05.webp', '/img/cover/cover-06.webp',
    '/img/cover/cover-07.webp', '/img/cover/cover-08.webp',
    '/img/cover/cover-09.webp', '/img/cover/cover-10.webp',
    '/img/cover/cover-11.webp', '/img/cover/cover-12.webp',
    '/img/cover/cover-13.webp', '/img/cover/cover-14.webp',
    '/img/cover/cover-15.webp', '/img/cover/cover-16.webp',
    '/img/cover/cover-17.webp', '/img/cover/cover-18.webp',
    '/img/cover/cover-19.webp', '/img/cover/cover-20.webp',
    '/img/cover/cover-21.webp', '/img/cover/cover-22.webp',
    '/img/cover/cover-23.webp', '/img/cover/cover-24.webp'
  ]
  var KEY = 'cover_shuffle_prev'
  var N = POOL.length

  /* 洗牌范围：列表封面 / 归档 / 侧栏最近文章 / 首页轮播。
     用属性选择器而不是类名兜底，避免误伤文章正文里的插图。 */
  var SEL = 'img[data-lazy-src*="/img/cover/cover-"],' +
            'img.article-cover,' +
            '.blog-slider__img img,' +
            '.article-sort-item-img img,' +
            '.aside-list-item a.thumbnail img'

  function idxOf (url) {
    for (var i = 0; i < N; i++) if (POOL[i] === url) return i
    return -1
  }

  function shuffle () {
    var imgs = document.querySelectorAll(SEL)
    if (!imgs.length || N < 2) return

    /* 读上一次（本次页面生命周期之前）的分配结果，按下标一一对应。
       同一页里出现次数会变，所以只比对前 min(len) 个，多的直接不管。 */
    var prev = []
    try { prev = JSON.parse(sessionStorage.getItem(KEY) || '[]') } catch (e) { prev = [] }
    if (!Array.isArray(prev)) prev = []

    var next = []
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i]
      /* 已经被本脚本处理过（同一次 pjax 回来容器还在）→ 跳过 */
      if (img.getAttribute('data-cover-shuffled') === '1') continue

      var cur = idxOf(img.getAttribute('data-lazy-src') || img.getAttribute('src') || '')
      var pick = Math.floor(Math.random() * N)
      /* 连续两次刷新不要出现同一张 */
      if (pick === prev[i]) pick = (pick + 1) % N
      /* 顺带也别和它自己的构建期默认撞了（撞了等于这次没换） */
      if (pick === cur) pick = (pick + 1) % N

      img.setAttribute('data-cover-shuffled', '1')
      /* src 已经是真实图（LazyLoad 抢先跑完了，或这张图在视口内被立刻加载）：
         只改 data-lazy-src 没人再看它，src 必须一起换。
         否则 src 还是 1×1 占位 gif，等 LazyLoad 搬 data-lazy-src 即可。 */
      var src = img.getAttribute('src') || ''
      var loaded = src && src.indexOf('data:image/gif') !== 0
      if (loaded) {
        img.setAttribute('src', POOL[pick])
      } else {
        img.setAttribute('data-lazy-src', POOL[pick])
      }
      next[i] = pick
    }

    if (!next.length) return
    try { sessionStorage.setItem(KEY, JSON.stringify(next)) } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', shuffle)
  } else {
    shuffle()
  }
})()
