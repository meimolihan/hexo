/* 阅读进度 start */
document.addEventListener('pjax:complete', function () {
  window.onscroll = percent;
});
document.addEventListener('DOMContentLoaded', function () {
  window.onscroll = percent;
});
// 页面百分比
function percent() {

  // 先让菜单栏消失
  try {
    rmf.showRightMenu(false);
    $('.rmMask').attr('style', 'display: none');
  } catch (err) {

  }

  let a = document.documentElement.scrollTop, // 卷去高度
    b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round(a / b * 100), // 计算百分比
    btn = document.querySelector("#go-up"); // 获取按钮

  if (result < 95) { // 如果阅读进度小于95% 就显示百分比
    btn.childNodes[0].style.display = 'none'
    btn.childNodes[1].style.display = 'block'
    btn.childNodes[1].innerHTML = result + '<span>%</span>';
  } else { // 如果大于95%就显示回到顶部图标
    btn.childNodes[1].style.display = 'none'
    btn.childNodes[0].style.display = 'block'
  }
}
/* 阅读进度 end */

//----------------------------------------------------------------

/* 导航栏显示标题 start */

document.addEventListener('pjax:complete', tonav);
document.addEventListener('DOMContentLoaded', tonav);
//响应pjax
function tonav() {
  document.getElementById("name-container").setAttribute("style", "display:none");
  var position = $(window).scrollTop();
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > position) {
      document.getElementById("name-container").setAttribute("style", "");
      document.getElementsByClassName("menus_items")[1].setAttribute("style", "display:none!important");
    } else {
      document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
      document.getElementById("name-container").setAttribute("style", "display:none");
    }
    position = scroll;
  });
  //修复没有弄右键菜单的童鞋无法回顶部的问题
  document.getElementById("page-name").innerText = document.title.split(" | 凡凡小站")[0];
}

function scrollToTop() {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}

/* 导航栏显示标题 end */

//----------------------------------------------------------------
/* 欢迎信息 start */
//get请求
// $.ajax({
//   type: 'get',
//   url: 'https://apis.map.qq.com/ws/location/v1/ip',
//   data: {
//     key: 'XTKBZ-ZDHEB-NHGUJ-NIGXO-NDDFE-5SBZB',  // 这里要写你的KEY!!!
//     output: 'jsonp',
//   },
//   dataType: 'jsonp',
//   success: function (res) {
//     ipLoacation = res;
//   }
// })
// function getDistance(e1, n1, e2, n2) {
//   const R = 6371
//   const { sin, cos, asin, PI, hypot } = Math
//   let getPoint = (e, n) => {
//     e *= PI / 180
//     n *= PI / 180
//     return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
//   }
//
//   let a = getPoint(e1, n1)
//   let b = getPoint(e2, n2)
//   let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
//   let r = asin(c / 2) * 2 * R
//   return Math.round(r);
// }
//
// function showWelcome() {
//
//   let dist = getDistance(113.34499552, 23.15537143, ipLoacation.result.location.lng, ipLoacation.result.location.lat); //这里换成自己的经纬度
//   let pos = ipLoacation.result.ad_info.nation;
//   let ip;
//   let posdesc;
//   //根据国家、省份、城市信息自定义欢迎语
//   switch (ipLoacation.result.ad_info.nation) {
//     case "日本":
//       posdesc = "よろしく，一起去看樱花吗";
//       break;
//     case "美国":
//       posdesc = "Let us live in peace!";
//       break;
//     case "英国":
//       posdesc = "想同你一起夜乘伦敦眼";
//       break;
//     case "俄罗斯":
//       posdesc = "干了这瓶伏特加！";
//       break;
//     case "法国":
//       posdesc = "C'est La Vie";
//       break;
//     case "德国":
//       posdesc = "Die Zeit verging im Fluge.";
//       break;
//     case "澳大利亚":
//       posdesc = "一起去大堡礁吧！";
//       break;
//     case "加拿大":
//       posdesc = "拾起一片枫叶赠予你";
//       break;
//     case "中国":
//       pos = ipLoacation.result.ad_info.province + " " + ipLoacation.result.ad_info.city + " " + ipLoacation.result.ad_info.district;
//       ip = ipLoacation.result.ip;
//       switch (ipLoacation.result.ad_info.province) {
//         case "北京市":
//           posdesc = "北——京——欢迎你~~~";
//           break;
//         case "天津市":
//           posdesc = "讲段相声吧。";
//           break;
//         case "河北省":
//           posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";
//           break;
//         case "山西省":
//           posdesc = "展开坐具长三尺，已占山河五百余。";
//           break;
//         case "内蒙古自治区":
//           posdesc = "天苍苍，野茫茫，风吹草低见牛羊。";
//           break;
//         case "辽宁省":
//           posdesc = "我想吃烤鸡架！";
//           break;
//         case "吉林省":
//           posdesc = "状元阁就是东北烧烤之王。";
//           break;
//         case "黑龙江省":
//           posdesc = "很喜欢哈尔滨大剧院。";
//           break;
//         case "上海市":
//           posdesc = "众所周知，中国只有两个城市。";
//           break;
//         case "江苏省":
//           switch (ipLoacation.result.ad_info.city) {
//             case "南京市":
//               posdesc = "这是我挺想去的城市啦。";
//               break;
//             case "苏州市":
//               posdesc = "上有天堂，下有苏杭。";
//               break;
//             default:
//               posdesc = "散装是必须要散装的。";
//               break;
//           }
//           break;
//         case "浙江省":
//           posdesc = "东风渐绿西湖柳，雁已还人未南归。";
//           break;
//         case "河南省":
//           switch (ipLoacation.result.ad_info.city) {
//             case "郑州市":
//               posdesc = "豫州之域，天地之中。";
//               break;
//             case "南阳市":
//               posdesc = "臣本布衣，躬耕于南阳。此南阳非彼南阳！";
//               break;
//             case "驻马店市":
//               posdesc = "峰峰有奇石，石石挟仙气。嵖岈山的花很美哦！";
//               break;
//             case "开封市":
//               posdesc = "刚正不阿包青天。";
//               break;
//             case "洛阳市":
//               posdesc = "洛阳牡丹甲天下。";
//               break;
//             default:
//               posdesc = "可否带我品尝河南烩面啦？";
//               break;
//           }
//           break;
//         case "安徽省":
//           posdesc = "蚌埠住了，芜湖起飞。";
//           break;
//         case "福建省":
//           posdesc = "井邑白云间，岩城远带山。";
//           break;
//         case "江西省":
//           posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";
//           break;
//         case "山东省":
//           posdesc = "遥望齐州九点烟，一泓海水杯中泻。";
//           break;
//         case "湖北省":
//           posdesc = "来碗热干面！";
//           break;
//         case "湖南省":
//           posdesc = "74751，长沙斯塔克。";
//           break;
//         case "广东省":
//           posdesc = "老板来两斤福建人。";
//           break;
//         case "广西壮族自治区":
//           posdesc = "桂林山水甲天下。";
//           break;
//         case "海南省":
//           posdesc = "朝观日出逐白浪，夕看云起收霞光。";
//           break;
//         case "四川省":
//           posdesc = "康康川妹子。";
//           break;
//         case "贵州省":
//           posdesc = "茅台，学生，再塞200。";
//           break;
//         case "云南省":
//           posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天。";
//           break;
//         case "西藏自治区":
//           posdesc = "躺在茫茫草原上，仰望蓝天。";
//           break;
//         case "陕西省":
//           posdesc = "来份臊子面加馍。";
//           break;
//         case "甘肃省":
//           posdesc = "羌笛何须怨杨柳，春风不度玉门关。";
//           break;
//         case "青海省":
//           posdesc = "牛肉干和老酸奶都好好吃。";
//           break;
//         case "宁夏回族自治区":
//           posdesc = "大漠孤烟直，长河落日圆。";
//           break;
//         case "新疆维吾尔自治区":
//           posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";
//           break;
//         case "台湾省":
//           posdesc = "我在这头，大陆在那头。";
//           break;
//         case "香港特别行政区":
//           posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉。";
//           break;
//         case "澳门特别行政区":
//           posdesc = "性感荷官，在线发牌。";
//           break;
//         default:
//           posdesc = "带我去你的城市逛逛吧！";
//           break;
//       }
//       break;
//     default:
//       posdesc = "带我去你的国家逛逛吧。";
//       break;
//   }
//
//   //根据本地时间切换欢迎语
//   let timeChange;
//   let date = new Date();
//   if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>上午好</span>，一日之计在于晨！";
//   else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
//   else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<span>下午好</span>，懒懒地睡个午觉吧！";
//   else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<span>三点几啦</span>，一起饮茶呀！";
//   else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>夕阳无限好！</span>";
//   else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>晚上好</span>，夜生活嗨起来！";
//   else timeChange = "夜深了，早点休息，少熬夜。";
//
//   try {
//     //自定义文本和需要放的位置
//     document.getElementById("welcome-info").innerHTML =
//       `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color:var(--theme-color)">${dist}</span> 公里，当前的IP地址为： <span style="color:var(--theme-color)">${ip}</span>， ${posdesc}</b>`;
//   } catch (err) {
//     // console.log("Pjax无法获取#welcome-info元素🙄🙄🙄")
//   }
// }
// window.onload = showWelcome;
// // 如果使用了pjax在加上下面这行代码
// document.addEventListener('pjax:complete', showWelcome);

/* 欢迎信息 end */

//----------------------------------------------------------------

/* 微博热搜 start */
document.addEventListener('pjax:complete', getWeibo);
document.addEventListener('DOMContentLoaded', getWeibo);

function getWeibo() {
  fetch('').then(data => data.json()).then(data => {  // 这里要写上你的API!!!
    let html = '<style>.weibo-new{background:#ff3852}.weibo-hot{background:#ff9406}.weibo-jyzy{background:#ffc000}.weibo-recommend{background:#00b7ee}.weibo-adrecommend{background:#febd22}.weibo-friend{background:#8fc21e}.weibo-boom{background:#bd0000}.weibo-topic{background:#ff6f49}.weibo-topic-ad{background:#4dadff}.weibo-boil{background:#f86400}#weibo-container{overflow-y:auto;-ms-overflow-style:none;scrollbar-width:none}#weibo-container::-webkit-scrollbar{display:none}.weibo-list-item{display:flex;flex-direction:row;justify-content:space-between;flex-wrap:nowrap}.weibo-title{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-right:auto}.weibo-num{float:right}.weibo-hotness{display:inline-block;padding:0 6px;transform:scale(.8) translateX(-3px);color:#fff;border-radius:8px}</style>'
    html += '<div class="weibo-list">'
    let hotness = {
      '爆': 'weibo-boom',
      '热': 'weibo-hot',
      '沸': 'weibo-boil',
      '新': 'weibo-new',
      '荐': 'weibo-recommend',
      '音': 'weibo-jyzy',
      '影': 'weibo-jyzy',
      '剧': 'weibo-jyzy',
      '综': 'weibo-jyzy'
    }
    for (let item of data) {
      html += '<div class="weibo-list-item"><div class="weibo-hotness ' + hotness[(item.hot || '荐')] + '">' + (item.hot || '荐') + '</div>'
        + '<span class="weibo-title"><a title="' + item.title + '"href="' + item.url + '" target="_blank" rel="external nofollow noreferrer" style="color:#a08ed5">' + item.title + '</a></span>'
        + '<div class="weibo-num"><span>' + item.num + '</span></div></div>'
    }
    html += '</div>'
    document.getElementById('weibo-container').innerHTML = html
  }).catch(function (error) {
    console.log(error);
  });
}

/* 微博热搜 end */

//----------------------------------------------------------------

/* 禁用f12与按键防抖 start */
// 防抖全局计时器
let TT = null;    //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间
function debounce(fn, time) {
  if (TT !== null) clearTimeout(TT);
  TT = setTimeout(fn, time);
}

// 复制提醒
document.addEventListener("copy", function () {
  debounce(function () {
    new Vue({
      data: function () {
        this.$notify({
          title: "哎嘿！复制成功🍬",
          message: "",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  }, 300);
})


// f12提醒但不禁用
document.onkeydown = function (e) {
  if (123 == e.keyCode || (e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) || (e.ctrlKey && 85 === e.keyCode)) {
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "你已被发现😜",
            message: "小伙子，扒源记住要遵循GPL协议！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "warning",
            duration: 5000
          });
        }
      })
    }, 300);
  }
};
/* 禁用f12与按键防抖 end */

//----------------------------------------------------------------

/* 雪花特效 start */
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  // 移动端不显示
} else {
  // document.write('<canvas id="snow" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:-2;pointer-events:none"></canvas>');

  window && (() => {
    let e = {
      flakeCount: 50, // 雪花数目
      minDist: 150,   // 最小距离
      color: "255, 255, 255", // 雪花颜色
      size: 1.5,  // 雪花大小
      speed: .5,  // 雪花速度
      opacity: .7,    // 雪花透明度
      stepsize: .5    // 步距
    };
    const t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
      window.setTimeout(e, 1e3 / 60)
    }
      ;
    window.requestAnimationFrame = t;
    const i = document.getElementById("snow"),
      n = i.getContext("2d"),
      o = e.flakeCount;
    let a = -100,
      d = -100,
      s = [];
    i.width = window.innerWidth,
      i.height = window.innerHeight;
    const h = () => {
      n.clearRect(0, 0, i.width, i.height);
      const r = e.minDist;
      for (let t = 0; t < o; t++) {
        let o = s[t];
        const h = a,
          w = d,
          m = o.x,
          c = o.y,
          p = Math.sqrt((h - m) * (h - m) + (w - c) * (w - c));
        if (p < r) {
          const e = (h - m) / p,
            t = (w - c) / p,
            i = r / (p * p) / 2;
          o.velX -= i * e,
            o.velY -= i * t
        } else
          o.velX *= .98,
            o.velY < o.speed && o.speed - o.velY > .01 && (o.velY += .01 * (o.speed - o.velY)),
            o.velX += Math.cos(o.step += .05) * o.stepSize;
        n.fillStyle = "rgba(" + e.color + ", " + o.opacity + ")",
          o.y += o.velY,
          o.x += o.velX,
          (o.y >= i.height || o.y <= 0) && l(o),
          (o.x >= i.width || o.x <= 0) && l(o),
          n.beginPath(),
          n.arc(o.x, o.y, o.size, 0, 2 * Math.PI),
          n.fill()
      }
      t(h)
    }
      , l = e => {
        e.x = Math.floor(Math.random() * i.width),
          e.y = 0,
          e.size = 3 * Math.random() + 2,
          e.speed = 1 * Math.random() + .5,
          e.velY = e.speed,
          e.velX = 0,
          e.opacity = .5 * Math.random() + .3
      }
      ;
    document.addEventListener("mousemove", (e => {
      a = e.clientX,
        d = e.clientY
    }
    )),
      window.addEventListener("resize", (() => {
        i.width = window.innerWidth,
          i.height = window.innerHeight
      }
      )),
      (() => {
        for (let t = 0; t < o; t++) {
          const t = Math.floor(Math.random() * i.width)
            , n = Math.floor(Math.random() * i.height)
            , o = 3 * Math.random() + e.size
            , a = 1 * Math.random() + e.speed
            , d = .5 * Math.random() + e.opacity;
          s.push({
            speed: a,
            velX: 0,
            velY: a,
            x: t,
            y: n,
            size: o,
            stepSize: Math.random() / 30 * e.stepsize,
            step: 0,
            angle: 180,
            opacity: d
          })
        }
        h()
      }
      )()
  }
  )();
}

/* 雪花特效 end */

//----------------------------------------------------------------

/* 星空特效 start */
function dark() {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var n, e, i, h, t = .05,
    s = document.getElementById("universe"),
    o = !0,
    a = "180,184,240",
    r = "226,225,142",
    d = "226,225,224",
    c = [];

  function f() {
    n = window.innerWidth, e = window.innerHeight, i = .216 * n, s.setAttribute("width", n), s.setAttribute("height", e)
  }
  function u() {
    h.clearRect(0, 0, n, e);
    for (var t = c.length, i = 0; i < t; i++) {
      var s = c[i];
      s.move(), s.fadeIn(), s.fadeOut(), s.draw()
    }
  }
  function y() {
    this.reset = function () {
      this.giant = m(3), this.comet = !this.giant && !o && m(10), this.x = l(0, n - 10), this.y = l(0, e), this.r = l(1.1, 2.6), this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t, this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120), this.fadingOut = null, this.fadingIn = !0, this.opacity = 0, this.opacityTresh = l(.2, 1 - .4 * (this.comet + 1 - 1)), this.do = l(5e-4, .002) + .001 * (this.comet + 1 - 1)
    }, this.fadeIn = function () {
      this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do)
    }, this.fadeOut = function () {
      this.fadingOut && (this.fadingOut = !(this.opacity < 0), this.opacity -= this.do / 2, (this.x > n || this.y < 0) && (this.fadingOut = !1, this.reset()))
    }, this.draw = function () {
      if (h.beginPath(), this.giant) h.fillStyle = "rgba(" + a + "," + this.opacity + ")", h.arc(this.x, this.y, 2, 0, 2 * Math.PI, !1); else if (this.comet) {
        h.fillStyle = "rgba(" + d + "," + this.opacity + ")", h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, !1); for (var t = 0; t < 30; t++)h.fillStyle = "rgba(" + d + "," + (this.opacity - this.opacity / 20 * t) + ")", h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2), h.fill()
      } else h.fillStyle = "rgba(" + r + "," + this.opacity + ")", h.rect(this.x, this.y, this.r, this.r);
      h.closePath(), h.fill()
    }, this.move = function () {
      this.x += this.dx, this.y += this.dy, !1 === this.fadingOut && this.reset(), (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0)
    }, setTimeout(function () {
      o = !1
    }, 50)
  }
  function m(t) {
    return Math.floor(1e3 * Math.random()) + 1 < 10 * t
  }
  function l(t, i) {
    return Math.random() * (i - t) + t
  }
  f(), window.addEventListener("resize", f, !1), function () {
    h = s.getContext("2d");
    for (var t = 0; t < i; t++) c[t] = new y, c[t].reset();
    u()
  }(), function t() {
    document.getElementsByTagName('html')[0].getAttribute('data-theme') == 'dark' && u(), window.requestAnimationFrame(t)
  }()
};
dark()
/* 星空特效 end */

