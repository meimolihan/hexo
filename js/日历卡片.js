document.addEventListener("DOMContentLoaded", () => {
    initializeCalendarCard();
});

document.addEventListener("pjax:complete", () => {
    initializeCalendarCard();
});

function initializeCalendarCard() {
    calendarUpdateTimes();
    calendarRefreshSchedule();
}

let calendar_year, calendar_month, calendar_week, calendar_date, calendar_dates, calendar_weekStr, calendar_monthStr;
let calendar_asideTime, calendar_asideDay, calendar_asideDayNum, calendar_animalYear, calendar_ganzhiYear;
let calendar_lunarMon, calendar_lunarDay, calendar_newYearDate, calendar_daysUntilNewYear;
const calendar_now = new Date();

function calendarRefreshSchedule() {
    const calendar_scheduleElement = document.getElementById("card-schedule");
    if (calendar_scheduleElement) {
        calendar_asideDay = (calendar_now - calendar_asideTime) / 1e3 / 60 / 60 / 24;
        calendar_scheduleElement.querySelector("#pBar_year").value = calendar_asideDay;
        calendar_scheduleElement.querySelector("#p_span_year").innerHTML = (calendar_asideDay / 365 * 100).toFixed(1) + "%";
        calendar_scheduleElement.querySelector(".schedule-r0 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(365 - calendar_asideDay).toFixed(0)} </a>天`;
        calendar_scheduleElement.querySelector("#pBar_month").value = calendar_date;
        calendar_scheduleElement.querySelector("#pBar_month").max = calendar_dates;
        calendar_scheduleElement.querySelector("#p_span_month").innerHTML = (calendar_date / calendar_dates * 100).toFixed(1) + "%";
        calendar_scheduleElement.querySelector(".schedule-r1 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(calendar_dates - calendar_date)} </a>天`;
        calendar_scheduleElement.querySelector("#pBar_week").value = calendar_week === 0 ? 7 : calendar_week;
        calendar_scheduleElement.querySelector("#p_span_week").innerHTML = ((calendar_week === 0 ? 7 : calendar_week) / 7 * 100).toFixed(1) + "%";
        calendar_scheduleElement.querySelector(".schedule-r2 .schedule-d1 .aside-span2").innerHTML = `还剩<a> ${(7 - (calendar_week === 0 ? 7 : calendar_week))} </a>天`;
    }
}

function calendarUpdateTimes() {
    calendar_year = calendar_now.getFullYear();
    calendar_month = calendar_now.getMonth();
    calendar_week = calendar_now.getDay();
    calendar_date = calendar_now.getDate();

    const calendar_element = document.getElementById("card-calendar");
    if (calendar_element) {
        const calendar_isLeapYear = calendar_year % 4 === 0 && calendar_year % 100 !== 0 || calendar_year % 400 === 0;
        calendar_weekStr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][calendar_week];
        const calendar_monthData = [
            { month: "1月", days: 31 },
            { month: "2月", days: calendar_isLeapYear ? 29 : 28 },
            { month: "3月", days: 31 },
            { month: "4月", days: 30 },
            { month: "5月", days: 31 },
            { month: "6月", days: 30 },
            { month: "7月", days: 31 },
            { month: "8月", days: 31 },
            { month: "9月", days: 30 },
            { month: "10月", days: 31 },
            { month: "11月", days: 30 },
            { month: "12月", days: 31 }
        ];
        calendar_monthStr = calendar_monthData[calendar_month].month;
        calendar_dates = calendar_monthData[calendar_month].days;

        const calendar_t = (calendar_week + 8 - calendar_date % 7) % 7;
        let calendar_n = "", calendar_d = false, calendar_s = 7 - calendar_t;
        const calendar_o = (calendar_dates - calendar_s) % 7 === 0 ? Math.floor((calendar_dates - calendar_s) / 7) + 1 : Math.floor((calendar_dates - calendar_s) / 7) + 2;
        const calendar_c = calendar_element.querySelector("#calendar-main");
        const calendar_l = calendar_element.querySelector("#calendar-date");

        calendar_l.style.fontSize = ["64px", "48px", "36px"][Math.min(calendar_o - 3, 2)];

        for (let i = 0; i < calendar_o; i++) {
            if (!calendar_c.querySelector(`.calendar-r${i}`)) {
                calendar_c.innerHTML += `<div class='calendar-r${i}'></div>`;
            }
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j === calendar_t) {
                    calendar_n = 1;
                    calendar_d = true;
                }
                const calendar_r = calendar_n === calendar_date ? " class='now'" : "";
                if (!calendar_c.querySelector(`.calendar-r${i} .calendar-d${j} a`)) {
                    calendar_c.querySelector(`.calendar-r${i}`).innerHTML += `<div class='calendar-d${j}'><a${calendar_r}>${calendar_n}</a></div>`;
                }
                if (calendar_n >= calendar_dates) {
                    calendar_n = "";
                    calendar_d = false;
                }
                if (calendar_d) {
                    calendar_n += 1;
                }
            }
        }

        const calendar_lunarDate = chineseLunar.solarToLunar(new Date(calendar_year, calendar_month, calendar_date));
        calendar_animalYear = chineseLunar.format(calendar_lunarDate, "A");
        calendar_ganzhiYear = chineseLunar.format(calendar_lunarDate, "T").slice(0, -1);
        calendar_lunarMon = chineseLunar.format(calendar_lunarDate, "M");
        calendar_lunarDay = chineseLunar.format(calendar_lunarDate, "d");

        calendar_newYearDate = new Date("2025/01/28 00:00:00");
        calendar_daysUntilNewYear = Math.floor((calendar_newYearDate - calendar_now) / 1e3 / 60 / 60 / 24);
        calendar_asideTime = new Date(`${new Date().getFullYear()}/01/01 00:00:00`);
        calendar_asideDay = (calendar_now - calendar_asideTime) / 1e3 / 60 / 60 / 24;
        calendar_asideDayNum = Math.floor(calendar_asideDay);
        const calendar_weekNum = calendar_week - calendar_asideDayNum % 7 >= 0 ? Math.ceil(calendar_asideDayNum / 7) : Math.ceil(calendar_asideDayNum / 7) + 1;
        calendar_year = calendar_year.toString().slice(-2);

        calendar_element.querySelector("#calendar-week").innerHTML = `${calendar_year}年${calendar_monthStr}&nbsp;${calendar_weekStr}`;
        calendar_element.querySelector("#calendar-date").innerHTML = calendar_date.toString().padStart(2, "0");
        calendar_element.querySelector("#calendar-solar").innerHTML = `第${calendar_weekNum}周&nbsp;第${calendar_asideDay.toFixed(0)}天`;
        calendar_element.querySelector("#calendar-lunar").innerHTML = `${calendar_ganzhiYear}${calendar_animalYear}年&nbsp;${calendar_lunarMon}${calendar_lunarDay}`;
        document.getElementById("schedule-days").innerHTML = calendar_daysUntilNewYear;
    }
}