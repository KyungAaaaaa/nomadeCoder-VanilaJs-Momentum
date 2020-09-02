const clockDiv = document.querySelector(".jsClock"),
    clock = clockDiv.querySelector("h1")
amPm = clockDiv.querySelector("h4")

//현재 시간을 보여주는 메소드
function startClock() {
    if (clock) {
        const date = new Date();
        const hours = date.getHours();
        const minute = date.getMinutes();
        const seconds = date.getSeconds();
        const utcHours = hours > 12 ? hours - 12 : hours;
        amPm.innerText = `${hours > 12 ? 'PM' : 'AM'}`;
        clock.innerText = `${utcHours}:${(minute < 10) ? `0${minute}` : minute}:${(seconds < 10) ? `0${seconds}` : seconds}`;
    }
}

function init() {
    startClock();
    setInterval(startClock, 1000);
}

init();