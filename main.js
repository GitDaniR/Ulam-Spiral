let canvas;
let context;

window.onload = init;

let currentX;
let currentY;

let primes = [2];

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

function isPrime(num) {
    if (num == 1) return false;
    if (num == 2) return true;

    let boundary = Math.sqrt(num);
    for (let i = 0; i < primes.length && primes[i] <= boundary; ++i) {
        if (num % primes[i] == 0) return false;
    }

    primes.push(num);
    return true;
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