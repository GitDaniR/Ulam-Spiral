let canvas;
let context;

window.onload = init;

let currentX;
let currentY;
let previousX;
let previousY;

let primes = [2];

let zoom = 1;
let widthOfLine = 5 / zoom;
let circleRadius = 10 / zoom;
let mainColor = "azure";

let step = 1;
let stepsBeforeTurn = 1;
let direction = 0;
let stepSize = 20 / zoom;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    // Set pointer to center of canvas
    currentX = canvas.width / 2;
    currentY = canvas.height / 2;
    previousX = currentX;
    previousY = currentY;

    // Set draw config
    context.fillStyle = mainColor;
    context.lineWidth = widthOfLine;
    context.strokeStyle = mainColor;

    window.requestAnimationFrame(main);
}

function main() {
    draw();

    window.requestAnimationFrame(main);
}

function draw() {
    // Draw line between previous and current pointers
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.stroke();
    context.closePath();

    // Draw circle if the current number is a prime
    if (isPrime(step)) {
        context.beginPath();
        context.arc(currentX, currentY, circleRadius, 0, 2 * Math.PI);
        context.fill();
        context.closePath();
    }

    doStep();
}

/* Method which checks if a given number is a prime
* by dividing it by the previous prime numbers, less than
* or equal to the square root of the number.
* If the nubmer is a prime it is added to the list of
* other primes.
* @param num - the number to check
*/ 
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
    // Store previous pointer location
    previousX = currentX;
    previousY = currentY;

    // Move pointer
    switch (direction) {
        case 0: currentX += stepSize; break; // RIGHT
        case 1: currentY -= stepSize; break; // UP
        case 2: currentX -= stepSize; break; // LEFT
        case 3: currentY += stepSize; break; // DOWN
    }

    // Check if the pointer needs to turn
    if (step % stepsBeforeTurn == 0) {
        stepsBeforeTurn += direction % 2; // Increment only if the pointer moved UP or DOWN previously
        direction = (direction + 1) % 4; // Change direction: RIGHT -> UP -> LEFT -> DOWN -> RIGHT...
    }

    // Increment step
    ++step;
}