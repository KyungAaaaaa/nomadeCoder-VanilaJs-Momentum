const body = document.querySelector('body'),
    back = body.querySelector(".jsBackGround");

const imageCount = 5;

function init() {
    const randomNumber = Math.floor(Math.random() * imageCount) + 1;
    back.src = `images/${randomNumber}.jpg`;
}

init();