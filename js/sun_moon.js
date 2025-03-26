// 定义 saveToLocal 对象
const saveToLocal = {
    set: function (key, value, expiration) {
        // 存储数据时将数据转换为 JSON 字符串
        const data = { value: value, expiration: expiration };
        localStorage.setItem(key, JSON.stringify(data));
    },
    get: function (key) {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                // 检查数据是否过期
                if (parsedData.expiration && Date.now() > parsedData.expiration) {
                    localStorage.removeItem(key);
                    return null;
                }
                return parsedData.value;
            } catch (error) {
                console.error('解析 JSON 数据时出错:', error);
                return null;
            }
        }
        return null;
    }
};

function switchNightMode() {
    document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>');
    setTimeout(function () {
        if (document.querySelector('body').classList.contains('DarkMode')) {
            document.querySelector('body').classList.remove('DarkMode');
            localStorage.setItem('isDark', '0');
            document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
        } else {
            document.querySelector('body').classList.add('DarkMode');
            localStorage.setItem('isDark', '1');
            document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
        }
        setTimeout(function () {
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
            document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
            setTimeout(function () {
                document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
            }, 1000);
        }, 2000);
    });
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    if (nowMode === 'light') {
        // 先设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "1";
        document.getElementById("moon").style.opacity = "0";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "0";
            document.getElementById("moon").style.opacity = "1";
        }, 1000);

        activateDarkMode();
        saveToLocal.set('theme', 'dark', 2);
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun');
    } else {
        // 先设置太阳月亮透明度
        document.getElementById("sun").style.opacity = "0";
        document.getElementById("moon").style.opacity = "1";
        setTimeout(function () {
            document.getElementById("sun").style.opacity = "1";
            document.getElementById("moon").style.opacity = "0";
        }, 1000);

        activateLightMode();
        saveToLocal.set('theme', 'light', 2);
        document.querySelector('body').classList.add('DarkMode');
        document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon');
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof FB === 'object' && window.loadFBComment();
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200);
}

// 添加 activateLightMode 函数定义
function activateLightMode() {
    // 这里可以添加切换到白天模式的具体代码
    document.documentElement.setAttribute('data-theme', 'light');
    // 可以添加其他白天模式的样式修改代码
}

// 添加 activateDarkMode 函数定义
function activateDarkMode() {
    // 这里可以添加切换到夜间模式的具体代码
    document.documentElement.setAttribute('data-theme', 'dark');
    // 可以添加其他夜间模式的样式修改代码
}
    