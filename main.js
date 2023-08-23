let canvas;
let context;

window.onload = init;

let currentX;
let currentY;
let previousX;
let previousY;

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
    previousX = currentX;
    previousY = currentY;

    window.requestAnimationFrame(main);
}

function main() {
    draw();

    window.requestAnimationFrame(main);
}

function draw() {
    context.fillStyle = "azure";
    context.lineWidth = 3;
    context.strokeStyle = "azure";

    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.stroke();
    context.closePath();

    if (isPrime(step)) {
        context.beginPath();
        context.arc(currentX, currentY, 10, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }

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
    previousX = currentX;
    previousY = currentY;

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