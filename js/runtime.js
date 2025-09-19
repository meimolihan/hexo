var now = new Date();

function createtime() {
    var t = new Date("01/01/2025 00:00:00");
    now.setTime(now.getTime() + 250);

    var e = (now - t) / 1e3 / 60 / 60 / 24;
    var a = Math.floor(e);

    var n = (now - t) / 1e3 / 60 / 60 - 24 * a;
    var r = Math.floor(n);
    if (String(r).length === 1) {
        r = "0" + r;
    }

    var s = (now - t) / 1e3 / 60 - 1440 * a - 60 * r;
    var i = Math.floor(s);
    if (String(i).length === 1) {
        i = "0" + i;
    }

    var o = (now - t) / 1e3 - 86400 * a - 3600 * r - 60 * i;
    var l = Math.round(o);
    if (String(l).length === 1) {
        l = "0" + l;
    }

    let g = "";
    if (r < 18 && r >= 9) {
        g = `<img class='boardsign' src='https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/svg/墨不凡-搬砖中.svg' title=''><span class='textTip'> <br> 本站已运行： ${a} 天</span><span id='runtime'> ${r} 小时 ${i} 分 ${l} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>`;
    } else {
        g = `<img class='boardsign' src='https://cdn.jsdelivr.net/gh/meimolihan/cdn@v1.0.0/svg/墨不凡-休闲中.svg' title=''><span class='textTip'> <br> 本站已运行： ${a} 天</span><span id='runtime'> ${r} 小时 ${i} 分 ${l} 秒 </span> <i class='fas fa-heartbeat' style='color:red'></i>`;
    }

    if (document.getElementById("workboard")) {
        document.getElementById("workboard").innerHTML = g;
    }
}

setInterval(() => {
    createtime();
}, 250);