//----------------------------------------------------------------

/* 表情放大 start */
document.addEventListener('pjax:complete', function () {
  if (document.getElementById('post-comment')) owoBig();
});
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('post-comment')) owoBig();
});

// 表情放大
function owoBig() {
  let flag = 1, // 设置节流阀
    owo_time = '', // 设置计时器
    m = 3; // 设置放大倍数
  // 创建盒子
  let div = document.createElement('div'),
    body = document.querySelector('body');
  // 设置ID
  div.id = 'owo-big';
  // 插入盒子
  body.appendChild(div)

  // 构造observer
  let observer = new MutationObserver(mutations => {

    for (let i = 0; i < mutations.length; i++) {
      let dom = mutations[i].addedNodes,
        owo_body = '';
      if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
      // 如果需要在评论内容中启用此功能请解除下面的注释
      // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
      else continue;

      // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
      if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
      // 鼠标移入
      owo_body.onmouseover = (e) => {
        if (flag && e.target.tagName == 'IMG') {
          flag = 0;
          // 移入300毫秒后显示盒子
          owo_time = setTimeout(() => {
            let height = e.path[0].clientHeight * m, // 盒子高
              width = e.path[0].clientWidth * m, // 盒子宽
              left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2, // 盒子与屏幕左边距离
              top = e.y - e.offsetY; // 盒子与屏幕顶部距离

            if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10); // 右边缘检测，防止超出屏幕
            if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
            // 设置盒子样式
            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
            // 在盒子中插入图片
            div.innerHTML = `<img src="${e.target.src}">`
          }, 300);
        }
      };
      // 鼠标移出隐藏盒子
      owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
    }

  })
  observer.observe(document.getElementById('post-comment'), { subtree: true, childList: true })
}
/* 表情放大 end */

//----------------------------------------------------------------

/* 随便逛逛 start */
// 随便逛逛
// 发现有时会和当前页面重复，加一个判断
function randomPost() {
  fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
    let ls = data.querySelectorAll('url loc');
    while (true) {
      let url = ls[Math.floor(Math.random() * ls.length)].innerHTML;
      if (location.href == url) continue;
      location.href = url;
      return;
    }
  })
}
/* 随便逛逛 end */

//----------------------------------------------------------------

/* 小猫咪 start */
if (document.body.clientWidth > 992) {
  function getBasicInfo() {
    /* 窗口高度 */
    var ViewH = $(window).height();
    /* document高度 */
    var DocH = $("body")[0].scrollHeight;
    /* 滚动的高度 */
    var ScrollTop = $(window).scrollTop();
    /* 可滚动的高度 */
    var S_V = DocH - ViewH;
    var Band_H = ScrollTop / (DocH - ViewH) * 100;
    return {
      ViewH: ViewH,
      DocH: DocH,
      ScrollTop: ScrollTop,
      Band_H: Band_H,
      S_V: S_V
    }
  };
  function show(basicInfo) {
    if (basicInfo.ScrollTop > 0.001) {
      $(".neko").css('display', 'block');
    } else {
      $(".neko").css('display', 'none');
    }
  }
  (function ($) {
    $.fn.nekoScroll = function (option) {
      var defaultSetting = {
        top: '0',
        scroWidth: 6 + 'px',
        z_index: 9999,
        zoom: 0.9,
        borderRadius: 5 + 'px',
        right: 55.6 + 'px',
        nekoImg: "https://bu.dusays.com/2022/07/20/62d812db74be9.png",
        hoverMsg: "春天啦~",
        color: "var(--theme-color)",
        during: 500,
        blog_body: "body",
      };
      var setting = $.extend(defaultSetting, option);
      var getThis = this.prop("className") !== "" ? "." + this.prop("className") : this.prop("id") !== "" ? "#" +
        this.prop("id") : this.prop("nodeName");
      if ($(".neko").length == 0) {
        this.after("<div class=\"neko\" id=" + setting.nekoname + " data-msg=\"" + setting.hoverMsg + "\"></div>");
      }
      let basicInfo = getBasicInfo();
      $(getThis)
        .css({
          'position': 'fixed',
          'width': setting.scroWidth,
          'top': setting.top,
          'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
          'z-index': setting.z_index,
          'background-color': setting.bgcolor,
          "border-radius": setting.borderRadius,
          'right': setting.right,
          'background-image': 'url(' + setting.scImg + ')',
          'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
          'background-size': 'contain'
        });
      $("#" + setting.nekoname)
        .css({
          'position': 'fixed',
          'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
          'z-index': setting.z_index * 10,
          'right': setting.right,
          'background-image': 'url(' + setting.nekoImg + ')',
        });
      show(getBasicInfo());
      $(window)
        .scroll(function () {
          let basicInfo = getBasicInfo();
          show(basicInfo);
          $(getThis)
            .css({
              'position': 'fixed',
              'width': setting.scroWidth,
              'top': setting.top,
              'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
              'z-index': setting.z_index,
              'background-color': setting.bgcolor,
              "border-radius": setting.borderRadius,
              'right': setting.right,
              'background-image': 'url(' + setting.scImg + ')',
              'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
              'background-size': 'contain'
            });
          $("#" + setting.nekoname)
            .css({
              'position': 'fixed',
              'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
              'z-index': setting.z_index * 10,
              'right': setting.right,
              'background-image': 'url(' + setting.nekoImg + ')',
            });
          if (basicInfo.ScrollTop == basicInfo.S_V) {
            $("#" + setting.nekoname)
              .addClass("showMsg")
          } else {
            $("#" + setting.nekoname)
              .removeClass("showMsg");
            $("#" + setting.nekoname)
              .attr("data-msg", setting.hoverMsg);
          }
        });
      this.click(function (e) {
        btf.scrollToDest(0, 500)
      });
      $("#" + setting.nekoname)
        .click(function () {
          btf.scrollToDest(0, 500)
        });
      return this;
    }
  })(jQuery);

  $(document).ready(function () {
    //部分自定义
    $("#myscoll").nekoScroll({
      bgcolor: 'rgb(0 0 0 / .5)', //背景颜色，没有绳子背景图片时有效
      borderRadius: '2em',
      zoom: 0.9
    }
    );
    //自定义（去掉以下注释，并注释掉其他的查看效果）
    /*
    $("#myscoll").nekoScroll({
        nekoname:'neko1', //nekoname，相当于id
        nekoImg:'img/猫咪.png', //neko的背景图片
        scImg:"img/绳1.png", //绳子的背景图片
        bgcolor:'#1e90ff', //背景颜色，没有绳子背景图片时有效
        zoom:0.9, //绳子长度的缩放值
        hoverMsg:'你好~喵', //鼠标浮动到neko上方的对话框信息
        right:'100px', //距离页面右边的距离
        fontFamily:'楷体', //对话框字体
        fontSize:'14px', //对话框字体的大小
        color:'#1e90ff', //对话框字体颜色
        scroWidth:'8px', //绳子的宽度
        z_index:100, //不用解释了吧
        during:1200, //从顶部到底部滑动的时长
    });
    */
  })
}

/* 小猫咪 end */

//----------------------------------------------------------------

/* 右键菜单 start */
function setMask() {
  //设置遮罩
  if (document.getElementsByClassName("rmMask")[0] != undefined)
    return document.getElementsByClassName("rmMask")[0];
  mask = document.createElement('div');
  mask.className = "rmMask";
  mask.style.width = window.innerWidth + 'px';
  mask.style.height = window.innerHeight + 'px';
  mask.style.background = '#fff';
  mask.style.opacity = '.0';
  mask.style.position = 'fixed';
  mask.style.top = '0';
  mask.style.left = '0';
  mask.style.zIndex = 998;
  document.body.appendChild(mask);
  document.getElementById("rightMenu").style.zIndex = 19198;
  return mask;
}

function insertAtCursor(myField, myValue) {

  //IE 浏览器
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
    sel.select();
  }

  //FireFox、Chrome等
  else if (myField.selectionStart || myField.selectionStart == '0') {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;

    // 保存滚动条
    var restoreTop = myField.scrollTop;
    myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);

    if (restoreTop > 0) {
      myField.scrollTop = restoreTop;
    }

    myField.focus();
    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
  } else {
    myField.value += myValue;
    myField.focus();
  }
}

let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
  let $rightMenu = $('#rightMenu');
  $rightMenu.css('top', x + 'px').css('left', y + 'px');

  if (isTrue) {
    $rightMenu.show();
  } else {
    $rightMenu.hide();
  }
}

rmf.copyWordsLink = function () {
  let url = window.location.href
  let txa = document.createElement("textarea");
  txa.value = url;
  document.body.appendChild(txa)
  txa.select();
  document.execCommand("Copy");
  document.body.removeChild(txa);
}
rmf.switchReadMode = function () {
  const $body = document.body
  $body.classList.add('read-mode')
  const newEle = document.createElement('button')
  newEle.type = 'button'
  newEle.className = 'fas fa-sign-out-alt exit-readmode'
  $body.appendChild(newEle)

  function clickFn() {
    $body.classList.remove('read-mode')
    newEle.remove()
    newEle.removeEventListener('click', clickFn)
  }

  newEle.addEventListener('click', clickFn)
}

//复制选中文字
rmf.copySelect = function () {
  document.execCommand('Copy', false, null);
}

//回到顶部
rmf.scrollToTop = function () {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}

document.body.addEventListener('touchmove', function () {

}, { passive: false });

function popupMenu() {
  window.oncontextmenu = function (event) {
    // if (event.ctrlKey) return true;

    // 当关掉自定义右键时候直接返回
    if (mouseMode == "off") return true;

    $('.rightMenu-group.hide').hide();
    if (document.getSelection().toString()) {
      $('#menu-text').show();
    }
    if (document.getElementById('post')) {
      $('#menu-post').show();
    } else {
      if (document.getElementById('page')) {
        $('#menu-post').show();
      }
    }
    var el = window.document.body;
    el = event.target;
    var a = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    if (a.test(window.getSelection().toString()) && el.tagName != "A") {
      $('#menu-too').show()
    }
    if (el.tagName == 'A') {
      $('#menu-to').show()
      rmf.open = function () {
        if (el.href.indexOf("http://") == -1 && el.href.indexOf("https://") == -1 || el.href.indexOf("yisous.xyz") != -1) {
          pjax.loadUrl(el.href)
        }
        else {
          location.href = el.href
        }
      }
      rmf.openWithNewTab = function () {
        window.open(el.href);
        // window.location.reload();
      }
      rmf.copyLink = function () {
        let url = el.href
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa)
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
      }
    } else if (el.tagName == 'IMG') {
      $('#menu-img').show()
      rmf.openWithNewTab = function () {
        window.open(el.src);
        // window.location.reload();
      }
      rmf.click = function () {
        el.click()
      }
      rmf.copyLink = function () {
        let url = el.src
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa)
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
      }
      rmf.saveAs = function () {
        var a = document.createElement('a');
        var url = el.src;
        var filename = url.split("/")[-1];
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
      $('#menu-paste').show();
      rmf.paste = function () {
        navigator.permissions
          .query({
            name: 'clipboard-read'
          })
          .then(result => {
            if (result.state == 'granted' || result.state == 'prompt') {
              //读取剪贴板
              navigator.clipboard.readText().then(text => {
                console.log(text)
                insertAtCursor(el, text)
              })
            } else {
              Snackbar.show({
                text: '请允许读取剪贴板！',
                pos: 'top-center',
                showAction: false,
              })
            }
          })
      }
    }
    let pageX = event.clientX + 10;
    let pageY = event.clientY;
    let rmWidth = $('#rightMenu').width();
    let rmHeight = $('#rightMenu').height();
    if (pageX + rmWidth > window.innerWidth) {
      pageX -= rmWidth + 10;
    }
    if (pageY + rmHeight > window.innerHeight) {
      pageY -= pageY + rmHeight - window.innerHeight;
    }
    mask = setMask();
    // 滚动消失的代码和阅读进度有冲突，因此放到readPercent.js里面了
    $(".rightMenu-item").click(() => {
      $('.rmMask').attr('style', 'display: none');
    })
    $(window).resize(() => {
      rmf.showRightMenu(false);
      $('.rmMask').attr('style', 'display: none');
    })
    mask.onclick = () => {
      $('.rmMask').attr('style', 'display: none');
    }
    rmf.showRightMenu(true, pageY, pageX);
    $('.rmMask').attr('style', 'display: flex');
    return false;
  };

  window.addEventListener('click', function () {
    rmf.showRightMenu(false);
  });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  popupMenu()
}
const box = document.documentElement

function addLongtabListener(target, callback) {
  let timer = 0 // 初始化timer

  target.ontouchstart = () => {
    timer = 0 // 重置timer
    timer = setTimeout(() => {
      callback();
      timer = 0
    }, 380) // 超时器能成功执行，说明是长按
  }

  target.ontouchmove = () => {
    clearTimeout(timer) // 如果来到这里，说明是滑动
    timer = 0
  }

  target.ontouchend = () => { // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
    if (timer) {
      clearTimeout(timer)
    }
  }
}

addLongtabListener(box, popupMenu)

// 全屏
rmf.fullScreen = function () {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen();
}

