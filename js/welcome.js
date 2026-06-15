/* 欢迎语模块 - 最终修复版 */
var ipLocation = null;
var ipFetched  = false;

function isHomePage() {
    return window.location.pathname === '/' ||
        window.location.pathname === '/index.html';
}

(async function fetchIpOnce() {
    if (ipFetched) return;
    ipFetched = true;

    try {
        const res = await fetch('https://ipapi.co/json/');
        const json = await res.json();
        // 英文国家名转中文
        const countryMap = {
            'China': '中国', 'Japan': '日本', 'United States': '美国',
            'South Korea': '韩国', 'Germany': '德国', 'France': '法国',
            'United Kingdom': '英国', 'Russia': '俄罗斯', 'India': '印度',
            'Australia': '澳大利亚', 'Canada': '加拿大', 'Brazil': '巴西',
            'Taiwan': '台湾', 'Hong Kong': '香港', 'Singapore': '新加坡',
            'Netherlands': '荷兰', 'Italy': '意大利', 'Spain': '西班牙'
        };
        ipLocation = {
            ip: json.ip || '未知',
            data: {
                country: countryMap[json.country_name] || json.country_name || '未知',
                prov: json.region || '未知',
                city: json.city || '未知',
                district: json.city || '未知',
                lng: parseFloat(json.longitude) || 0,
                lat: parseFloat(json.latitude) || 0
            }
        };
        console.log("IP定位数据：", ipLocation);
    } catch (e) {
        console.warn('IP 接口失败，使用降级', e);
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

    if (isHomePage()) showWelcome();
})();

function showWelcome() {
    if (!ipLocation || !ipLocation.data) return;

    const dist = getDistance(116.680584, 35.649829,
        ipLocation.data.lng,
        ipLocation.data.lat);
    let pos  = ipLocation.data.country;
    let ip   = ipLocation.ip || '未知';
    let posdesc;

    if (ip.includes(':')) ip = '<br>好复杂，咱看不懂~(ipv6)';

    switch (ipLocation.data.country) {
        case '日本': posdesc = 'よろしく，一起去看樱花吗'; break;
        case '美国': posdesc = 'Let us live in peace!'; break;
        default: posdesc = '带我去你的城市逛逛吧！'; break;
    }

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
    if (welcomeBox) {
        welcomeBox.innerHTML = html;
    } else {
        console.log('[welcome] 未找到 #welcome-info 元素');
    }
}

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

document.addEventListener('pjax:complete', () => {
    if (isHomePage() && ipLocation) showWelcome();
});