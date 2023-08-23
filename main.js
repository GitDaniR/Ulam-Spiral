let canvas;
let context;

window.onload = init;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    window.requestAnimationFrame(main);
}

function main() {
    draw();

    window.requestAnimationFrame(main);
}

function draw() {
}