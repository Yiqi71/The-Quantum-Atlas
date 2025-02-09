import {
    scaling
} from './main.js';
import {
    loadPngs
} from './main.js';

let panel4 = document.getElementById("panel4");
let p4PngNames = ["bg", "atom3", "atom2", "atom1"];
let p4Pngs = [];


// the moving atom
const circle = document.getElementById("circle");
let p4ANames = ["atom3", "atom2", "atom1"];
let p4As = [];
loadPngs(circle, "panelsImg/panel4/", p4ANames, p4As);

function moveCircle() {
    let newX = (0.5 - Math.random()) * 20;
    let newY = (0.5 - Math.random()) * 20;
    circle.style.transition = "transform 0.8s linear"; // Smooth movement
    circle.style.transform = `translate(${newX}px, ${newY}px)`;

}
// Move the circle every 2 seconds
setTimeout(() => {
    setInterval(moveCircle, 200);
}, 500);

let angle = 0;

function rotateCircles() {
    angle += 0.3; // Adjust speed (degrees per frame)

    let circleRect = circle.getBoundingClientRect();
    let circleCenterX = circleRect.left + 163;
    let circleCenterY = circleRect.top + 322;

    // atom
    p4As[2].style.transformOrigin = `${circleCenterX}px ${circleCenterY}px`;
    p4As[2].style.transform = `rotate(${angle}deg)`;
    p4As[1].style.transformOrigin = `${circleCenterX}px ${circleCenterY}px`;
    p4As[1].style.transform = `rotate(${angle}deg)`;

    // 底色
    p4As[0].style.transformOrigin = `${circleCenterX}px ${circleCenterY}px`;
    p4As[0].style.transform = `rotate(${angle}deg)`;

    requestAnimationFrame(rotateCircles); // Keep rotating
}

rotateCircles(); // Start the animation