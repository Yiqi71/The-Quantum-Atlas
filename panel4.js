import {
    scaling
} from './main.js';
import {
    loadPngs
} from './main.js';

let panel4 = document.getElementById("panel4");
let p4PngNames = ["lasers", "bg2", "bg1", "active2", "active1", "red"];
let p4Pngs = [];
loadPngs(panel4, "panelsImg/panel4/", p4PngNames, p4Pngs);

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

function slowCircle() {
    let x = parseFloat(circle.style.left) || 0;
    let y = parseFloat(circle.style.top) || 0;
    x = (0.5 - Math.random()) * x;
    y = (0.5 - Math.random()) * y;
    circle.style.transition = "transform 0.8s linear"; // Smooth movement
    circle.style.transform = `translate(${x}px, ${y}px)`;
}

let motIsOn = false;

if (motIsOn) {
    //smoothly, gradually stay at left0 top0
    setTimeout(() => {
        setInterval(slowCircle, 400);
        console.log("slowing");
    }, 600);
} else {
    setTimeout(() => {
        setInterval(moveCircle, 400);
    }, 600);
}


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