// 右键开关
if (localStorage.getItem("mouse") == undefined) {
  localStorage.setItem("mouse", "on");
}
var mouseMode = localStorage.getItem("mouse");
function changeMouseMode() {
  if (localStorage.getItem("mouse") == "on") {
    mouseMode = "off";
    localStorage.setItem("mouse", "off");
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "右键已切换为【系统默认】🍔",
            // message: "当前鼠标右键已恢复为系统默认！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 300);
  } else {
    mouseMode = "on";
    localStorage.setItem("mouse", "on");
    debounce(function () {
      new Vue({
        data: function () {
          this.$notify({
            title: "右键已切换为【指定样式】🍔",
            // message: "当前鼠标右键已更换为网站指定样式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 300);
 }
}
/* 右键菜单 end */

//----------------------------------------------------------------

/* 控制台输出字符画 start */
var now1 = new Date();

function createtime1() {
  var grt = new Date("08/09/2022 00:00:00"); //此处修改你的建站时间或者网站上线时间
  now1.setTime(now1.getTime() + 250);
  var days = (now1 - grt) / 1000 / 60 / 60 / 24;
  var dnum = Math.floor(days);

  var ascll = [
    `欢迎来到凡凡🥝の小家!`,
    `Future is now 🍭🍭🍭`,
    `
        
███████  ██████  ███    ███  █████  ██      ██   ██  █████  ██    ██ ████████ 
██      ██    ██ ████  ████ ██   ██ ██      ██   ██ ██   ██ ██    ██    ██    
█████   ██    ██ ██ ████ ██ ███████ ██      ███████ ███████ ██    ██    ██    
██      ██    ██ ██  ██  ██ ██   ██ ██      ██   ██ ██   ██ ██    ██    ██    
██       ██████  ██      ██ ██   ██ ███████ ██   ██ ██   ██  ██████     ██   
                                              
`,
    "小站已经苟活",
    dnum,
    "天啦!",
    "©2025 By 凡凡小站",
  ];

  setTimeout(
    console.log.bind(
      console,
      `\n%c${ascll[0]} %c ${ascll[1]} %c ${ascll[2]} %c${ascll[3]}%c ${ascll[4]}%c ${ascll[5]}\n\n%c ${ascll[6]}\n`,
      "color:#39c5bb",
      "",
      "color:#39c5bb",
      "color:#39c5bb",
      "",
      "color:#39c5bb",
      ""
    )
  );
}

createtime1();

function createtime2() {
  var ascll2 = [`NCC2-036`, `调用前置摄像头拍照成功，识别为「大聪明」`, `Photo captured: `, ` 🤪 `];

  setTimeout(
    console.log.bind(
      console,
      `%c ${ascll2[0]} %c ${ascll2[1]} %c \n${ascll2[2]} %c\n${ascll2[3]}`,
      "color:white; background-color:#10bcc0",
      "",
      "",
      'background:url("https://unpkg.zhimg.com/anzhiyu-assets@latest/image/common/tinggge.gif") no-repeat;font-size:450%'
    )
  );

  setTimeout(console.log.bind(console, "%c WELCOME %c 欢迎光临，大聪明", "color:white; background-color:#23c682", ""));

  setTimeout(
    console.warn.bind(
      console,
      "%c ⚡ Powered by 凡凡小站 %c 你正在访问凡凡の小家",
      "color:white; background-color:#f0ad4e",
      ""
    )
  );

  setTimeout(console.log.bind(console, "%c W23-12 %c 系统监测到你已打开控制台", "color:white; background-color:#4f90d9", ""));
  setTimeout(
    console.warn.bind(console, "%c S013-782 %c 你现在正处于监控中", "color:white; background-color:#d9534f", "")
  );
}
createtime2();

// 重写console方法
console.log = function () { };
console.error = function () { };
console.warn = function () { };

/* 控制台输出字符画 end */

//----------------------------------------------------------------

/* 夜间模式切换动画 start */
function switchNightMode() {
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'),
    setTimeout(function () {
      document.querySelector('body').classList.contains('DarkMode') ? (document.querySelector('body').classList.remove('DarkMode'), localStorage.setItem('isDark', '0'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')) : (document.querySelector('body').classList.add('DarkMode'), localStorage.setItem('isDark', '1'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')),
        setTimeout(function () {
          document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
          document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
          setTimeout(function () {
            document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
          }, 1e3);
        }, 2e3)
    })
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  if (nowMode === 'light') {
    // 先设置太阳月亮透明度
    document.getElementById("sun").style.opacity = "1";
    document.getElementById("moon").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("sun").style.opacity = "0";
      document.getElementById("moon").style.opacity = "1";
    }, 1000);

    activateDarkMode()
    saveToLocal.set('theme', 'dark', 2)
    // GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')
    // 延时弹窗提醒
    setTimeout(() => {
      new Vue({
        data: function () {
          this.$notify({
            title: "关灯啦🌙",
            message: "当前已成功切换至夜间模式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 2000)
  } else {
    // 先设置太阳月亮透明度
    document.getElementById("sun").style.opacity = "0";
    document.getElementById("moon").style.opacity = "1";
    setTimeout(function () {
      document.getElementById("sun").style.opacity = "1";
      document.getElementById("moon").style.opacity = "0";
    }, 1000);

    activateLightMode()
    saveToLocal.set('theme', 'light', 2)
    document.querySelector('body').classList.add('DarkMode'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')
    setTimeout(() => {
      new Vue({
        data: function () {
          this.$notify({
            title: "开灯啦🌞",
            message: "当前已成功切换至白天模式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 2000)
  }
  // handle some cases
  typeof utterancesTheme === 'function' && utterancesTheme()
  typeof FB === 'object' && window.loadFBComment()
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
}

/* 夜间模式切换动画 end */

//----------------------------------------------------------------

/* 分享按钮 start */
// 分享本页
function share_() {
  let url = window.location.origin + window.location.pathname
  try {
    // 截取标题
    var title = document.title;
    var subTitle = title.endsWith("| 凡凡小站") ? title.substring(0, title.length - 14) : title;
    navigator.clipboard.writeText('凡凡的站内分享\n标题：' + subTitle + '\n链接：' + url + '\n欢迎来访！🍭🍭🍭');
    new Vue({
      data: function () {
        this.$notify({
          title: "成功复制分享信息🎉",
          message: "您现在可以通过粘贴直接跟小伙伴分享了！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
        // return { visible: false }
      }
    })
  } catch (err) {
    console.error('复制失败！', err);
  }
  // new ClipboardJS(".share", { text: function () { return '标题：' + document.title + '\n链接：' + url } });
  // btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~")
}

// 防抖
function share() {
  debounce(share_, 300);
}

/* 分享按钮 end */

//----------------------------------------------------------------

/* 恶搞标题 start */
//动态标题
var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    //离开当前页面时标签显示内容
    document.title = '👀哪里走~';
    clearTimeout(titleTime);
  } else {
    //返回当前页面时标签显示内容
    document.title = '🐖抓到你～';
    //两秒后变回正常标题
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});
/* 恶搞标题 end */

//----------------------------------------------------------------


/* 农历转换 start */
/**

* @1900-2100区间内的公历、农历互转

* @charset UTF-8

* @Author  jiangjiazhi

* @公历转农历：calendar.solar2lunar(1987,11,01); //[you can ignore params of prefix 0]

* @农历转公历：calendar.lunar2solar(1987,09,10); //[you can ignore params of prefix 0]

*/



/**

* 农历1900-2100的润大小信息表

* @Array Of Property

* @return Hex

*/

var lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, // 1900-1909

  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, // 1910-1919

  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, // 1920-1929

  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, // 1930-1939

  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, // 1940-1949

  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, // 1950-1959

  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, // 1960-1969

  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, // 1970-1979

  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, // 1980-1989

  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0, // 1990-1999

  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, // 2000-2009

  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, // 2010-2019

  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, // 2020-2029

  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, // 2030-2039

  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, // 2040-2049

  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, // 2050-2059

  0x0a2e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, // 2060-2069

  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0, // 2070-2079

  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160, // 2080-2089

  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a2d0, 0x0d150, 0x0f252, // 2090-2099

  0x0d520] // 2100



var solarMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]



/**

* 天干地支之天干速查表

* @Array Of Property trans['甲','乙','丙','丁','戊','己','庚','辛','壬','癸']

* @return Cn string

*/

var Gan = ['\u7532', '\u4e59', '\u4e19', '\u4e01', '\u620a', '\u5df1', '\u5e9a', '\u8f9b', '\u58ec', '\u7678']



/**

* 天干地支之地支速查表

* @Array Of Property

* @trans['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥']

* @return Cn string

*/

var Zhi = ['\u5b50', '\u4e11', '\u5bc5', '\u536f', '\u8fb0', '\u5df3', '\u5348', '\u672a', '\u7533', '\u9149', '\u620c', '\u4ea5']



/**

* 天干地支之地支速查表<=>生肖

* @Array Of Property

* @trans['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪']

* @return Cn string

*/

var Animals = ['\u9f20', '\u725b', '\u864e', '\u5154', '\u9f99', '\u86c7', '\u9a6c', '\u7f8a', '\u7334', '\u9e21', '\u72d7', '\u732a']



/**

* 24节气速查表

* @Array Of Property

* @trans['小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪','冬至']

* @return Cn string

*/

var solarTerm = ['\u5c0f\u5bd2', '\u5927\u5bd2', '\u7acb\u6625', '\u96e8\u6c34', '\u60ca\u86f0', '\u6625\u5206', '\u6e05\u660e', '\u8c37\u96e8', '\u7acb\u590f', '\u5c0f\u6ee1', '\u8292\u79cd', '\u590f\u81f3', '\u5c0f\u6691', '\u5927\u6691', '\u7acb\u79cb', '\u5904\u6691', '\u767d\u9732', '\u79cb\u5206', '\u5bd2\u9732', '\u971c\u964d', '\u7acb\u51ac', '\u5c0f\u96ea', '\u5927\u96ea', '\u51ac\u81f3']



/**

* 1900-2100各年的24节气日期速查表

* @Array Of Property

* @return 0x string For splice

*/

var sTermInfo = ['9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f',

  '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f', 'b027097bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd0b06bdb0722c965ce1cfcc920f',

  'b027097bd097c36b0b6fc9274c91aa', '9778397bd19801ec9210c965cc920e', '97b6b97bd19801ec95f8c965cc920f',

  '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd197c36c9210c9274c91aa',

  '97b6b97bd19801ec95f8c965cc920e', '97bd09801d98082c95f8e1cfcc920f', '97bd097bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec95f8c965cc920e', '97bcf97c3598082c95f8e1cfcc920f',

  '97bd097bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf97c3598082c95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f',

  '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf97c359801ec95f8c965cc920f', '97bd097bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf97c359801ec95f8c965cc920f', '97bd097bd07f595b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9210c8dc2', '9778397bd19801ec9210c9274c920e', '97b6b97bd19801ec95f8c965cc920f',

  '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',

  '97b6b97bd19801ec95f8c965cc920f', '97bd07f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36c9210c9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bd07f1487f595b0b0bc920fb0722',

  '7f0e397bd097c36b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e', '97bcf7f1487f531b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b97bd19801ec9210c965cc920e',

  '97bcf7f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b97bd19801ec9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

  '9778397bd097c36b0b6fc9210c91aa', '97b6b97bd197c36c9210c9274c920e', '97bcf7f0e47f531b0b0bb0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '9778397bd097c36c9210c9274c920e',

  '97b6b7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c36b0b6fc9210c8dc2',

  '9778397bd097c36b0b70c9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc9210c8dc2', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f595b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

  '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc920fb0722', '9778397bd097c36b0b6fc9274c91aa', '97b6b7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9274c91aa',

  '97b6b7f0e47f531b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

  '9778397bd097c36b0b6fc9210c91aa', '97b6b7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '9778397bd097c36b0b6fc9210c8dc2', '977837f0e37f149b0723b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f5307f595b0b0bc920fb0722', '7f0e397bd097c35b0b6fc9210c8dc2',

  '977837f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e37f1487f595b0b0bb0b6fb0722',

  '7f0e397bd097c35b0b6fc9210c8dc2', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722', '977837f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd097c35b0b6fc920fb0722',

  '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14998082b0787b06bd',

  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0b0bb0b6fb0722', '7f0e397bd07f595b0b0bc920fb0722',

  '977837f0e37f14998082b0723b06bd', '7f07e7f0e37f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e397bd07f595b0b0bc920fb0722', '977837f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f595b0b0bb0b6fb0722', '7f0e37f0e37f14898082b0723b02d5',

  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e37f1487f531b0b0bb0b6fb0722',

  '7f0e37f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e37f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e37f14898082b072297c35',

  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722',

  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f149b0723b0787b0721',

  '7f0e27f1487f531b0b0bb0b6fb0722', '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14998082b0723b06bd',

  '7f07e7f0e47f149b0723b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722', '7f0e37f0e366aa89801eb072297c35',

  '7ec967f0e37f14998082b0723b06bd', '7f07e7f0e37f14998083b0787b0721', '7f0e27f0e47f531b0723b0b6fb0722',

  '7f0e37f0e366aa89801eb072297c35', '7ec967f0e37f14898082b0723b02d5', '7f07e7f0e37f14998082b0787b0721',

  '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66aa89801e9808297c35', '665f67f0e37f14898082b0723b02d5',

  '7ec967f0e37f14998082b0787b0721', '7f07e7f0e47f531b0723b0b6fb0722', '7f0e36665b66a449801e9808297c35',

  '665f67f0e37f14898082b0723b02d5', '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721',

  '7f0e36665b66a449801e9808297c35', '665f67f0e37f14898082b072297c35', '7ec967f0e37f14998082b0787b06bd',

  '7f07e7f0e47f531b0723b0b6fb0721', '7f0e26665b66a449801e9808297c35', '665f67f0e37f1489801eb072297c35',

  '7ec967f0e37f14998082b0787b06bd', '7f07e7f0e47f531b0723b0b6fb0721', '7f0e27f1487f531b0b0bb0b6fb0722']



/**

 * 数字转中文速查表

* @Array Of Property

* @trans ['日','一','二','三','四','五','六','七','八','九','十']

* @return Cn string

 */

var nStr1 = ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341']



/**

* 日期转农历称呼速查表

* @Array Of Property

* @trans ['初','十','廿','卅']

* @return Cn string

*/

var nStr2 = ['\u521d', '\u5341', '\u5eff', '\u5345']



/**

* 月份转农历称呼速查表

* @Array Of Property

* @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']

* @return Cn string

*/

var nStr3 = ['\u6b63', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341', '\u51ac', '\u814a']



/**

* 返回农历y年一整年的总天数

* @param lunar Year

 * @return Number

* @eg:var count = calendar.lYearDays(1987) ;//count=387

*/

function lYearDays(y) {

  var i

  var sum = 348

  for (i = 0x8000; i > 0x8; i >>= 1) { sum += (lunarInfo[y - 1900] & i) ? 1 : 0 }

  return (sum + leapDays(y))

}



/**

* 返回农历y年闰月是哪个月；若y年没有闰月 则返回0

* @param lunar Year

* @return Number (0-12)

 * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6

*/

function leapMonth(y) { // 闰字编码 \u95f0

  return (lunarInfo[y - 1900] & 0xf)

}



/**

* 返回农历y年闰月的天数 若该年没有闰月则返回0

* @param lunar Year

* @return Number (0、29、30)

* @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29

*/

function leapDays(y) {

  if (leapMonth(y)) {

    return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29)

  }

  return (0)

}



/**

* 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法

* @param lunar Year

* @return Number (-1、29、30)

 * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29

*/

function monthDays(y, m) {

  if (m > 12 || m < 1) { return -1 }// 月份参数从1至12，参数错误返回-1

  return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29)

}



/**

* 返回公历(!)y年m月的天数

* @param solar Year

* @return Number (-1、28、29、30、31)

* @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30

*/

function solarDays(y, m) {

  if (m > 12 || m < 1) { return -1 } // 若参数错误 返回-1

  var ms = m - 1

  if (ms === 1) { // 2月份的闰平规律测算后确认返回28或29

    return (((y % 4 === 0) && (y % 100 !== 0) || (y % 400 === 0)) ? 29 : 28)

  } else {

    return (solarMonth[ms])

  }

}



/**

* 农历年份转换为干支纪年

* @param  lYear 农历年的年份数

* @return Cn string

*/

function toGanZhiYear(lYear) {

  var ganKey = (lYear - 3) % 10

  var zhiKey = (lYear - 3) % 12

  if (ganKey === 0) ganKey = 10 // 如果余数为0则为最后一个天干

  if (zhiKey === 0) zhiKey = 12 // 如果余数为0则为最后一个地支

  return Gan[ganKey - 1] + Zhi[zhiKey - 1]

}



/**

* 公历月、日判断所属星座

* @param  cMonth [description]

* @param  cDay [description]

* @return Cn string

*/

function toAstro(cMonth, cDay) {

  var s = '\u9b54\u7faf\u6c34\u74f6\u53cc\u9c7c\u767d\u7f8a\u91d1\u725b\u53cc\u5b50\u5de8\u87f9\u72ee\u5b50\u5904\u5973\u5929\u79e4\u5929\u874e\u5c04\u624b\u9b54\u7faf'

  var arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22]

  return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + '\u5ea7' // 座

}



/**

* 传入offset偏移量返回干支

* @param offset 相对甲子的偏移量

* @return Cn string

*/

function toGanZhi(offset) {

  return Gan[offset % 10] + Zhi[offset % 12]

}



/**

* 传入公历(!)y年获得该年第n个节气的公历日期

* @param y公历年(1900-2100)；n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起

* @return day Number

* @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春

*/

function getTerm(y, n) {

  if (y < 1900 || y > 2100) { return -1 }

  if (n < 1 || n > 24) { return -1 }

  var _table = sTermInfo[y - 1900]

  var _info = [

    parseInt('0x' + _table.substr(0, 5)).toString(),

    parseInt('0x' + _table.substr(5, 5)).toString(),

    parseInt('0x' + _table.substr(10, 5)).toString(),

    parseInt('0x' + _table.substr(15, 5)).toString(),

    parseInt('0x' + _table.substr(20, 5)).toString(),

    parseInt('0x' + _table.substr(25, 5)).toString()

  ]

  var _calday = [

    _info[0].substr(0, 1),

    _info[0].substr(1, 2),

    _info[0].substr(3, 1),

    _info[0].substr(4, 2),



    _info[1].substr(0, 1),

    _info[1].substr(1, 2),

    _info[1].substr(3, 1),

    _info[1].substr(4, 2),



    _info[2].substr(0, 1),

    _info[2].substr(1, 2),

    _info[2].substr(3, 1),

    _info[2].substr(4, 2),



    _info[3].substr(0, 1),

    _info[3].substr(1, 2),

    _info[3].substr(3, 1),

    _info[3].substr(4, 2),



    _info[4].substr(0, 1),

    _info[4].substr(1, 2),

    _info[4].substr(3, 1),

    _info[4].substr(4, 2),



    _info[5].substr(0, 1),

    _info[5].substr(1, 2),

    _info[5].substr(3, 1),

    _info[5].substr(4, 2)

  ]

  return parseInt(_calday[n - 1])

}



/**

* 传入农历数字月份返回汉语通俗表示法

* @param lunar month

* @return Cn string

* @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'

*/

function toChinaMonth(m) { // 月 => \u6708

  if (m > 12 || m < 1) { return -1 } // 若参数错误 返回-1

  var s = nStr3[m - 1]

  s += '\u6708' // 加上月字

  return s

}



/**

* 传入农历日期数字返回汉字表示法

* @param lunar day

* @return Cn string

* @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'

*/

function toChinaDay(d) { // 日 => \u65e5

  var s

  switch (d) {

    case 10:

      s = '\u521d\u5341'

      break

    case 20:

      s = '\u4e8c\u5341'

      break

    case 30:

      s = '\u4e09\u5341'

      break

    default:

      s = nStr2[Math.floor(d / 10)]

      s += nStr1[d % 10]

  }

  return (s)

}



/**

* 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”

* @param y year

* @return Cn string

* @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'

*/

function getAnimal(y) {

  return Animals[(y - 4) % 12]

}



/**

* 传入阳历年月日获得详细的公历、农历object信息 <=>JSON

* @param y  solar year

* @param m  solar month

* @param d  solar day

* @return JSON object

* @eg:console.log(calendar.solar2lunar(1987,11,01));

*/

function solar2lunar(y, m, d) { // 参数区间1900.1.31~2100.12.31

  // 年份限定、上限

  if (y < 1900 || y > 2100) {

    return -1 // undefined转换为数字变为NaN

  }

  // 公历传参最下限

  if (y === 1900 && m === 1 && d < 31) {

    return -1

  }

  // 未传参  获得当天

  var objDate = null

  if (!y) {

    objDate = new Date()

  } else {

    objDate = new Date(y, parseInt(m) - 1, d)

  }

  var i

  var leap = 0

  var temp = 0

  // 修正ymd参数

  y = objDate.getFullYear()

  m = objDate.getMonth() + 1

  d = objDate.getDate()

  var offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 86400000

  for (i = 1900; i < 2101 && offset > 0; i++) {

    temp = lYearDays(i)

    offset -= temp

  }

  if (offset < 0) {

    offset += temp; i--

  }



  // 是否今天

  var isTodayObj = new Date()

  var isToday = false

  if (isTodayObj.getFullYear() === y && isTodayObj.getMonth() + 1 === m && isTodayObj.getDate() === d) {

    isToday = true

  }

  // 星期几

  var nWeek = objDate.getDay()

  var cWeek = nStr1[nWeek]

  // 数字表示周几顺应天朝周一开始的惯例

  if (nWeek === 0) {

    nWeek = 7

  }

  // 农历年

  var year = i

  leap = leapMonth(i) // 闰哪个月

  var isLeap = false



  // 效验闰月

  for (i = 1; i < 13 && offset > 0; i++) {

    // 闰月

    if (leap > 0 && i === (leap + 1) && isLeap === false) {

      --i

      isLeap = true; temp = leapDays(year) // 计算农历闰月天数

    } else {

      temp = monthDays(year, i)// 计算农历普通月天数

    }

    // 解除闰月

    if (isLeap === true && i === (leap + 1)) { isLeap = false }

    offset -= temp

  }

  // 闰月导致数组下标重叠取反

  if (offset === 0 && leap > 0 && i === leap + 1) {

    if (isLeap) {

      isLeap = false

    } else {

      isLeap = true; --i

    }

  }

  if (offset < 0) {

    offset += temp; --i

  }

  // 农历月

  var month = i

  // 农历日

  var day = offset + 1

  // 天干地支处理

  var sm = m - 1

  var gzY = toGanZhiYear(year)



  // 当月的两个节气

  // bugfix-2017-7-24 11:03:38 use lunar Year Param `y` Not `year`

  var firstNode = getTerm(y, (m * 2 - 1)) // 返回当月「节」为几日开始

  var secondNode = getTerm(y, (m * 2)) // 返回当月「节」为几日开始



  // 依据12节气修正干支月

  var gzM = toGanZhi((y - 1900) * 12 + m + 11)

  if (d >= firstNode) {

    gzM = toGanZhi((y - 1900) * 12 + m + 12)

  }

  // 传入的日期的节气与否

  var isTerm = false

  var Term = null

  if (firstNode === d) {

    isTerm = true

    Term = solarTerm[m * 2 - 2]

  }

  if (secondNode === d) {

    isTerm = true

    Term = solarTerm[m * 2 - 1]

  }

  // 日柱 当月一日与 1900/1/1 相差天数

  var dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 86400000 + 25567 + 10

  var gzD = toGanZhi(dayCyclical + d - 1)

  // 该日期所属的星座

  var astro = toAstro(m, d)

  return { 'lYear': year, 'lMonth': month, 'lDay': day, 'Animal': getAnimal(year), 'IMonthCn': (isLeap ? '\u95f0' : '') + toChinaMonth(month), 'IDayCn': toChinaDay(day), 'cYear': y, 'cMonth': m, 'cDay': d, 'gzYear': gzY, 'gzMonth': gzM, 'gzDay': gzD, 'isToday': isToday, 'isLeap': isLeap, 'nWeek': nWeek, 'ncWeek': '\u661f\u671f' + cWeek, 'isTerm': isTerm, 'Term': Term, 'astro': astro }

}





var calendarFormatter = {

  // 传入阳历年月日获得详细的公历、农历object信息 <=>JSON

  solar2lunar: function (y, m, d) { // 参数区间1900.1.31~2100.12.31

    return solar2lunar(y, m, d)

  },

  /**

  * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON

  * @param y  lunar year

  * @param m  lunar month

  * @param d  lunar day

  * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]

  * @return JSON object

  * @eg:console.log(calendar.lunar2solar(1987,9,10));

  */

  lunar2solar: function (y, m, d, isLeapMonth) { // 参数区间1900.1.31~2100.12.1

    isLeapMonth = !!isLeapMonth

    if (isLeapMonth && (leapMonth !== m)) { return -1 }// 传参要求计算该闰月公历 但该年得出的闰月与传参的月份并不同

    if (y === 2100 && m === 12 && d > 1 || y === 1900 && m === 1 && d < 31) { return -1 } // 超出了最大极限值

    var day = monthDays(y, m)

    var _day = day

    // bugFix 2016-9-25

    // if month is leap, _day use leapDays method

    if (isLeapMonth) {

      _day = leapDays(y, m)

    }

    if (y < 1900 || y > 2100 || d > _day) { return -1 }// 参数合法性效验



    // 计算农历的时间差

    var offset = 0

    for (var i = 1900; i < y; i++) {

      offset += lYearDays(i)

    }

    var leap = 0

    var isAdd = false

    for (i = 1; i < m; i++) {

      leap = leapMonth(y)

      if (!isAdd) { // 处理闰月

        if (leap <= i && leap > 0) {

          offset += leapDays(y); isAdd = true

        }

      }

      offset += monthDays(y, i)

    }

    // 转换闰月农历 需补充该年闰月的前一个月的时差

    if (isLeapMonth) { offset += day }

    // 1900年农历正月一日的公历时间为1900年1月30日0时0分0秒(该时间也是本农历的最开始起始点)

    var stmap = Date.UTC(1900, 1, 30, 0, 0, 0)

    var calObj = new Date((offset + d - 31) * 86400000 + stmap)

    var cY = calObj.getUTCFullYear()

    var cM = calObj.getUTCMonth() + 1

    var cD = calObj.getUTCDate()

    return solar2lunar(cY, cM, cD)

  }

}

/* 农历转换 end */

//----------------------------------------------------------------

/* 节日弹窗 start */
var d = new Date();
m = d.getMonth() + 1;
dd = d.getDate();
y = d.getFullYear();

// 公祭日
if (m == 9 && dd == 18) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是九一八事变" + (y - 1931).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 7 && dd == 7) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是卢沟桥事变" + (y - 1937).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 12 && dd == 13) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是南京大屠杀" + (y - 1937).toString() + "周年纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 14) {
  document.getElementsByTagName("html")[0].setAttribute("style", "filter: grayscale(60%);");
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今天是世界慰安妇纪念日\n🪔勿忘国耻，振兴中华🪔");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}


// 节假日
if (m == 10 && dd <= 3) {//国庆节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝祖国" + (y - 1949).toString() + "岁生日快乐！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 15) {//搞来玩的，小日子投降
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("小日子已经投降" + (y - 1945).toString() + "年了😃");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 1 && dd == 1) {//元旦节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(y.toString() + "年元旦快乐！🎉");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 3 && dd == 8) {//妇女节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("各位女神们，妇女节快乐！👩");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
l = ["非常抱歉，因为不可控原因，博客将于明天停止运营！", "好消息，日本没了！", "美国垮了，原因竟然是川普！", "微软垮了！", "你的电脑已经过载，建议立即关机！", "你知道吗？站长很喜欢你哦！", "一分钟有61秒哦", "你喜欢的人跟别人跑了！"]
if (m == 4 && dd == 1) {//愚人节，随机谎话
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(l[Math.floor(Math.random() * l.length)]);
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 1) {//劳动节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("劳动节快乐\n为各行各业辛勤工作的人们致敬！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 4) {//青年节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("青年节快乐\n青春不是回忆逝去,而是把握现在！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 5 && dd == 20) {//520
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("今年是520情人节\n快和你喜欢的人一起过吧！💑");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 7 && dd == 1) {//建党节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝中国共产党" + (y - 1921).toString() + "岁生日快乐！");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 9 && dd == 10) {//教师节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("各位老师们教师节快乐！👩‍🏫");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 12 && dd == 25) {//圣诞节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("圣诞节快乐！🎄");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 8 && dd == 11) {//站长生日
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝站长" + (y - 1998).toString() + "岁生日快乐！🥝");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if (m == 6 && dd == 30) {//小猫咪生日
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("祝小猫咪" + (y - 1999).toString() + "岁生日快乐！🐱");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

//传统节日部分

if ((y == 2023 && m == 4 && dd == 5) || (y == 2024 && m == 4 && dd == 4) || (y == 2025 && m == 4 && dd == 4)) {//清明节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("清明时节雨纷纷,一束鲜花祭故人💐");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((y == 2023 && m == 12 && dd == 22) || (y == 2024 && m == 12 && dd == 21) || (y == 2025 && m == 12 && dd == 21)) {//冬至
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("冬至快乐\n快吃上一碗热热的汤圆和饺子吧🧆");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

var lunar = calendarFormatter.solar2lunar();

//农历采用汉字计算，防止出现闰月导致问题

if ((lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初六") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初五") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初四") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初三") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初二") || (lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "初一") || (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "三十") || (lunar["IMonthCn"] == "腊月" && lunar["IDayCn"] == "廿九")) {
  //春节，本来只有大年三十到初六，但是有时候除夕是大年二十九，所以也加上了
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire(y.toString() + "年新年快乐\n🎊祝你心想事成，诸事顺利🎊");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "正月" && lunar["IDayCn"] == "十五")) {
  //元宵节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("元宵节快乐\n送你一个大大的灯笼🧅");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "五月" && lunar["IDayCn"] == "初五")) {
  //端午节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("端午节快乐\n请你吃一条粽子🍙");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "七月" && lunar["IDayCn"] == "初七")) {
  //七夕节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("七夕节快乐\n黄昏后,柳梢头,牛郎织女来碰头");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "八月" && lunar["IDayCn"] == "十五")) {
  //中秋节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("中秋节快乐\n请你吃一块月饼🍪");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}
if ((lunar["IMonthCn"] == "九月" && lunar["IDayCn"] == "初九")) {
  //重阳节
  if (sessionStorage.getItem("isPopupWindow") != "1") {
    Swal.fire("重阳节快乐\n独在异乡为异客，每逢佳节倍思亲");
    sessionStorage.setItem("isPopupWindow", "1");
  }
}

// 切换主题提醒
// if (y == 2022 && m == 12 && (dd >= 18 && dd <= 20)) {
//     if (sessionStorage.getItem("isPopupWindow") != "1") {
//         Swal.fire("网站换成冬日限定主题啦⛄");
//         sessionStorage.setItem("isPopupWindow", "1");
//     }
// }


/* 节日弹窗 end */

//----------------------------------------------------------------

/* 听话鼠标 start */
var CURSOR;

Math.lerp = (a, b, n) => (1 - n) * a + n * b;

const getStyle2 = (el, attr) => {
  try {
    return window.getComputedStyle
      ? window.getComputedStyle(el)[attr]
      : el.currentStyle[attr];
  } catch (e) { }
  return "";
};

// 为了屏蔽异步加载导致无法读取颜色值，这里统一用哈希表预处理
const map = new Map();
map.set('red', "rgb(241, 71, 71)");
map.set('orange', "rgb(241, 162, 71)");
map.set('yellow', "rgb(241, 238, 71)")
map.set('purple', "rgb(179, 71, 241)");
map.set('blue', "rgb(102, 204, 255)");
map.set('gray', "rgb(226, 226, 226)");
map.set('green', "rgb(57, 197, 187)");
map.set('whitegray', "rgb(241, 241, 241)");
map.set('pink', "rgb(237, 112, 155)");
map.set('black', "rgb(0, 0, 0)");
map.set('darkblue', "rgb(97, 100, 159)");
map.set('heoblue', "rgb(66, 90, 239)");

class Cursor {
  constructor() {
    this.pos = { curr: null, prev: null };
    this.pt = [];
    this.create();
    this.init();
    this.render();
  }

  move(left, top) {
    this.cursor.style["left"] = `${left}px`;
    this.cursor.style["top"] = `${top}px`;
  }

  create() {
    if (!this.cursor) {
      this.cursor = document.createElement("div");
      this.cursor.id = "cursor";
      this.cursor.classList.add("hidden");
      document.body.append(this.cursor);
    }
    var el = document.getElementsByTagName('*');
    for (let i = 0; i < el.length; i++)
      if (getStyle2(el[i], "cursor") == "pointer")
        this.pt.push(el[i].outerHTML);
    var colorVal = map.get(localStorage.getItem("themeColor"));
    document.body.appendChild((this.scr = document.createElement("style")));
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='1.0' fill='` + colorVal + `'/></svg>") 4 4, auto}`;
  }

  refresh() {
    this.scr.remove();
    this.cursor.classList.remove("hover");
    this.cursor.classList.remove("active");
    this.pos = { curr: null, prev: null };
    this.pt = [];

    this.create();
    this.init();
    this.render();
  }

  init() {
    document.onmouseover = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
    document.onmouseout = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
    document.onmousemove = e => { (this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 }; this.cursor.classList.remove("hidden"); };
    document.onmouseenter = e => this.cursor.classList.remove("hidden");
    document.onmouseleave = e => this.cursor.classList.add("hidden");
    document.onmousedown = e => this.cursor.classList.add("active");
    document.onmouseup = e => this.cursor.classList.remove("active");
  }

  render() {
    if (this.pos.prev) {
      // 跟踪速度调节
      this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
      this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(() => this.render());
  }
}

(() => {
  CURSOR = new Cursor();
  // 需要重新获取列表时，使用 CURSOR.refresh()
})();

/* 听话鼠标 end */

//----------------------------------------------------------------

/* 新年倒计时 start */
// let newYearTimer = null;
// var newYear = () => {
//   clearTimeout(newYearTimer);
//   if (!document.querySelector('#newYear')) return;
//   // 新年时间戳 and 星期对象
//   let newYear = new Date('2023-01-22 00:00:00').getTime() / 1000,
//     week = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' }
//
//   time();
//
//   // 补零函数
//   function nol(h) { return h > 9 ? h : '0' + h; };
//
//   function time() {
//     // 现在 时间对象
//     let now = new Date();
//
//     // 右下角 今天
//     document.querySelector('#newYear .today').innerHTML = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + week[now.getDay()]
//
//     // 现在与新年相差秒数
//     let second = newYear - Math.round(now.getTime() / 1000);
//
//     // 小于0则表示已经过年
//     if (second < 0) {
//       document.querySelector('#newYear .title').innerHTML = 'Happy New Year!';
//       document.querySelector('#newYear .newYear-time').innerHTML = '<span class="happyNewYear">新年快乐</p>';
//     } else {
//       // 大于0则还未过年
//       document.querySelector('#newYear .title').innerHTML = '距离2023年春节：'
//
//       // 大于一天则直接渲染天数
//       if (second > 86400) {
//         document.querySelector('#newYear .newYear-time').innerHTML = `<span class="day">${Math.ceil(second / 86400)}<span class="unit">天</span></span>`
//       } else {
//         // 小于一天则使用时分秒计时。
//         let h = nol(parseInt(second / 3600));
//         second %= 3600;
//         let m = nol(parseInt(second / 60));
//         second %= 60;
//         let s = nol(second);
//         document.querySelector('#newYear .newYear-time').innerHTML = `<span class="time">${h}:${m}:${s}</span></span>`;
//         // 计时
//         newYearTimer = setTimeout(time, 1000);
//       }
//     }
//   }
//
//   // 元宝飘落
//   jQuery(document).ready(function ($) {
//     $('#newYear').wpSuperSnow({
//       flakes: ['https://tuchuang.voooe.cn/images/2023/01/02/yb1.webp', 'https://tuchuang.voooe.cn/images/2023/01/02/yb2.webp', 'https://tuchuang.voooe.cn/images/2023/01/02/yb3.webp'],
//       totalFlakes: '100',
//       zIndex: '999999',
//       maxSize: '30',
//       maxDuration: '20',
//       useFlakeTrans: false
//     });
//   });
// }
// // Pjax适配：若没有开启Pjax这里直接是newYear()即可
// // 开了Pjax的用以下两句
// document.addEventListener('pjax:complete', newYear);
// document.addEventListener('DOMContentLoaded', newYear);

/* 新年倒计时 end */

//----------------------------------------------------------------

/* 页脚计时器 start */
var now = new Date();
function createtime() {
  // 当前时间
  now.setTime(now.getTime() + 1000);
  var start = new Date("08/01/2022 00:00:00"); // 旅行者1号开始计算的时间
  var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17); // 距离=秒数*速度 记住转换毫秒
  var unit = (dis / 149600000).toFixed(6);  // 天文单位
  // 网站诞生时间
  var grt = new Date("01/01/2025 00:00:00");
  var days = (now - grt) / 1e3 / 60 / 60 / 24,
    dnum = Math.floor(days),
    hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
    hnum = Math.floor(hours);
  1 == String(hnum).length && (hnum = "0" + hnum);
  var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
    mnum = Math.floor(minutes);
  1 == String(mnum).length && (mnum = "0" + mnum);
  var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
    snum = Math.round(seconds);
  1 == String(snum).length && (snum = "0" + snum);
  let currentTimeHtml = "";
  (currentTimeHtml =
    hnum < 18 && hnum >= 9
      ? `<img class='boardsign' src='https://cdn.meimolihan.eu.org/hexo/img/墨不凡-搬砖中.svg' title='什么时候能够实现财富自由呀~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
      : `<img class='boardsign' src='https://cdn.meimolihan.eu.org/hexo/img/墨不凡-休闲中.svg' title='下班了就该开开心心地玩耍~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
    document.getElementById("workboard") &&
    (document.getElementById("workboard").innerHTML = currentTimeHtml);
}
// 设置重复执行函数，周期1000ms
setInterval(() => {
  createtime();
}, 1000);

/*页脚计时器 end */

//----------------------------------------------------------------


/* fps检测 start */
/* 2026-10-09 重构：原来是 IIFE 一开就跑一条常驻 requestAnimationFrame 循环，
   面板里把「帧率监测」关掉只能靠 setTimeout(reload,600) 整页刷新才生效 ——
   采样循环其实关不掉，白白占着一条 rAF。改成 startFps()/stopFps() 可显式启停：
   开关关掉立刻停止采样，不用刷新页面；localStorage 只记录用户偏好。 */
var fpsRunning = false;   // 采样循环是否在跑（幂等开关的依据）
var fpsStop = false;      // 协作式停止标记：下一帧检查到就退出循环
var fpsFrame = 0;         // 当前统计窗口内累计的帧数
var fpsLastTime = 0;      // 当前统计窗口的起点
var fpsLastFrameTime = 0; // 上一帧的时刻

function startFps() {
  if (fpsRunning) return;
  fpsRunning = true;
  fpsStop = false;
  fpsFrame = 0;
  fpsLastTime = Date.now();
  fpsLastFrameTime = Date.now();
  var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
    function (cb) { return window.setTimeout(cb, 1000 / 60); };
  var loop = function () {
    if (fpsStop) { fpsRunning = false; return; }
    var now = Date.now();
    fpsLastFrameTime = now;
    fpsFrame++;
    // 每满 1 秒结算一次：出 FPS 数值 + 一句体感描述
    if (now > 1000 + fpsLastTime) {
      var fps = Math.round((fpsFrame * 1000) / (now - fpsLastTime));
      var panel = document.getElementById("fps");
      if (panel) {
        var kd;
        if (fps <= 5) kd = `<span style="color:#bd0000">卡成ppt🤢</span>`;
        else if (fps <= 15) kd = `<span style="color:red">电竞级帧率😖</span>`;
        else if (fps <= 25) kd = `<span style="color:orange">有点难受😨</span>`;
        else if (fps < 35) kd = `<span style="color:#9338e6">不太流畅🙄</span>`;
        else if (fps <= 45) kd = `<span style="color:#08b7e4">还不错哦😁</span>`;
        else kd = `<span style="color:#39c5bb">十分流畅🤣</span>`;
        panel.innerHTML = `FPS:${fps} ${kd}`;
      }
      fpsFrame = 0;
      fpsLastTime = now;
    }
    rAF(loop);
  };
  rAF(loop);
}

function stopFps() {
  fpsStop = true;   // 标记后由循环自身收尾退出，不直接丢引用
  fpsRunning = false;
}

// 初始化：按用户偏好决定是否采样。默认开。
if (window.localStorage.getItem("fpson") == undefined) {
  window.localStorage.setItem("fpson", "1");
}
var fpsPanelInit = document.getElementById("fps");
if (window.localStorage.getItem("fpson") == "1") {
  startFps();
  if (fpsPanelInit) fpsPanelInit.style.display = "block";
} else {
  stopFps();
  if (fpsPanelInit) fpsPanelInit.style.display = "none";
}
/* fps检测 end */

//----------------------------------------------------------------

/* ============================================================================
 * 美化模块 —— 站点设置面板 / Winbox
 * ----------------------------------------------------------------------------
 * 【本文件目录】顶层声明速查（行号会随后续编辑漂移，找不到就 Ctrl+F 搜函数名）
 *    60   FONT_LIST / FONT_DEFAULT
 *    61   CODE_FONT_LIST / CODE_FONT_DEFAULT
 *    78   fomalNotify()
 *    105  initItem()
 *    139  setFont(n)
 *    164  setCodeFont(n)
 *    173  setFontBorder() / setCodeFontBorder() / markFontBorder()
 *    200  setColor(c)
 *    232  setUniverse() / setUniverse2(c)
 *    250  setSnow()
 *    272  setNav() / addNavClass()
 *    306  reload()
 *    315  toggleRightside()
 *    340  setAside()
 *    364  setAsidePos()
 *    388  curTransNum / curTransMini / setTrans()
 *    405  rangeValueFromX / fireRangeInput / setRangeByX
 *    460  bindRangeJump / initRangeJump
 *    477  isValidBgVal(s)
 *    488  bgValToUrl(s)
 *    496  initBg()
 *    508  resetBg_()
 *    521  changeBg(s)
 *    544  setBg(s)
 *    557  getPicture() / getPicture_()
 *    578  checkImgExists(imgurl)
 *    590  setLight() / changeLight(flag)
 *    615  saveBgFilter()
 *    655  setBgFilter()
 *    668  createWinbox()
 *    690  resetBg()
 *    700  reset()
 *    760  winboxNeedSize()
 *    800  winResize()
 *    815  toggleWinbox()
 * ========================================================================== */

/* ------------------------------ 美化模块 ------------------------------ */

/* 兼容旧键名：老版本把模糊半径存在 blurRad、把「模糊开关」存成 0/1（数字），
   新版统一成 bgFilterVal / bgFilterOn（字符串）。这里做一次性迁移。
   【执行顺序很关键】必须排在下面 reset_5 分支的 initItem() 之前 ——
   initItem() 会把 bgFilterVal / bgFilterOn 直接写成默认值，
   一旦它先跑，本函数里的「目标键已存在就不迁移」判断会把老用户的
   模糊半径整个吞掉（老值 blurRad 被删掉，滤镜参数退回默认）。 */
(function migrateLegacyKeys() {
  var legacyBlur = localStorage.getItem("blurRad");
  var legacyOn = localStorage.getItem("blur");
  if (legacyBlur == undefined && legacyOn == undefined) return;   // 新用户或已迁移过
  if (localStorage.getItem("bgFilterVal") == undefined) {
    var b = legacyBlur == undefined ? 0 : legacyBlur;
    localStorage.setItem("bgFilterVal", `blur(${b}px) saturate(120%) contrast(105%)`);
  }
  if (localStorage.getItem("bgFilterOn") == undefined) {
    localStorage.setItem("bgFilterOn", legacyOn == "0" || legacyOn == 0 ? "0" : "1");
  }
  localStorage.removeItem("blurRad");
  localStorage.removeItem("blur");
})();

// 更新版本需要每个用户都恢复一次默认设置
// 版本号从 reset_4 升到 reset_5：本次新增了背景滤镜、代码块字体、侧栏/顶栏开关，
// 老用户的 localStorage 里没有这些键，面板打开会是一片空白默认值。
if (localStorage.getItem("reset_5") == undefined) {
  localStorage.setItem("reset_5", "1");
  // 清空之前的标记值
  for (var i = 1; i <= 4; i++) {
    localStorage.removeItem("reset_" + i);
  }
  initItem();
  setTimeout(function () {
    fomalNotify({
      title: "提示🍒",
      message: " (｡･∀･)ﾉﾞ美化设置面板已升级（新增背景滤镜 / 代码块字体 / 侧栏与顶栏开关），当前已为您重置所有设置，祝您愉快！",
      position: 'top-left',
      offset: 50,
      showClose: true,
      type: "success",
      duration: 8000
    });
  }, 1500);
}

/* ===== 字体清单 =====
   family 名与 source/css/custom.css 的 @font-face、面板按钮 id（swf_ / swfc_ + family）
   严格一一对应。改字体名要三处一起改。
   常规字体直接当 --global-font 用；代码块字体当 --code-font 用
   （样式表里pre/code 写的是 var(--code-font, JetBrainsMono)）。

   【2026-10-09 默认字体改为 YSHST（面板上标着「优设好身体」）】
   ⚠ 名字对不上：YSHST 这个 @font-face 的 src 实际指向 ZhuZiAWan.woff2，
     用 fontTools 读出该文件真实字体名是「FZSJ-ZHUZAYTE」（方正字迹竹叶体），
     并非真正的「优设好身体」。真正的优设好身体只由字由客户端授权分发，
     公开 CDN 上没有可用源。这里先按面板上显示的名字设默认，
     若要换成真字体，需自备字体文件并改 custom.css 里 YSHST 那条的 src。 */
var FONT_LIST = ["ZhuZiAWan", "HYTMR", "LXGW", "TTQHB", "YSHST", "MiSans", "default"];
var FONT_DEFAULT = "YSHST";
var CODE_FONT_LIST = ["JetBrainsMono", "FiraCode", "SourceCodePro"];
var CODE_FONT_DEFAULT = "JetBrainsMono";

// 共享通知：原来每条提示都 new Vue({...}) 建一个新实例，十来处重复。
// 这里只建一次 Vue 壳（不挂载到页面，纯粹借用 Element 的 $notify），
// 后续全部复用，行为与原来一致但省掉反复实例化。
var notifyVue = null;
function fomalNotify(opts) {
  if (!notifyVue) {
    if (typeof Vue === "undefined") {
      // Element 还没就绪时静默降级，避免整段脚本因一条提示崩掉
      console.warn("[美化] Vue 尚未加载，通知已跳过：", opts && opts.message);
      return;
    }
    notifyVue = new Vue({ data: function () { } });
  }
  notifyVue.$notify(opts);
}

// 恢复 localStorage 默认配置项（同时也是 reset() 唯一的数据来源）
function initItem() {
  localStorage.setItem("blogbg", "default");
  localStorage.setItem("universe", "block");
  localStorage.setItem("fpson", "1");
  localStorage.setItem("transNum", 92);
  localStorage.setItem("font", FONT_DEFAULT);
  localStorage.setItem("codeFont", CODE_FONT_DEFAULT);
  localStorage.setItem("themeColor", "green");
  localStorage.setItem("rs", "block");
  localStorage.setItem("mouse", "on");
  localStorage.setItem("light", "true");
  localStorage.setItem("snow", "none");
  localStorage.setItem("aside", "1");
  localStorage.setItem("asidePos", "1");
  localStorage.setItem("nav", "1");
  // 灯笼默认关闭：与 applyLantern() 的首次访问默认值保持一致（见下方 6.5 节注释）
  localStorage.setItem("lantern", "0");
  localStorage.setItem("music", "1");
  // 挂绳猫咪默认关闭、页脚宠物默认显示：与 applyNeko()/applyPet() 的首次访问默认值一致
  localStorage.setItem("neko", "0");
  localStorage.setItem("pet", "1");
  // 3D 场景壁纸默认开启（仅桌面端生效，手机端由 scene-bg.js 的 800px 断点拦掉）
  localStorage.setItem("scene3d", "1");
  localStorage.setItem("bgFilterOn", "1");
  localStorage.setItem("bgFilterVal", "blur(0px) saturate(108%) contrast(105%)");
}


/* ===== 设置字体 ===== */
// 用白名单校验而不是只判断 undefined：旧版面板留下的已下架字体（MiSans / YSHST）或
// 其它脏值会被清掉，回落到默认值，保证打开面板时永远有一项是高亮的。
if (FONT_LIST.indexOf(localStorage.getItem("font")) < 0) {
  localStorage.setItem("font", FONT_DEFAULT);
}
setFont(localStorage.getItem("font"));
function setFont(n) {
  localStorage.setItem("font", n);
  if (n == "default") {
    // 系统默认 = 完整系统字体栈。原来这里只给 --global-font 写 '-apple-system'，
    // 而 Windows 不认这个关键字，于是只声明 var(--global-font) 的元素
    // （左上角站点名 / 首页大标题 / 副标题）会直接掉到「浏览器默认字体」。
    // 完整栈里 -apple-system / BlinkMacSystemFont 在 Windows 上被跳过，
    // 自动落到 Segoe UI（中文落微软雅黑系）；不要把等宽字体混进正文栈。
    var sysFontStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Lato, Roboto, 'PingFang SC', 'Microsoft JhengHei', 'Microsoft YaHei', sans-serif";
    document.documentElement.style.setProperty('--global-font', sysFontStack);
    document.body.style.fontFamily = sysFontStack;
  }
  else {
    document.documentElement.style.setProperty('--global-font', n);
    document.body.style.fontFamily = "var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif";
  }
  try { setFontBorder(); } catch (err) { }
}

/* ===== 设置代码块字体 ===== */
// 只改 --code-font 变量（样式表里 pre/code 写的是 var(--code-font, JetBrainsMono)）
if (CODE_FONT_LIST.indexOf(localStorage.getItem("codeFont")) < 0) {
  localStorage.setItem("codeFont", CODE_FONT_DEFAULT);
}
setCodeFont(localStorage.getItem("codeFont"));
function setCodeFont(n) {
  localStorage.setItem("codeFont", n);
  document.documentElement.style.setProperty('--code-font', n);
  try { setCodeFontBorder(); } catch (err) { }
}

/* ===== 字体选中高亮 ===== */
// 常规 / 代码两组共用一套逻辑，prefix 区分：常规 = swf_ + family，代码 = swfc_ + family
function setFontBorder() {
  markFontBorder("swf_", localStorage.getItem("font"));
}
function setCodeFontBorder() {
  markFontBorder("swfc_", localStorage.getItem("codeFont"));
}
function markFontBorder(prefix, curKey) {
  var cur = document.getElementById(prefix + curKey);
  // 面板还没打开时找不到节点，直接返回（原来这里会抛错，靠 setFont 外层的 try 兜住）
  if (!cur) return;
  /* 高亮走 CSS 类（.swf-cur，见 source/css/custom.css 末尾），不写内联样式。
     原因：.swf 自己那条 `background-color: white` 在样式表里，
     而面板还套着 #article-container 的 a:not(...) 规则，
     内联样式要靠 !important 才稳得住，写在 HTML 里既难维护又容易漏。
     改用类之后：JS 只负责切类，视觉全在样式表里一处改得动。 */
  /* ⚠ 2026-10-10 修 bug：常规字体和代码块字体两组共用同一个 class="swf"，
     而这里原来是遍历【全部】.swf 做 toggle —— 于是后调用的那组会把先调用那组的
     高亮整组清掉。打开面板时是 setFontBorder() → setCodeFontBorder() 的顺序，
     结果「优设好身体」（默认字体）永远不显示选中，只有代码块的 JetBrains Mono 亮着。
     改成只处理 id 以本组 prefix 开头的元素：
       · prefix "swf_"  只命中 swf_xxx（swfc_xxx 第 4 位是 c，不会被误伤）
       · prefix "swfc_" 只命中 swfc_xxx
     两组互不干扰，可以同时各高亮一个。 */
  Array.prototype.forEach.call(document.getElementsByClassName("swf"), function (ee) {
    if (!ee.id || ee.id.indexOf(prefix) !== 0) return;
    ee.classList.toggle("swf-cur", ee.id === prefix + curKey);
  });
}


/* ===== 设置主题色 ===== */
if (localStorage.getItem("themeColor") == undefined) {
  localStorage.setItem("themeColor", "green");
}
setColor(localStorage.getItem("themeColor"));
function setColor(c) {
  var el = document.getElementById("themeColor");
  var rgb = map.get(c);
  // 脏值（老版本留下的已下架色名）直接回落到默认，避免把 undefined 写进 CSS
  if (!rgb) {
    c = "green";
    rgb = map.get(c);
    localStorage.setItem("themeColor", c);
  }
  if (el) el.innerText = `:root{--theme-color:` + rgb + ` !important}`;
  localStorage.setItem("themeColor", c);
  /* 只有主题色变化才刷新鼠标颜色：Cursor.refresh 会重新生成样式，
     每次进面板都无条件调用一次纯属浪费。 */
  if (window.__cursorColor !== c) {
    window.__cursorColor = c;
    if (window.CURSOR) CURSOR.refresh();
  }
  // 设置一个带有透明度的主题色，用于菜单栏的悬浮颜色
  var trans_theme_color = "rgba" + rgb.substring(3, rgb.length - 1) + ", 0.7)";
  var high_trans_color = "rgba" + rgb.substring(3, rgb.length - 1) + ", 0.5)";
  var hh_trans_color = "rgba" + rgb.substring(3, rgb.length - 1) + ", 0.1)";
  document.documentElement.style.setProperty("--text-bg-hover", trans_theme_color);
  document.documentElement.style.setProperty("--high-trans-color", high_trans_color);
  document.documentElement.style.setProperty("--hh-trans-color", hh_trans_color);
}


/* ===== 星空背景开关 ===== */
if (localStorage.getItem("universe") == undefined) {
  localStorage.setItem("universe", "block");
}
setUniverse2(localStorage.getItem("universe"));
function setUniverse2(c) {
  var el = document.getElementById("universe");
  if (el) el.style.display = c;
  localStorage.setItem("universe", c);
}
function setUniverse() {
  var t = document.getElementById("universeSet");
  if (t) setUniverse2(t.checked ? "block" : "none");
}

/* ===== 雪花开关 ===== */
if (localStorage.getItem("snow") == undefined) {
  localStorage.setItem("snow", "none");
}
setSnow2(localStorage.getItem("snow"));
function setSnow2(c) {
  var el = document.getElementById("snow");
  if (el) el.style.display = c;
  localStorage.setItem("snow", c);
}
function setSnow() {
  var t = document.getElementById("snowSet");
  if (t) setSnow2(t.checked ? "block" : "none");
}

/* ===== 顶栏常驻开关 =====
   butterfly 主题的 #page-header 由 main.js 在滚动到阈值时加 .nav-fixed（滚上去才吸顶）。
   这里做成两态：
     nav = "1"  → 常驻吸顶：给 <html> 挂 .meihua-nav-fixed，不再依赖滚动位置
     nav = "0"  → 随滚动：还原成主题原生行为（滚上去才吸顶）
   --nav-fixed-display / --nav-visible-display 供样式表微调细节。

   【类名必须挂在 documentElement 上，不能挂 #page-header】
     · 和首屏预置脚本 beauty-boot.js 保持一致（它只有 <html> 可用）；
     · Pjax 整页替换 body 时挂在 body 内的节点会被丢掉，挂在 <html> 上不会。
   两处若挂在不同元素上，关掉开关时首屏挂的那个类永远清不掉，
   「顶栏常驻」就变成关不掉的死开关。 */
if (localStorage.getItem("nav") == undefined) {
  localStorage.setItem("nav", "1");
}
function applyNav() {
  var d = document.documentElement;
  var styleEl = document.getElementById("nav-display");
  var fixed = localStorage.getItem("nav") == "1";
  d.classList.toggle("meihua-nav-fixed", fixed);
  if (styleEl) {
    styleEl.innerText = fixed
      ? `:root{--nav-fixed-display:inline-flex;--nav-visible-display:none;}`
      : `:root{--nav-fixed-display:none;--nav-visible-display:inline-flex;}`;
  }
}
applyNav();
document.addEventListener('pjax:complete', applyNav);
document.addEventListener('DOMContentLoaded', applyNav);
function setNav() {
  var t = document.getElementById("navSet");
  if (!t) return;
  localStorage.setItem("nav", t.checked ? "1" : "0");
  applyNav();
}

/* ===== 帧率监测开关 ===== */
// 2026-10-09：改成真正启停采样循环，关掉不再整页 reload。
// 切��节点暂时缺失也不能阻止取消采样和保存偏好。
function fpssw() {
  var toggle = document.getElementById("fpson");
  if (!toggle) return;
  var enabled = toggle.checked;
  localStorage.setItem("fpson", enabled ? "1" : "0");
  if (enabled) startFps();
  else stopFps();
  var panel = document.getElementById("fps");
  if (panel) panel.style.display = enabled ? "block" : "none";
}

// 刷新窗口
function reload() {
  window.location.reload();
}

/* ===== 侧边部件开关 ===== */
if (localStorage.getItem("rs") == undefined) {
  localStorage.setItem("rs", "block");
}
applyRightside();
function applyRightside() {
  var el = document.getElementById("rightSide");
  if (el) {
    el.innerText = localStorage.getItem("rs") == "block"
      ? `:root{--rightside-display: block}`
      : `:root{--rightside-display: none}`;
  }
}
function toggleRightside() {
  var t = document.getElementById("rightSideSet");
  if (!t) return;
  localStorage.setItem("rs", t.checked ? "block" : "none");
  applyRightside();
}

/* ===== 侧栏显隐 =====
   butterfly 用 html.hide-aside 类控制（aside.styl 里 html.hide-aside .layout > .aside-content
   是 display:none），所以这里走类名而不是自定义 CSS 变量。 */
if (localStorage.getItem("aside") == undefined) {
  localStorage.setItem("aside", "1");
}
applyAside();
function applyAside() {
  var show = localStorage.getItem("aside") == "1";
  var d = document.documentElement;
  if (show) d.classList.remove("hide-aside");
  else d.classList.add("hide-aside");
  var el = document.getElementById("aside-show");
  if (el) {
    el.innerText = show
      ? `:root{--aside-content-display: block;}`
      : `:root{--aside-content-display: none;}`;
  }
}
function setAside() {
  var t = document.getElementById("asideSet");
  if (!t) return;
  localStorage.setItem("aside", t.checked ? "1" : "0");
  applyAside();
}

/* ===== 侧栏位置（左 / 右）=====
   butterfly 的 aside.position 是编译期 hexo-config，生成的是 CSS order。
   运行时切换用 CSS 变量把顺序交给样式表（见 custom.css 末尾的 .meihua-aside-*）。
   移动端（<=900px）本来就是上下堆叠，不受顺序影响，所以只在宽屏生效。 */
if (localStorage.getItem("asidePos") == undefined) {
  localStorage.setItem("asidePos", "1");
}
applyAsidePos();
function applyAsidePos() {
  var right = localStorage.getItem("asidePos") == "1";
  var d = document.documentElement;
  d.classList.toggle("meihua-aside-left", !right);
  d.classList.toggle("meihua-aside-right", right);
  var el = document.getElementById("aside-pos");
  if (el) {
    el.innerText = right
      ? `:root{--first-child-order: 0;--aside-order: 1;--aside-padding-left: 15px;--aside-padding-right: 0px;}`
      : `:root{--first-child-order: 1;--aside-order: 0;--aside-padding-left: 0px;--aside-padding-right: 15px;}`;
  }
}
function setAsidePos() {
  var t = document.getElementById("asidePosSet");
  if (!t) return;
  localStorage.setItem("asidePos", t.checked ? "1" : "0");
  applyAsidePos();
}

/* ===== 灯笼挂件开关（左右两侧的.dengl）=====
   灯笼是主题的 lantern.pug 渲染的，容器 class="dengl"，
   position: fixed（见 themes/butterfly/source/css/_custom/lantern.css）。
   这里不改它的display，而是往 <html> 上挂一个「反向」类，
   由CSS 去display:none —— 这样万一以后还要在别处引用 .dengl，
   不会因为这里 inline 写死而互相干扰。
   2026-10-09：默认改为关闭（"0"），新访客第一次打开网站不显示灯笼，
   需要时自己在「美化设置」面板里打开，打开后会被记进 localStorage。 */
if (localStorage.getItem("lantern") == undefined) {
  localStorage.setItem("lantern", "0");
}
applyLantern();
function applyLantern() {
  var d = document.documentElement;
  d.classList.toggle("meihua-no-lantern", localStorage.getItem("lantern") != "1");
}
document.addEventListener('pjax:complete', applyLantern);
document.addEventListener('DOMContentLoaded', applyLantern);
function setLantern() {
  var t = document.getElementById("lanternSet");
  if (!t) return;
  localStorage.setItem("lantern", t.checked ? "1" : "0");
  applyLantern();
}

/* ===== 音乐播放开关（左下角 aplayer）=====
   播放器由 additional-js.pug 引入 aplayer.pug + MetingJS 运行时创建，
   实际元素 class="aplayer aplayer-fixed ..."，position: fixed，挂在 <body> 下。
   同样用 <html> 上的类控制显示，不去碰播放器实例 —— APlayer 有自己的
   生命周期（audio 元素、事件绑定），直接 display:none 元素没问题，
   但 destroy() 之类的操作会破坏播放状态，只做视觉开关最安全。 */
if (localStorage.getItem("music") == undefined) {
  localStorage.setItem("music", "1");
}
applyMusic();
function applyMusic() {
  var d = document.documentElement;
  d.classList.toggle("meihua-no-music", localStorage.getItem("music") != "1");
}
document.addEventListener('pjax:complete', applyMusic);
document.addEventListener('DOMContentLoaded', applyMusic);
function setMusic() {
  var t = document.getElementById("musicSet");
  if (!t) return;
  localStorage.setItem("music", t.checked ? "1" : "0");
  applyMusic();
}

/* ===== 挂绳猫咪开关（右上角绳子 #myscoll + 猫咪 .neko）=====
   挂件来自 fomal.js 里的 nekoScroll：滚动时绳子随之变长、猫咪跟着往下走，
   点击绳子或猫咪都会 btf.scrollToDest(0, 500) 返回顶部。
   2026-10-10：默认改为关闭（"0"）。
   注意 .neko 的显隐是 nekoScroll 用 inline style（display:block）控制的，
   所以 CSS 里必须用 !important 才压得住，不能只写 display:none。 */
if (localStorage.getItem("neko") == undefined) {
  localStorage.setItem("neko", "0");
}
applyNeko();
function applyNeko() {
  var d = document.documentElement;
  d.classList.toggle("meihua-no-neko", localStorage.getItem("neko") != "1");
}
document.addEventListener('pjax:complete', applyNeko);
document.addEventListener('DOMContentLoaded', applyNeko);
function setNeko() {
  var t = document.getElementById("nekoSet");
  if (!t) return;
  localStorage.setItem("neko", t.checked ? "1" : "0");
  applyNeko();
}

/* ===== 页脚宠物开关（页脚底部的小动物 #footer-animal）=====
   元素是 themes/butterfly/layout/includes/footer.pug 里渲染的
   #footer-animal（.animal-wall 墙 + img.animal 小动物），默认显示（"1"）。 */
if (localStorage.getItem("pet") == undefined) {
  localStorage.setItem("pet", "1");
}
applyPet();
function applyPet() {
  var d = document.documentElement;
  d.classList.toggle("meihua-no-pet", localStorage.getItem("pet") != "1");
}
document.addEventListener('pjax:complete', applyPet);
document.addEventListener('DOMContentLoaded', applyPet);
function setPet() {
  var t = document.getElementById("petSet");
  if (!t) return;
  localStorage.setItem("pet", t.checked ? "1" : "0");
  applyPet();
}


/* ===== 3D 场景壁纸开关（#scene3d-bg）=====
   真正的 DOM（全屏 iframe）由 source/js/inject/scene-bg.js 负责创建/销毁 ——
   它在 inject.bottom 且不带 data-pjax，只跑一次，容器挂在 body 上，
   翻页不会重新加载 4MB 的场景。这里只负责写 localStorage + 同步 <html> 上的类，
   并回调 scene-bg.js 暴露的 window.__scene3dSync() 让它立刻增删容器。
   默认开启（"1"）；手机端由 scene-bg.js 的 800px 断点自己拦掉，与开关无关。 */
if (localStorage.getItem("scene3d") == undefined) {
  localStorage.setItem("scene3d", "1");
}
applyScene3d();
function applyScene3d() {
  var d = document.documentElement;
  d.classList.toggle("meihua-no-scene3d", localStorage.getItem("scene3d") != "1");
  // scene-bg.js 可能还没执行完（它在 bottom 前段），做一次存在性判断
  if (typeof window.__scene3dSync === "function") {
    try { window.__scene3dSync(); } catch (err) { }
  }
}
document.addEventListener('pjax:complete', applyScene3d);
document.addEventListener('DOMContentLoaded', applyScene3d);
function setScene3d() {
  var t = document.getElementById("scene3dSet");
  if (!t) return;
  localStorage.setItem("scene3d", t.checked ? "1" : "0");
  applyScene3d();
  /* 开关关掉时场景选择就没有意义了，预览图整体置灰但仍可见 ——
     这样用户知道"上面这一排是干什么用的"，重新打开开关还能直接接着选。 */
  markScene3dCards();
}


/* ===== 3D 场景包切换 =====
   真正的换场景在 scene-bg.js（window.__scene3dPick）里做 —— 它要销毁旧 iframe、
   建新的、还要清掉该场景的机位记忆。这里只负责写 localStorage + 更新按钮高亮。 */
function setScene3dPack(btn) {
  if (!btn) return;
  var id = btn.getAttribute("data-scene");
  if (!id) return;
  localStorage.setItem("scene3d_pack", id);
  markScene3dCards();
  /* scene-bg.js 在 inject.bottom 的前段、无 defer，正常早于 fomal.js 执行完；
     万一还没跑起来（网络慢）就跳过，等它的 boot() 会自己按新值建场景。 */
  if (typeof window.__scene3dPick === "function") {
    try { window.__scene3dPick(id); } catch (err) { }
  }
}

/* 鼠标悬到某张预览图上就先把它预热掉，等真正点下去时贴图已在浏览器缓存里，
   切换会快很多。用 once 绑定 + 一个已绑标记，避免 pjax 后重复叠加。 */
function bindScene3dWarm() {
  var wrap = document.getElementById("scene3dPicker");
  if (!wrap || wrap.__warmBound) return;
  wrap.__warmBound = true;
  wrap.addEventListener("mouseenter", function (e) {
    var c = e.target && e.target.closest ? e.target.closest(".scene3d-card") : null;
    if (!c) return;
    var id = c.getAttribute("data-scene");
    if (id && typeof window.__scene3dWarm === "function") {
      try { window.__scene3dWarm(id); } catch (err) { }
    }
  }, true);
}

/* 按钮高亮 = 当前选中的场景。容错：localStorage 里存了已不存在的 id
   （删过场景包、或从别的博客拷了脏数据）就都不高亮，靠 scene-bg.js 兜底回落默认。 */
function markScene3dCards() {
  var wrap = document.getElementById("scene3dPicker");
  if (!wrap) return;
  var cur = localStorage.getItem("scene3d_pack") || "orbital-station";
  var on = (localStorage.getItem("scene3d") != "0");
  var cards = wrap.querySelectorAll(".scene3d-card");
  for (var i = 0; i < cards.length; i++) {
    var c = cards[i];
    var sel = (c.getAttribute("data-scene") === cur);
    c.classList.toggle("is-active", sel && on);
    c.setAttribute("aria-pressed", sel && on ? "true" : "false");
    c.disabled = !on;
  }
}
document.addEventListener('pjax:complete', markScene3dCards);
document.addEventListener('pjax:complete', bindScene3dWarm);
document.addEventListener('DOMContentLoaded', markScene3dCards);
document.addEventListener('DOMContentLoaded', bindScene3dWarm);


/* ===== 卡片透明度滑块 ===== */
if (localStorage.getItem("transNum") == undefined) {
  localStorage.setItem("transNum", 92);
}
var curTransNum = localStorage.getItem("transNum");
var curTransMini = curTransNum * 0.95;
applyTrans(curTransNum);
function applyTrans(v) {
  var el = document.getElementById("transPercent");
  if (el) {
    el.innerText = `:root{--trans-light: rgba(253, 253, 253, ${v}%) !important; --trans-dark: rgba(25, 25, 25, ${v}%) !important} `;
  }
}
function setTrans() {
  var elem = document.getElementById("transSet");
  if (!elem) return;
  var newTransNum = elem.value;
  var target = document.querySelector('.transValue');
  if (target) {
    target.innerHTML = `卡片透明度 (0%-100%): <span style="color:#eb5353">` + newTransNum + `%</span>`;
  }
  localStorage.setItem("transNum", newTransNum);
  curTransMini = newTransNum * 0.95;
  curTransNum = newTransNum;  // 更新当前透明度
  var bar = document.querySelector('#rang_trans');
  if (bar) bar.style.width = curTransMini + "%";
  applyTrans(newTransNum);
};


/* ===== 滑条增强：拖动或者点击进度条任意位置都能跳转 =====
   进度条（.rang_width）是绝对定位盖在轨道上的，不加这段的话左半边点不动。 */
var curJumpRange = null;      // 当前正在拖动/点击的滑条
var rangeJumpReady = false;   // 全局的移动、松手监听是否已注册

// 把屏幕横坐标换算成滑条该取的值（扣掉滑块自身宽度，两端才准）
function rangeValueFromX(rangeEl, clientX) {
  var rect = rangeEl.getBoundingClientRect();
  var min = parseFloat(rangeEl.min);
  var max = parseFloat(rangeEl.max);
  var step = parseFloat(rangeEl.step);
  if (isNaN(min)) min = 0;
  if (isNaN(max)) max = 100;
  if (isNaN(step) || step <= 0) step = 1;
  if (!rect.width) return isNaN(parseFloat(rangeEl.value)) ? min : parseFloat(rangeEl.value);
  var thumb = 15;                          // 与 CSS 里 ::-webkit-slider-thumb 的宽度保持一致
  var usable = rect.width - thumb;         // 滑块圆心能走的总距离
  if (usable <= 0) usable = rect.width;
  var ratio = (clientX - rect.left - thumb / 2) / usable;
  ratio = ratio < 0 ? 0 : (ratio > 1 ? 1 : ratio);
  var val = min + ratio * (max - min);
  val = Math.round(val / step) * step;     // 按 step 取整，和原生拖动保持一致
  val = Math.min(max, Math.max(min, val));
  return Math.round(val * 1000) / 1000;    // 去掉浮点误差尾巴
}

// 直接改 value 不会触发 oninput，这里手动补一次 input 事件，复用原有的 setTrans()
function fireRangeInput(rangeEl) {
  var evt;
  try {
    evt = new Event("input", { bubbles: true });
  } catch (err) {
    evt = document.createEvent("Event");
    evt.initEvent("input", true, true);
  }
  rangeEl.dispatchEvent(evt);
}

// 按坐标更新滑条的值
function setRangeByX(rangeEl, clientX) {
  var val = rangeValueFromX(rangeEl, clientX);
  if (parseFloat(rangeEl.value) === val) return;
  rangeEl.value = val;
  fireRangeInput(rangeEl);
}

// 绑定：按下即跳到该位置，按住拖动则一路跟随（含轨道左右的空白区域）
function bindRangeJump(rangeEl) {
  if (!rangeEl || rangeEl.rangeJumpBound) return;
  rangeEl.rangeJumpBound = true;
  var box = rangeEl.parentNode || rangeEl;
  var start = function (clientX) { curJumpRange = rangeEl; setRangeByX(rangeEl, clientX); };
  if (window.PointerEvent) {
    box.addEventListener("pointerdown", function (e) {
      if (e.button && e.button !== 0) return;   // 只响应左键
      start(e.clientX);
    });
  } else {
    box.addEventListener("mousedown", function (e) {
      if (e.button) return;
      start(e.clientX);
    });
    box.addEventListener("touchstart", function (e) {
      if (e.touches && e.touches[0]) start(e.touches[0].clientX);
    }, { passive: true });
  }
}

// 全局监听只注册一次，避免反复开关小窗时重复绑定
function initRangeJump() {
  if (rangeJumpReady) return;
  rangeJumpReady = true;
  var move = function (clientX) { if (curJumpRange) setRangeByX(curJumpRange, clientX); };
  var end = function () { curJumpRange = null; };
  if (window.PointerEvent) {
    document.addEventListener("pointermove", function (e) { move(e.clientX); });
    document.addEventListener("pointerup", end);
    document.addEventListener("pointercancel", end);
  } else {
    document.addEventListener("mousemove", function (e) { move(e.clientX); });
    document.addEventListener("mouseup", end);
    document.addEventListener("touchmove", function (e) {
      if (e.touches && e.touches[0]) move(e.touches[0].clientX);
    }, { passive: true });
    document.addEventListener("touchend", end);
    document.addEventListener("touchcancel", end);
  }
}
/* 滑条增强 end */


/* ===== 背景值处理 ===== */
// 判断背景值是否合法（default / #颜色 / url(...) / 渐变 / http(s) 链接）
function isValidBgVal(s) {
  if (s == undefined || s == null) return false;
  s = String(s).trim();
  if (s == "" || s == "undefined" || s == "null") return false;
  if (s.charAt(0) == "#") return true;
  if (s.indexOf("url(") == 0) return true;
  if (s.indexOf("linear-gradient") == 0 || s.indexOf("radial-gradient") == 0) return true;
  if (s.indexOf("http://") == 0 || s.indexOf("https://") == 0) return true;
  return false;
}
// 从背景值里取出图片直链，取不到返回空串
function bgValToUrl(s) {
  if (!isValidBgVal(s)) return "";
  s = String(s).trim();
  var m = s.match(/^url\((["']?)(.*?)\1\)$/);
  if (m) s = m[2];
  return /^https?:\/\//.test(s) ? s.trim() : "";
}
// 自定义颜色框当前值
var defineColor = (localStorage.getItem("blogbg") || "").charAt(0) == '#'
  ? localStorage.getItem("blogbg") : '#F4D88A';
function changeBgColor() {
  var el = document.querySelector("#define_colors");
  if (el) changeBg(el.value);
}

// 默认背景（恢复默认设置时用）
var DEFAULT_BG = `:root{
    --default-bg: url(https://picsum.photos/id/1015/1920/1080);
    --darkmode-bg:url(https://picsum.photos/id/352/1920/1080);
    --mobileday-bg: url(https://picsum.photos/id/1018/1920/1080);
    --mobilenight-bg: url(https://picsum.photos/id/1039/1920/1080);
  }`;

// 初始化背景：读 localStorage，历史遗留的非法值（例如误写成的 "deafult"）自动纠正为默认
(function initBg() {
  var el = document.getElementById("defineBg");
  if (!el) return;
  var saved = localStorage.getItem("blogbg");
  if (saved != undefined && saved != "default" && !isValidBgVal(saved)) {
    saved = "default";
    localStorage.setItem("blogbg", "default");
  }
  if (saved == undefined || saved == "default") {
    resetBg_();
    if (localStorage.getItem("blogbg") == undefined) localStorage.setItem("blogbg", "default");
    return;
  }
  setBg(saved);
  // 自定义背景图取不到（死链 / 被墙）时自动回退默认背景
  var bgUrl = bgValToUrl(saved);
  if (!bgUrl) return;
  checkImgExists(bgUrl).catch(function () {
    localStorage.setItem("blogbg", "default");
    resetBg_();
  });
})();

// 写入默认背景
function resetBg_() {
  var el = document.getElementById("defineBg");
  if (!el) return;
  el.innerText = DEFAULT_BG;
}

// 切换背景主函数：图片类背景先探测可用性，避免选到已失效的壁纸源导致背景空白
function changeBg(s) {
  // 自定义颜色框
  defineColor = s.charAt(0) == "#" ? s : '#F4D88A';
  var bgUrl = bgValToUrl(s);
  if (bgUrl) {
    checkImgExists(bgUrl).then(function () {
      setBg(s);
      localStorage.setItem("blogbg", s);
    }).catch(function () {
      fomalNotify({
        title: "这个壁纸源失效了🥲",
        message: "该背景图链接无法加载，已保持当前背景。换一个试试吧～",
        position: 'top-left',
        offset: 50,
        showClose: true,
        type: "warning",
        duration: 5000
      });
    });
    return;
  }
  setBg(s);
  localStorage.setItem("blogbg", s);
}
// 设置背景属性
function setBg(s) {
  var el = document.getElementById("defineBg");
  if (!el) return;
  el.innerText = `:root{
    --default-bg: ${s};
    --darkmode-bg: ${s};
    --mobileday-bg: ${s};
    --mobilenight-bg: ${s};
  }`;
}

// 切换链接对应的背景（加入链接检验与防抖）
function getPicture() {
  debounce(getPicture_, 300);
}
function getPicture_() {
  var input = document.getElementById("pic-link");
  if (!input) return;
  checkImgExists(input.value).then(() => {
    changeBg("url(" + input.value + ")");
    fomalNotify({
      title: "可以啦🍨",
      message: "切换自定义背景成功！",
      position: 'top-left',
      offset: 50,
      showClose: true,
      type: "success",
      duration: 5000
    });
  }).catch(() => {
    fomalNotify({
      title: "链接不对🤣",
      message: "请输入有效的图片链接！",
      position: 'top-left',
      offset: 50,
      showClose: true,
      type: "warning",
      duration: 5000
    });
  });
}
// 判断图片链接是否可用
function checkImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    ImgObj.onload = function (res) { resolve(res); };
    ImgObj.onerror = function (err) { reject(err); };
  });
}


/* ===== 黑夜霓虹灯开关 ===== */
if (localStorage.getItem("light") == undefined) {
  localStorage.setItem("light", "true");
}
// 这里要适配 Pjax
document.addEventListener('pjax:complete', function () {
  changeLight(localStorage.getItem("light") == "true" ? true : false);
});
document.addEventListener('DOMContentLoaded', function () {
  changeLight(localStorage.getItem("light") == "true" ? true : false);
});
function setLight() {
  var t = document.getElementById("lightSet");
  if (!t) return;
  changeLight(t.checked);
  localStorage.setItem("light", t.checked ? "true" : "false");
}
// 更换霓虹灯状态
function changeLight(flag) {
  if (document.getElementById("site-name"))
    document.getElementById("site-name").style.animation = flag ? "light_15px 10s linear infinite" : "none";
  if (document.getElementById("site-title"))
    document.getElementById("site-title").style.animation = flag ? "light_15px 10s linear infinite" : "none";
  if (document.getElementById("site-subtitle"))
    document.getElementById("site-subtitle").style.animation = flag ? "light_10px 10s linear infinite" : "none";
  if (document.getElementById("post-info"))
    document.getElementById("post-info").style.animation = flag ? "light_5px 10s linear infinite" : "none";
  var el = document.getElementById("menu_shadow");
  if (el) {
    el.innerText = flag ? `:root{--menu-shadow: 0 0 1px var(--theme-color);}` : `:root{--menu-shadow: none;}`;
  }
}


/* ===== 背景滤镜（模糊 / 饱和度 / 对比度）===== */
var blurRadius, saturate, contrast;
(function initBgFilter() {
  if (localStorage.getItem("bgFilterVal") == undefined) {
    localStorage.setItem("bgFilterVal", "blur(0px) saturate(108%) contrast(105%)");
  }
  if (localStorage.getItem("bgFilterOn") == undefined) {
    localStorage.setItem("bgFilterOn", "1");
  }
  // 从已存的 filter 串里拆回三个数值，面板打开时直接填进输入框
  var strs = String(localStorage.getItem("bgFilterVal")).split(/\s+/);
  blurRadius = (strs[0] || "").replace(/^blur\(/, "").replace(/px\)$/, "") || 0;
  saturate = (strs[1] || "").replace(/^saturate\(/, "").replace(/%\)$/, "") || 108;
  contrast = (strs[2] || "").replace(/^contrast\(/, "").replace(/%\)$/, "") || 105;
})();

function applyBgFilter() {
  var el = document.getElementById("bgFilterParam");
  if (!el) return;
  el.innerText = localStorage.getItem("bgFilterOn") == "1"
    ? `:root{--bg-filter:` + localStorage.getItem("bgFilterVal") + `;}`
    : `:root{--bg-filter:none;}`;
}
applyBgFilter();

function updateBgFilterShow() {
  var el = document.getElementById("bgFilterShow");
  if (!el) return;
  el.innerHTML = `模糊半径: <span style="color:#eb5353">` + blurRadius + `px</span> | 饱和度: <span style="color:#eb5353">` +
    saturate + `%</span> | 对比度: <span style="color:#eb5353">` + contrast + `%</span>`;
}
updateBgFilterShow();

function saveBgFilter() {
  var blurEl = document.getElementById("blurRad");
  var satEl = document.getElementById("saturation");
  var conEl = document.getElementById("contrast");
  if (!blurEl || !satEl || !conEl) return;
  var b = Number(blurEl.value), s = Number(satEl.value), c = Number(conEl.value);
  if (isNaN(b) || isNaN(s) || isNaN(c) || b < 0 || b > 300 || s < 0 || s > 200 || c < 0 || c > 200) {
    fomalNotify({
      title: "警告💊",
      message: "背景滤镜参数不在合理范围内！（模糊 0-300px，饱和度 / 对比度 0-200%）",
      position: 'top-left',
      offset: 50,
      showClose: true,
      type: "warning",
      duration: 5000
    });
    return;
  }
  localStorage.setItem("bgFilterVal", `blur(${b}px) saturate(${s}%) contrast(${c}%)`);
  blurRadius = b; saturate = s; contrast = c;
  applyBgFilter();
  updateBgFilterShow();
  fomalNotify({
    title: "提示🍄",
    message: "设置背景滤镜参数成功！",
    position: 'top-left',
    offset: 50,
    showClose: true,
    type: "success",
    duration: 5000
  });
}

// 背景滤镜开关
function setBgFilter() {
  var t = document.getElementById("bgFilterSet");
  if (!t) return;
  localStorage.setItem("bgFilterOn", t.checked ? "1" : "0");
  applyBgFilter();
}


/* ===== 壁纸 API =====
   2026-10-09 逐个 curl 实测（HTTP 状态 + 字节数 + Content-Type）后重写：
     · bingw.jasonzeng.dev 仍可用，但换成 bing.biturl.top（带 mkt=zh-CN，国内直连更快）
     · acg.suyanw.cn 全站已挂（连接被拒），换成 moe.jitsu.top / t.mwm.moe
     · cdn.seovx.com 连接被拒，换成 www.dmoe.cc
     · api.zylearning.top 返回 200 但 Content-Type 是 text/html 且 0 字节（空图），换掉
     · api.btstu.cn 只有 http，HTTPS 站会被浏览器按混合内容拦掉，换成 https 同站仍不通，改用 t.mwm.moe */
let bingDayBg = "url(https://bing.biturl.top/?resolution=1920&format=image&index=0&mkt=zh-CN)";
let bingHistoryBg = "url(https://bing.biturl.top/?resolution=1920&format=image&index=random&mkt=zh-CN)";
// 随机二次元横屏
let EEEDog = "url(https://moe.jitsu.top/api?sort=pc)";
// 随机萌图
let seovx = "url(https://www.dmoe.cc/random.php)";
// picsum 随机
let picsum = "url(https://picsum.photos/id/1043/1920/1080.webp)";
// 高清二次元横屏
let waiBizhi = "url(https://t.mwm.moe/pc)";
// 手机竖屏二次元
let btstu = "url(https://t.mwm.moe/mp)";
// 横屏二次元
let unsplash = "url(https://www.dmoe.cc/random.php)";


/* ===== 面板窗口 ===== */
var winbox = "";

function createWinbox() {
  let div = document.createElement("div");
  document.body.appendChild(div);
  winbox = WinBox({
    id: "meihuaBox",
    index: 99,
    title: "美化设置",
    x: "left",
    y: "center",
    minwidth: "300px",
    height: "60%",
    background: 'var(--theme-color)',
    onmaximize: () => {
      div.innerHTML = `<style>body::-webkit-scrollbar {display: none;} div#meihuaBox {width: 100% !important;}</style>`;
    },
    onrestore: () => {
      div.innerHTML = "";
    },
  });
  winResize();
  window.addEventListener("resize", winResize);

  /* 面板 HTML。改这里的约定（样式全在 source/css/custom.css 末尾「美化面板」一节）：
   *  · 每段「文字 + 开关」用 <label class="opt"> 包住 —— 点文字也能切开关，窄屏换行时开关不会跟自己的文字分家；
   *  · 背景滤镜三个参数各自用 <label class="bgp"> 包住，数字框与单位不会被拆到两行；
   *  · 主题色那一行是 .colorRow：桌面一行铺开，手机端换成等宽网格。 */
  winbox.body.innerHTML = `
<div class="settings" style="display: block;">
<div id="article-container" style="padding:12px;">
<br>
<center><p><button id="reset_btn" type="button" onclick="debounce(reset, 300)" title="点击此按钮恢复美化模块默认设置"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认设置</button></p></center>

<h2>一、显示偏好</h2>

<div class="transValue" id="transVal" style="font-weight:bold;padding-left:10px">卡片透明度 (0%-100%): <span style="color:#eb5353">${curTransNum}%</span></div>
<div class="range">
  <input id="transSet" type="range" min="0" max="100" step="1" value=${curTransNum} oninput="setTrans()">
  <p class="rang_width" id="rang_trans" style="width:${curTransMini}%"></p>
</div>

<div style="padding-bottom:15px">
  <div class="content" style="display:flex">
  <label class="opt"><span class="content-text" style="font-weight:bold"> 背景滤镜 </span><input type="checkbox" id="bgFilterSet" onclick="setBgFilter()"></label>
  <div class="bgFilterValue" id="bgFilterShow" style="font-weight:bold;padding-left:10px">模糊半径: <span style="color:#eb5353">${blurRadius}px</span> | 饱和度: <span style="color:#eb5353">${saturate}%</span> | 对比度: <span style="color:#eb5353">${contrast}%</span></div>
  </div>
  <div class="content bgparams" style="display:flex;font-weight:bold;padding-left:10px">
  <label class="bgp"><span class="bgp-k">模糊半径</span><span class="bgp-v"><input type="number" id="blurRad" placeholder="0" min="0" max="300" step="1" title="背景模糊半径:0-300px"><span class="bgp-u">px</span></span></label>
  <label class="bgp"><span class="bgp-k">饱和度</span><span class="bgp-v"><input type="number" id="saturation" placeholder="108" min="0" max="200" step="1" title="背景饱和度:0-200%"><span class="bgp-u">%</span></span></label>
  <label class="bgp"><span class="bgp-k">对比度</span><span class="bgp-v"><input type="number" id="contrast" placeholder="105" min="0" max="200" step="1" title="背景对比度:0-200%"><span class="bgp-u">%</span></span></label>
  <button class="winbox_btn bgp-save" type="button" onclick="debounce(saveBgFilter,300)" title="点击保存背景滤镜参数">保存</button>
  </div>
</div>

<div class="content" style="display:flex">
  <label class="opt"><span class="content-text" style="font-weight:bold"> 星空特效 (夜间模式) </span><input type="checkbox" id="universeSet" onclick="setUniverse()"></label>
  <label class="opt"><span class="content-text" style="font-weight:bold"> 霓 虹 灯 (夜间模式) </span><input type="checkbox" id="lightSet" onclick="setLight()"></label>
</div>

<div class="content" style="display:flex">
  <label class="opt"><span class="content-text" style="font-weight:bold"> 雪花特效 (白天模式) </span><input type="checkbox" id="snowSet" onclick="setSnow()"></label>
  <label class="opt"><span class="content-text" style="font-weight:bold"> 帧率监测 (默认开启) </span><input type="checkbox" id="fpson" onclick="fpssw()"></label>
</div>

<div class="content" style="display:flex">
  <label class="opt"><span class="content-text" style="font-weight:bold"> 右侧部件 (默认开启) </span><input type="checkbox" id="rightSideSet" onclick="toggleRightside()"></label>
  <label class="opt"><span class="content-text" style="font-weight:bold"> 顶栏常驻 (默认开启) </span><input type="checkbox" id="navSet" onclick="setNav()"></label>
</div>

<div class="content" style="display:flex">
  <label class="opt"><span class="content-text" style="font-weight:bold"> 侧栏显隐 (默认显示) </span><input type="checkbox" id="asideSet" onclick="setAside()"></label>
  <label class="opt"><span class="content-text" style="font-weight:bold"> 侧栏位置 (默认右边) </span><input type="checkbox" id="asidePosSet" onclick="setAsidePos()"></label>
</div>

<div class="content" style="display:flex">
  <label class="opt"><span class="content-text" style="font-weight:bold"> 灯笼挂件 (默认关闭) </span><input type="checkbox" id="lanternSet" onclick="setLantern()"></label>
  <label class="opt"><span class="content-text" style="font-weight:bold"> 音乐播放 (默认显示) </span><input type="checkbox" id="musicSet" onclick="setMusic()"></label>
</div>

<div class="content" style="display:flex">
  <label class="opt"><span class="content-text" style="font-weight:bold"> 挂绳猫咪 (默认关闭) </span><input type="checkbox" id="nekoSet" onclick="setNeko()"></label>
  <label class="opt"><span class="content-text" style="font-weight:bold"> 页脚宠物 (默认显示) </span><input type="checkbox" id="petSet" onclick="setPet()"></label>
</div>

<div class="content" style="display:flex">
  <label class="opt" style="width:100%"><span class="content-text" style="font-weight:bold"> 3D 壁纸 (默认开启) </span><input type="checkbox" id="scene3dSet" onclick="setScene3d()"></label>
</div>

<!-- 【2026-10-11】3D 场景选择：三个场景包（KPanel scene pack）任选其一。
     名单和 source/js/inject/scene-bg.js 里的 SCENES 一一对应，改一边记得改另一边。
     预览图用各包自带的 thumb.webp（400×225，8~16KB），不加载那几 MB 的场景本体。 -->
<div class="content scene3d-picker">
  <div class="scene3d-picker__grid" id="scene3dPicker">
    <button type="button" class="scene3d-card" data-scene="orbital-station" onclick="setScene3dPack(this)">
      <img class="scene3d-card__img" src="/scene/orbital-station/thumb.webp" alt="星港轨道" loading="lazy" decoding="async">
      <span class="scene3d-card__name">星港轨道</span>
    </button>
    <button type="button" class="scene3d-card" data-scene="neon-city" onclick="setScene3dPack(this)">
      <img class="scene3d-card__img" src="/scene/neon-city/thumb.webp" alt="霓虹都市" loading="lazy" decoding="async">
      <span class="scene3d-card__name">霓虹都市</span>
    </button>
    <button type="button" class="scene3d-card" data-scene="sea-and-sky" onclick="setScene3dPack(this)">
      <img class="scene3d-card__img" src="/scene/sea-and-sky/thumb.webp" alt="海天日月" loading="lazy" decoding="async">
      <span class="scene3d-card__name">海天日月</span>
    </button>
  </div>
  <p class="scene3d-picker__hint">仅桌面端生效（手机端仍用静态壁纸）；每次刷新会在同一场景内随机换一个机位。</p>
</div>

<h2>二、主题色设置</h2>
<div class="content colorRow">
  <input type="radio" id="red" name="colors" value=" " onclick="setColor('red')">
  <input type="radio" id="orange" name="colors" value=" " onclick="setColor('orange')">
  <input type="radio" id="yellow" name="colors" value=" " onclick="setColor('yellow')">
  <input type="radio" id="green" name="colors" value=" " onclick="setColor('green')">
  <input type="radio" id="blue" name="colors" value=" " onclick="setColor('blue')">
  <input type="radio" id="heoblue" name="colors" value=" " onclick="setColor('heoblue')">
  <input type="radio" id="darkblue" name="colors" value=" " onclick="setColor('darkblue')">
  <input type="radio" id="purple" name="colors" value=" " onclick="setColor('purple')">
  <input type="radio" id="pink" name="colors" value=" " onclick="setColor('pink')">
  <input type="radio" id="black" name="colors" value=" " onclick="setColor('black')">
</div>

<h2>三、字体设置</h2>
<!--<div class="note warning modern"><p>非商免字体未经授权只能个人使用。本站为完全非商业、非盈利性质的网站，平时用于个人学习交流，如有侵权请联系站长删除，谢谢！ —— 致版权方</p>
</div>-->
<h3>1. 常规字体（没选过时默认：优设好身体）</h3>
<p id="swfs">
<a class="swf" id="swf_ZhuZiAWan" href="javascript:;" rel="noopener external nofollow" style="font-family:'ZhuZiAWan'!important;color:#303030" onclick="setFont('ZhuZiAWan')">杨任东竹石体</a>
<a class="swf" id="swf_HYTMR" href="javascript:;" rel="noopener external nofollow" style="font-family:'HYTMR'!important;color:#303030" onclick="setFont('HYTMR')">汉仪唐美人</a>
<a class="swf" id="swf_LXGW" href="javascript:;" rel="noopener external nofollow" style="font-family:'LXGW'!important;color:#303030" onclick="setFont('LXGW')">小石头</a>
<a class="swf" id="swf_TTQHB" href="javascript:;" rel="noopener external nofollow" style="font-family:'TTQHB'!important;color:#303030" onclick="setFont('TTQHB')">甜甜圈海报</a>
<a class="swf" id="swf_YSHST" href="javascript:;" rel="noopener external nofollow" style="font-family:'YSHST'!important;color:#303030" onclick="setFont('YSHST')">优设好身体</a>
<a class="swf" id="swf_MiSans" href="javascript:;" rel="noopener external nofollow" style="font-family:'MiSans'!important;color:#303030" onclick="setFont('MiSans')">珠海体</a>
<a class="swf" id="swf_default" href="javascript:;" rel="noopener external nofollow" style="font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif !important;color:#303030" onclick="setFont('default')">系统默认</a>
</p>

<h3>2. 代码块字体（没选过时默认：JetBrains Mono）</h3>
<p id="swfs_code">
<a class="swf" id="swfc_JetBrainsMono" href="javascript:;" rel="noopener external nofollow" style="font-family:'JetBrainsMono'!important;color:#303030" onclick="setCodeFont('JetBrainsMono')">JetBrains Mono</a>
<a class="swf" id="swfc_FiraCode" href="javascript:;" rel="noopener external nofollow" style="font-family:'FiraCode'!important;color:#303030" onclick="setCodeFont('FiraCode')">Fira Code</a>
<a class="swf" id="swfc_SourceCodePro" href="javascript:;" rel="noopener external nofollow" style="font-family:'SourceCodePro'!important;color:#303030" onclick="setCodeFont('SourceCodePro')">Source Code Pro</a>
</p>

<h2>四、背景设置</h2>

<h3>1. 随机二次元</h3>
<details class="folding-tag" cyan><summary> 查看随机二次元背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://moe.jitsu.top/api?sort=pc)" class="imgbox" onclick="changeBg('url(https://moe.jitsu.top/api?sort=pc)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://t.mwm.moe/pc)" class="imgbox" onclick="changeBg('url(https://t.mwm.moe/pc)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://t.mwm.moe/mp)" class="imgbox" onclick="changeBg('url(https://t.mwm.moe/mp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://www.dmoe.cc/random.php)" class="imgbox" onclick="changeBg('url(https://www.dmoe.cc/random.php)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/id/1043/1920/1080.webp)" class="imgbox" onclick="changeBg('url(https://picsum.photos/id/1043/1920/1080.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/id/1048/1920/1080.webp)" class="imgbox" onclick="changeBg('url(https://picsum.photos/id/1048/1920/1080.webp)')"></a></div>
              </div>
            </details>


<h3>2. 随机风景</h3>
<details class="folding-tag" cyan><summary> 查看随机风景背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/id/1015/1920/1080)" class="imgbox" onclick="changeBg('url(https://picsum.photos/id/1015/1920/1080)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/id/1016/1920/1080)" class="imgbox" onclick="changeBg('url(https://picsum.photos/id/1016/1920/1080)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/id/1018/1920/1080)" class="imgbox" onclick="changeBg('url(https://picsum.photos/id/1018/1920/1080)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/id/1036/1920/1080)" class="imgbox" onclick="changeBg('url(https://picsum.photos/id/1036/1920/1080)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/id/1039/1920/1080)" class="imgbox" onclick="changeBg('url(https://picsum.photos/id/1039/1920/1080)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/id/1041/1920/1080)" class="imgbox" onclick="changeBg('url(https://picsum.photos/id/1041/1920/1080)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/id/352/1920/1080)" class="imgbox" onclick="changeBg('url(https://picsum.photos/id/352/1920/1080)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/id/1010/1920/1080)" class="imgbox" onclick="changeBg('url(https://picsum.photos/id/1010/1920/1080)')"></a></div>
              </div>
            </details>

<h3>3. 萌宠</h3>
<details class="folding-tag" cyan><summary> 查看萌宠背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://picsum.photos/id/1060/1920/1080)" class="imgbox" onclick="changeBg('url(https://picsum.photos/id/1060/1920/1080)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://www.dmoe.cc/random.php)" class="imgbox" onclick="changeBg('url(https://www.dmoe.cc/random.php)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://moe.jitsu.top/api?sort=pc)" class="imgbox" onclick="changeBg('url(https://moe.jitsu.top/api?sort=pc)')"></a></div>
              </div>
            </details>

<h3>4. 渐变色</h3>
<details class="folding-tag" cyan><summary> 查看渐变色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #544a7d, #ffd452)" onclick="changeBg('linear-gradient(to right, #544a7d, #ffd452)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)" onclick="changeBg('linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to left, #654ea3, #eaafc8)" onclick="changeBg('linear-gradient(to left, #654ea3, #eaafc8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)" onclick="changeBg('linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #d3959b, #bfe6ba)" onclick="changeBg('linear-gradient(to top, #d3959b, #bfe6ba)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #8360c3, #2ebf91)" onclick="changeBg('linear-gradient(to top, #8360c3, #2ebf91)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #108dc7, #ef8e38)" onclick="changeBg('linear-gradient(to top, #108dc7, #ef8e38)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #141e30, #243b55)" onclick="changeBg('linear-gradient(to right, #141e30, #243b55)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to left, #ff8008, #ff1064)" onclick="changeBg('linear-gradient(to left, #ff8008, #ff1064)')"></a></div>
              </div>
            </details>


<h3>5. 纯色</h3>
<details class="folding-tag" cyan><summary> 查看纯色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #2c3e50" onclick="changeBg('#2c3e50')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #1a237e" onclick="changeBg('#1a237e')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #004d40" onclick="changeBg('#004d40')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ecb1b1" onclick="changeBg('#ecb1b1')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #d3ebac" onclick="changeBg('#d3ebac')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ace9ce" onclick="changeBg('#ace9ce')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #c1ebea" onclick="changeBg('#c1ebea')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #dee7f1" onclick="changeBg('#dee7f1')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e9e3f2" onclick="changeBg('#e9e3f2')"></a><input type="color" id="define_colors" href="javascript:;" rel="noopener external nofollow" class="box" autocomplete="on" value="${defineColor}" oninput="changeBgColor()"></input></div>
              </div>
            </details>



<h3>6. 手机壁纸</h3>
<details class="folding-tag" cyan><summary> 查看适配手机的背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-001.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-001.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-002.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-002.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-003.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-003.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-004.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-004.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-005.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-005.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-006.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-006.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-007.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-007.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-008.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-008.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-009.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-009.webp)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://file.meimolihan.eu.org/wallpaper/sj-010.webp)" class="pimgbox" onclick="changeBg('url(https://file.meimolihan.eu.org/wallpaper/sj-010.webp)')"></a></div>
              </div>
            </details>


<h3>7. 壁纸API</h3>
<details class="folding-tag" cyan><summary> 查看壁纸API系列背景 </summary>
              <div class='content'>
              <div class="bgbox"><a id="bingDayBox" rel="noopener external nofollow" style="background-image: ${bingDayBg}" class="box apiBox" onclick="changeBg('${bingDayBg}')"></a><a id="bingHistoryBox" rel="noopener external nofollow" style="background-image: ${bingHistoryBg}" class="box apiBox" onclick="changeBg('${bingHistoryBg}')"></a><a id="EEEDogBox" rel="noopener external nofollow" style="background-image: ${EEEDog}" class="box apiBox" onclick="changeBg('${EEEDog}')"></a><a id="seovxBox" rel="noopener external nofollow" style="background-image: ${seovx}" class="box apiBox" onclick="changeBg('${seovx}')"></a><a id="picsumBox" rel="noopener external nofollow" style="background-image: ${picsum}" class="box apiBox" onclick="changeBg('${picsum}')"></a><a id="waiBizhiBox" rel="noopener external nofollow" style="background-image: ${waiBizhi}" class="box apiBox" onclick="changeBg('${waiBizhi}')"></a><a id="btstuBox" rel="noopener external nofollow" style="background-image: ${btstu}" class="box apiBox" onclick="changeBg('${btstu}')"></a><a id="unsplashBox" rel="noopener external nofollow" style="background-image: ${unsplash}" class="box apiBox" onclick="changeBg('${unsplash}')"></a></div>
              </div>
            </details>


<h3>8. 自定义背景</h3>
<details class="folding-tag" cyan><summary> 设置自定义背景 </summary>
              <div class='content'>
              <p><center><input type="text" id="pic-link" size="70%" maxlength="1000" placeholder="请输入有效的图片链接，如 https://picsum.photos/id/1015/1920/1080"></center></p><p><center><button class="winbox_btn picbtn" type="button" onclick="getPicture()" title="用上面填写的图片链接切换网站背景">切换背景</button></center></p>
              </div>
            </details>

<br>
<center><div style="font-size:1.2em;color:var(--theme-color);font-weight:bold;">------ ( •̀ ω •́ )y 到底啦 ------</div></center>
<br>

</div>

</div>

`;

  // 打开面板时按 localStorage 回填所有控件
  var tcRadio = document.getElementById(localStorage.getItem("themeColor"));
  if (tcRadio) tcRadio.checked = true;
  var bgFilterOn = document.getElementById("bgFilterSet");
  if (bgFilterOn) bgFilterOn.checked = (localStorage.getItem("bgFilterOn") == "1");
  var blurRad = document.getElementById("blurRad");
  if (blurRad) blurRad.value = blurRadius;
  var satEl = document.getElementById("saturation");
  if (satEl) satEl.value = saturate;
  var conEl = document.getElementById("contrast");
  if (conEl) conEl.value = contrast;

  var universeSet = document.getElementById("universeSet");
  if (universeSet) universeSet.checked = (localStorage.getItem("universe") == "block");
  var fpsonEl = document.getElementById("fpson");
  if (fpsonEl) fpsonEl.checked = (localStorage.getItem("fpson") == "1");
  var rightSideSet = document.getElementById("rightSideSet");
  if (rightSideSet) rightSideSet.checked = (localStorage.getItem("rs") == "block");
  var lightSet = document.getElementById("lightSet");
  if (lightSet) lightSet.checked = (localStorage.getItem("light") == "true");
  var snowSet = document.getElementById("snowSet");
  if (snowSet) snowSet.checked = (localStorage.getItem("snow") == "block");
  var navSet = document.getElementById("navSet");
  if (navSet) navSet.checked = (localStorage.getItem("nav") == "1");
  var asideSet = document.getElementById("asideSet");
  if (asideSet) asideSet.checked = (localStorage.getItem("aside") == "1");
  var asidePosSet = document.getElementById("asidePosSet");
  if (asidePosSet) asidePosSet.checked = (localStorage.getItem("asidePos") == "1");
  var lanternSet = document.getElementById("lanternSet");
  if (lanternSet) lanternSet.checked = (localStorage.getItem("lantern") == "1");
  var musicSet = document.getElementById("musicSet");
  if (musicSet) musicSet.checked = (localStorage.getItem("music") == "1");
  var nekoSet = document.getElementById("nekoSet");
  if (nekoSet) nekoSet.checked = (localStorage.getItem("neko") == "1");
  var petSet = document.getElementById("petSet");
  if (petSet) petSet.checked = (localStorage.getItem("pet") == "1");
  var scene3dSet = document.getElementById("scene3dSet");
  if (scene3dSet) scene3dSet.checked = (localStorage.getItem("scene3d") == "1");
  markScene3dCards();
  bindScene3dWarm();
  setFontBorder();
  setCodeFontBorder();
}

// 恢复默认背景（不刷新页面）
function resetBg() {
  localStorage.setItem("blogbg", "default");
  resetBg_();
  fomalNotify({
    title: "提示🌰",
    message: "当前已经恢复为默认背景！",
    position: 'top-left',
    offset: 50,
    showClose: true,
    type: "success",
    duration: 5000
  });
}

// 恢复默认设置（不刷新页面，全部就地生效）
function reset() {
  initItem();

  setFont(FONT_DEFAULT);
  setCodeFont(CODE_FONT_DEFAULT);
  setColor("green");

  setUniverse2("block");
  setSnow2("none");
  applyAside();
  applyAsidePos();
  applyLantern();
  applyMusic();
  // initItem() 已把 localStorage 的 nav 写回 "1"，直接重算生效即可。
  // 注意不能走 setNav()：它是无参函数、只读面板上的 checkbox，
  // 面板关着时 getElementById 返回 null 会直接 return（这里就不会生效了）。
  applyNav();

  applyRightside();
  changeLight(true);

  // 帧率：默认恢复为开，并且真正把被停掉的采样循环重新启动
  startFps();
  var fpsPanel = document.getElementById("fps");
  if (fpsPanel) fpsPanel.style.display = "block";

  curTransNum = 92;
  curTransMini = curTransNum * 0.95;
  applyTrans(curTransNum);

  resetBg_();

  // 背景滤镜：恢复默认参数并立即生效
  localStorage.setItem("bgFilterOn", "1");
  blurRadius = 0; saturate = 108; contrast = 105;
  applyBgFilter();
  updateBgFilterShow();

  // 同步面板上的所有控件
  var green = document.getElementById("green");
  if (green) green.checked = true;
  var universeSet = document.getElementById("universeSet");
  if (universeSet) universeSet.checked = true;
  var fpsonEl = document.getElementById("fpson");
  if (fpsonEl) fpsonEl.checked = true;
  var rightSideSet = document.getElementById("rightSideSet");
  if (rightSideSet) rightSideSet.checked = true;
  var lightSet = document.getElementById("lightSet");
  if (lightSet) lightSet.checked = true;
  var snowSet = document.getElementById("snowSet");
  if (snowSet) snowSet.checked = false;
  var navSet = document.getElementById("navSet");
  if (navSet) navSet.checked = true;
  var asideSet = document.getElementById("asideSet");
  if (asideSet) asideSet.checked = true;
  var asidePosSet = document.getElementById("asidePosSet");
  if (asidePosSet) asidePosSet.checked = true;
  var lanternSet = document.getElementById("lanternSet");
  if (lanternSet) lanternSet.checked = false;
  var musicSet = document.getElementById("musicSet");
  if (musicSet) musicSet.checked = true;
  var nekoSet = document.getElementById("nekoSet");
  if (nekoSet) nekoSet.checked = false;
  var petSet = document.getElementById("petSet");
  if (petSet) petSet.checked = true;
  var scene3dSet = document.getElementById("scene3dSet");
  if (scene3dSet) scene3dSet.checked = true;
  /* 恢复默认时 3D 场景也回到出厂的「星港轨道」 */
  localStorage.setItem("scene3d_pack", "orbital-station");
  markScene3dCards();
  /* __scene3dPick 内部会 sync()，它顺带把 <html> 的 meihua-no-scene3d 类也纠正了，
     等于 applyScene3d() 该做的事已经做完，这里不用再调一次。 */
  if (typeof window.__scene3dPick === "function") {
    try { window.__scene3dPick("orbital-station"); } catch (err) { }
  }
  var bgFilterSet = document.getElementById("bgFilterSet");
  if (bgFilterSet) bgFilterSet.checked = true;
  var blurRad = document.getElementById("blurRad");
  if (blurRad) blurRad.value = 0;
  var satEl = document.getElementById("saturation");
  if (satEl) satEl.value = 108;
  var conEl = document.getElementById("contrast");
  if (conEl) conEl.value = 105;

  var transVal = document.getElementById("transVal");
  if (transVal) {
    transVal.innerHTML = `卡片透明度 (0%-100%): <span style="color:#eb5353">` + curTransNum + `%</span>`;
  }
  var transSet = document.getElementById("transSet");
  if (transSet) transSet.value = `${curTransNum}`;
  var rangTrans = document.getElementById("rang_trans");
  if (rangTrans) rangTrans.style.width = `${curTransMini}%`;

  fomalNotify({
    title: "提示🍅",
    message: "当前已经恢复为默认设置！",
    position: 'top-left',
    offset: 50,
    showClose: true,
    type: "success",
    duration: 5000
  });
}

/* 量一次「内容真正需要多大的面板」：
   宽度刚好放下「三、字体设置」常规字体那一行的按钮（最后一个不换行就说明宽度够了），
   高度刚好完整显示第一节「一、显示偏好」——比这更大只会弹出一块又宽又空的大板子 */
function winboxNeedSize() {
  var fallback = { w: 780, h: 540 };
  var box = document.getElementById("meihuaBox");
  var ac = box ? box.querySelector("#article-container") : null;
  if (!ac) return fallback;
  try {
    var pr = box.getBoundingClientRect();
    var acr = ac.getBoundingClientRect();
    var cs = getComputedStyle(ac);
    var padL = parseFloat(cs.paddingLeft) || 0;
    var padR = parseFloat(cs.paddingRight) || 0;
    var padB = parseFloat(cs.paddingBottom) || 0;
    var chromeW = pr.width - acr.width; // 面板边框 + body 内边距占掉的宽度
    // ① 宽度：字体设置第一行要能排下前 5 个按钮
    var swfs = ac.querySelectorAll("#swfs > .swf");
    var n = Math.min(swfs.length, 5);
    var rowW = 0;
    for (var i = 0; i < n; i++) {
      var scs = getComputedStyle(swfs[i]);
      rowW += swfs[i].offsetWidth + (parseFloat(scs.marginLeft) || 0) + (parseFloat(scs.marginRight) || 0);
    }
    var indent = n ? swfs[0].getBoundingClientRect().left - acr.left - padL : 0;
    var lastMr = n ? (parseFloat(getComputedStyle(swfs[n - 1]).marginRight) || 0) : 0;
    var needW = Math.ceil(indent + rowW - lastMr + padL + padR + chromeW) + 10;
    // ② 高度：第一节最后一行开关（侧栏位置）完整可见即可
    var needH = fallback.h;
    var lastTog = ac.querySelector("#asidePosSet");
    if (lastTog) {
      var lr = lastTog.getBoundingClientRect();
      var rowR = lastTog.parentElement.getBoundingClientRect();
      needH = Math.ceil(Math.max(lr.bottom, rowR.bottom) - pr.top + padB) + 6;
    }
    return {
      w: Math.max(620, Math.min(needW, Math.round(document.documentElement.clientWidth * 0.95))),
      h: Math.max(420, Math.min(needH, Math.round(document.documentElement.clientHeight * 0.92)))
    };
  } catch (err) {
    return fallback;
  }
}

// 适应窗口大小
function winResize() {
  try {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
      winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
      // 桌面端：宽度刚好放下字体设置第一行、高度刚好显示完第一节，不再按百分比撑满
      var first = winboxNeedSize();
      winbox.resize(first.w + "px", first.h + "px");
      var final = winboxNeedSize(); // 宽度定下来后，行是否折行才是最终布局，再量一次高度
      winbox.resize(final.w + "px", final.h + "px").move("center", "center");
    }
  } catch (err) {
    // WinBox 在 Pjax 切换过程中可能还没挂载，这里静默跳过
  }
}

// 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口
function toggleWinbox() {
  var box = document.querySelector("#meihuaBox");
  if (box) {
    winbox.toggleClass("hide");
    // 面板收起时给右侧部件让回去（配合 custom.css 里的 body.meihua-panel-open #rightside）
    document.body.classList.toggle("meihua-panel-open", !box.classList.contains("hide"));
  } else {
    createWinbox();
    winResize(); // 面板内容写完了，按内容再量一次尺寸
    document.body.classList.add("meihua-panel-open");
  };
}
// 面板被用户直接点右上角 × 关掉时，WinBox 会移除节点，这里同步清掉让位标记
document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('click', function (e) {
    // .wb-close 是 WinBox 的关闭按钮
    if (e.target && e.target.classList && e.target.classList.contains('wb-close')) {
      document.body.classList.remove('meihua-panel-open');
    }
  });
});

/* 美化模块 end */
