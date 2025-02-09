import {
    scaling
} from './main.js';
import {
    loadPngs
} from './main.js';

let hitted = localStorage.getItem("hitted");
// panel3
let panel3 = document.getElementById(`panel3`);

// moving circles
let circleContainer = document.createElement("div");
circleContainer.style.overflow = "hidden";
// circleContainer.style.border = "1pt solid black";
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
let speedMax = 0.5
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
p3Pngs[6].style.mixBlendMode = "lighten";

// lock animation
let atomDX = -23;
let atomDY = -26;
let lockStart = false;


let locked = false;
async function init() {
    await loadPngs(document.getElementById("panel3"), "panelsImg/panel3/", p3PngNames, p3Pngs);
    await loadPngs(document.getElementById("panel8"), "panelsImg/panel8/", p8PngNames, p8Pngs);
    hitted = localStorage.getItem("hitted");
    if (hitted == "true") {
        lockStart = true;
        console.log("lockStart");
        if (locked == false) {
            setTimeout(() => {
                p3Pngs[6].style.transition = "transform 3s ease-in-out"; // Adjust the speed as needed
                p3Pngs[6].style.transform = `translate(${atomDX}px, ${atomDY}px)`; // Apply the translation
                p3Pngs[7].style.transition = "transform 3s ease-in-out"; // Adjust the speed as needed
                p3Pngs[7].style.transform = `translate(${atomDX}px, ${atomDY}px)`; // Apply the translation
            }, 500);
            setTimeout(() => {
                p3Pngs[1].style.transform = "translateY(10px)";
                p3Pngs[1].style.transition = "transform 1.5s ease-in-out";
                p3Pngs[2].style.transform = "translateY(10px)";
                p3Pngs[2].style.transition = "transform 1.5s ease-in-out";

            }, 7000);
            setTimeout(() => {
                locked = true;
                rotateCircles();
            }, 2500);

        }
    } else {

        p3Pngs[2].style.top = "0";
        p3Pngs[1].style.top = "0";
        console.log("not start");
    }
}
init();


let p8PngNames = ["bg2", "bg1", "circle1", "circle1_border", "circle2", "atoms2", "atoms1", "entangled"];
let p8Pngs = [];
loadPngs(document.getElementById("panel8"), "panelsImg/panel8/", p8PngNames, p8Pngs);
p8Pngs[2].style.mixBlendMode = "multiply";
p8Pngs[4].style.transformOrigin = "23px 565px";
p8Pngs[4].style.transform = "scale(0.5)";
p8Pngs[7].style.zIndex = 40;

if (locked == false) {
    p8Pngs[7].style.opacity = "0";
}
if (lockStart) {
    setTimeout(() => {
        p8Pngs[4].style.transition = "transform 4s ease-in-out";
        p8Pngs[4].style.transform = "scale(1)";
    }, 2000);
    setTimeout(() => {
        if (locked === true) {
            p8Pngs[7].style.transition = "opacity 0.8s ease-in-out";
            p8Pngs[7].style.opacity = "1";
            console.log("locked");
        }
    }, 9500);
}