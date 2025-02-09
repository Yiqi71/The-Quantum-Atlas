import {
    scaling
} from './main.js';
import {
    loadPngs
} from './main.js';


// panel3
let panel3 = document.getElementById(`panel3`);
// NOTE: change the size and position of smaller circle
// moving circles
let circleContainer = document.createElement("div");
circleContainer.style.overflow = "hidden";
circleContainer.style.border = "1pt solid black";
circleContainer.style.position = "absolute";
circleContainer.style.top = "117px";
circleContainer.style.left = "365px";
circleContainer.style.width = "97px";
circleContainer.style.height = "90px";
let circles = ["bigger_circle", "smaller_circle"];
let circleTops = [0, 30];
let circleLefts = [0, 35];
let circleScaling = [0.70, 0.6];
let zIndexs = [-10, -1];
for (let i = 0; i < circles.length; i++) {
    let new_circle = document.createElement("img");
    new_circle.id = circles[i];
    new_circle.src = "panelsImg/panel3/" + circles[i] + ".png";
    new_circle.alt = "panelsImg/panel3/" + circles[i] + ".png";
    new_circle.width *= scaling;
    new_circle.width *= circleScaling[i];
    new_circle.style.position = "absolute";
    new_circle.style.left = circleLefts[i] + "px";
    new_circle.style.top = circleTops[i] + "px";
    // new_circle.style.zIndex = zIndexs[i];

    circleContainer.appendChild(new_circle);
}
panel3.appendChild(circleContainer);

let angle = 0;
let speedMax = 0.4
let speed = 0;

function rotateCircles() {
    if (speed < speedMax) {
        speed += 0.002;
    }
    angle += speed;
    document.getElementById("bigger_circle").style.transform = `rotate(${angle}deg)`;
    document.getElementById("smaller_circle").style.transform = `rotate(-${angle}deg)`;
    requestAnimationFrame(rotateCircles); // Keep rotating
}

// others
let p3PngNames = ["bg", "lockFill", "lockOutline", "outline", "atoms2", "atoms1", "atom2", "atom1"];
let p3Pngs = [];
loadPngs(document.getElementById("panel3"), "panelsImg/panel3/", p3PngNames, p3Pngs);
p3Pngs[0].style.zIndex = -1;
p3Pngs[4].style.mixBlendMode = "lighten";

// lock animation
export let locked = false;
if (locked == false) {
    setTimeout(() => {
        p3Pngs[1].style.transform = "translateY(10px)";
        p3Pngs[1].style.transition = "transform 1.5s ease-in-out";
        p3Pngs[2].style.transform = "translateY(10px)";
        p3Pngs[2].style.transition = "transform 1.5s ease-in-out";
    }, 500);
    rotateCircles();
    locked = true;
} else {
    p3Pngs[2].style.top = "0";
    p3Pngs[1].style.top = "0";
}