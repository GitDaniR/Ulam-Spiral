let canvas;
let context;

window.onload = init;

let currentX;
let currentY;

let step = 1;
let stepsBeforeTurn = 1;
let incStepsBeforeTurn = true;
let direction = 0;
let stepSize = 20;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    currentX = canvas.width / 2;
    currentY = canvas.height / 2;

    window.requestAnimationFrame(main);
}

function main() {
    draw();

    window.requestAnimationFrame(main);
}

function draw() {
    context.font = "30px Arial";
    context.fillText(step, currentX, currentY);

    doStep();
}

function doStep() {
    switch (direction) {
        case 0: currentX += stepSize; break; // RIGHT
        case 1: currentY -= stepSize; break; // UP
        case 2: currentX -= stepSize; break; // LEFT
        case 3: currentY += stepSize; break; // DOWN
    }

    if (step % stepsBeforeTurn == 0) {
        incStepsBeforeTurn = !incStepsBeforeTurn;
        stepsBeforeTurn += incStepsBeforeTurn;
        direction = (direction + 1) % 4;
    }
    ++step;
}