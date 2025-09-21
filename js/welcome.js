/* 欢迎语模块 - 2025-06-25 修复版 */
/* 全局变量，避免暂时性死区 */
var ipLocation = null;          // 置空标记“尚未拿到”
var ipFetched  = false;         // 防止 PJAX 重复请求

/* ---------- 工具 ---------- */
function isHomePage() {
    return window.location.pathname === '/' ||
        window.location.pathname === '/index.html';
}

/* ---------- IP 获取 ---------- */
(async function fetchIpOnce() {
    if (ipFetched) return;      // 已经请求过就退出
    ipFetched = true;

    try {
        const res = await fetch('https://api.nsmao.net/api/ip/query?key=2GmYt00SUwYiAI9zIbTdP8hZ0J');
        if (!res.ok) throw new Error('Network response was not ok');
        ipLocation = await res.json();
    } catch (e) {
        console.warn('IP 接口失败，使用降级', e);
        /* 降级数据，保证后续代码不崩 */
        ipLocation = {
            ip: '未知',
            data: {
                country: '中国',
                prov: '未知',
                city: '未知',
                district: '未知',
                lng: 116.680584,
                lat: 35.649829
            }
        };
    }

    /* 拿到数据后再渲染 */
    if (isHomePage()) showWelcome();
})();

/* ---------- 欢迎弹窗 ---------- */
function showWelcome() {
    if (!ipLocation || !ipLocation.data) return;   // 二次保护

    const dist = getDistance(116.680584, 35.649829,
        ipLocation.data.lng,
        ipLocation.data.lat);
    let pos  = ipLocation.data.country;
    let ip   = ipLocation.ip || '未知';
    let posdesc;

    /* IPv6 简化显示 */
    if (ip.includes(':')) ip = '<br>好复杂，咱看不懂~(ipv6)';

    /* ====== 以下国家/省市判断保持你原来逻辑 ====== */
    switch (ipLocation.data.country) {
        case '日本': posdesc = 'よろしく，一起去看樱花吗'; break;
        case '美国': posdesc = 'Let us live in peace!'; break;
        /* ...... 其余省略，与你原文件相同 ...... */
        default: posdesc = '带我去你的城市逛逛吧！'; break;
    }

    /* 时段欢迎语 */
    const hour = new Date().getHours();
    let timeChange =
        hour < 5  ? '<span>🛏️ 夜深了，早点休息 🌃</span>'
            : hour < 11 ? '<span>🌤️ 早上好，加油加油 💪</span>'
                : hour < 13 ? '<span>☀️ 中午好，记得午休喔 🍹</span>'
                    : hour < 17 ? '<span>🕞 下午好，饮茶先啦 ☕</span>'
                        : hour < 19 ? '<span>🚶‍♂️ 即将下班，按时吃饭喔 🍚</span>'
                            : '<span>🌙 晚上好，夜生活嗨起来 🍻</span>';

    const html = `
欢迎来自 <b style="font-size:15px;color:var(--theme-color)">${pos}</b> 的朋友💖
距博主约：<b style="font-size:15px;color:var(--theme-color)">${dist.toFixed(2)}</b> 公里 🚗
IP 地址是：<b style="font-size:15px;color:var(--theme-color)">${ip}</b>
${timeChange}
<b style="font-size:15px;color:var(--theme-color)">${posdesc}</b>`;

    const welcomeBox = document.getElementById('welcome-info');
    if (welcomeBox) welcomeBox.innerHTML = html;
    else console.log('[welcome] 未找到 #welcome-info 元素');
}

/* ---------- 球面距离计算 ---------- */
function getDistance(e1, n1, e2, n2) {
    const R = 6371;
    const { sin, cos, asin, PI, hypot } = Math;
    const toRad = d => d * PI / 180;
    const a = {
        x: cos(toRad(n1)) * cos(toRad(e1)),
        y: cos(toRad(n1)) * sin(toRad(e1)),
        z: sin(toRad(n1))
    };
    const b = {
        x: cos(toRad(n2)) * cos(toRad(e2)),
        y: cos(toRad(n2)) * sin(toRad(e2)),
        z: sin(toRad(n2))
    };
    const c = hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    return Math.round(asin(c / 2) * 2 * R);
}

/* ---------- PJAX 支持 ---------- */
document.addEventListener('pjax:complete', () => {
    if (isHomePage() && ipLocation) showWelcome();
});