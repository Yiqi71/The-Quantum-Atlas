import {
    scaling
} from './main.js';
import {
    loadPngs
} from './main.js';

let hitted = localStorage.getItem("hitted");

let poster = document.getElementById("poster");

//4
let motIsOn = false;

let panel4 = document.getElementById("panel4");
let p4PngNames = ["lasers", "bg1", "red", "active2", "active1"];
let p4Pngs = [];
loadPngs(panel4, "panelsImg/panel4/", p4PngNames, p4Pngs);
p4Pngs[4].style.opacity = "0";
p4Pngs[0].style.opacity = "0";

// the moving atom
let circle = document.getElementById("circle");
let p4ANames = ["atom3", "atom2", "atom1"];
let p4As = [];
loadPngs(circle, "panelsImg/panel4/", p4ANames, p4As);

// Cache Circle Center
// ??????????????????
// ???????????
let circleCenterX, circleCenterY;
function updateCircleCenter() {
    let rect = circle.getBoundingClientRect();
    let anchor = poster.getBoundingClientRect();
    circleCenterX = rect.left + 163 -anchor.left;
    circleCenterY = rect.top + 322;
    console.log(anchor.left);
    console.log(circleCenterX);
}
updateCircleCenter(); // Call once to cache values

function moveCircle(r) {
    let newX = (0.5 - Math.random()) * r;
    let newY = (0.5 - Math.random()) * r;
    circle.style.transition = "transform 0.8s linear"; // Smooth movement
    circle.style.transform = `translate(${newX}px, ${newY}px)`;

}

// Efficient Animation Loop
let animating = false;
function animateCircle() {
    if (!animating) return;
    moveCircle(motIsOn ? 5 : 35);
    requestAnimationFrame(animateCircle);
}
function startCircleAnimation() {
    if (animating) return;
    animating = true;
    animateCircle();
}

function stopCircleAnimation() {
    animating = false;
}
// Start animation once after a delay
setTimeout(startCircleAnimation, 500);


let angle4 = 0;

function rotateCircle() {
    angle4 += 0.3; // Adjust speed (degrees per frame)

    let circleRect = circle.getBoundingClientRect();
    let circleCenterX =  163;
    let circleCenterY = 322;

    // atom
    p4As[2].style.transformOrigin = `${circleCenterX}px ${circleCenterY}px`;
    p4As[2].style.transform = `rotate(${angle4}deg)`;
    p4As[1].style.transformOrigin = `${circleCenterX}px ${circleCenterY}px`;
    p4As[1].style.transform = `rotate(${angle4}deg)`;

    // 底色
    p4As[0].style.transformOrigin = `${circleCenterX}px ${circleCenterY}px`;
    p4As[0].style.transform = `rotate(${angle4}deg)`;

    requestAnimationFrame(rotateCircle); // Keep rotating
}

rotateCircle(); // Start the animation


// panel3
let panel3 = document.getElementById(`panel3`);

// moving circles
let circleContainer = document.createElement("div");
circleContainer.style.overflow = "hidden";
// circleContainer.style.border = "1pt solid black";
circleContainer.style.position = "absolute";
circleContainer.style.top = "119px";
circleContainer.style.left = "367px";
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
        speed += 0.005;
    }
    angle += speed;
    document.getElementById("bigger_circle").style.transform = `rotate(${angle}deg)`;
    document.getElementById("smaller_circle").style.transform = `rotate(-${angle}deg)`;
    requestAnimationFrame(rotateCircles); // Keep rotating
}

// others
let p3PngNames = ["lockFill", "lockOutline", "outline", "atoms2", "atoms1", "atom2", "atom1"];
let p3Pngs = [];
loadPngs(document.getElementById("panel3"), "panelsImg/panel3/", p3PngNames, p3Pngs);
p3Pngs[3].style.mixBlendMode = "lighten";
p3Pngs[5].style.mixBlendMode = "lighten";

// lock animation
let atomDX = -23;
let atomDY = -26;
let lockStart = false;


let locked = false;


let p8PngNames = ["circle1", "circle1_border", "circle2", "atoms2", "atoms1", "entangled"];
let p8Pngs = [];
loadPngs(document.getElementById("panel8"), "panelsImg/panel8/", p8PngNames, p8Pngs);
p8Pngs[0].style.mixBlendMode = "multiply";
p8Pngs[2].style.transformOrigin = "23px 565px";
p8Pngs[2].style.transform = "scale(0.5)";
p8Pngs[5].style.zIndex = 40;

if (locked == false) {
    p8Pngs[5].style.opacity = "0";
}

let cameraInterval = "null";

let button2 = document.createElement("div");
poster.appendChild(button2);
button2.classList = "fakeButton";
button2.style.left = "240px";
button2.style.top = "70px";
button2.addEventListener("click", () => {
    if (locked) return; // Exit if already locked

    lockStart = true;
    console.log("lockStart");

    setTimeout(() => {
        applyTransform(p3Pngs[5], atomDX, atomDY, 3);
        applyTransform(p3Pngs[6], atomDX, atomDY, 3);
        applyScale(p8Pngs[2], 1, 4);
        rotateCircles();
    }, 500);

    setTimeout(() => {
        applyTranslateY(p3Pngs[0], 10, 1.5);
        applyTranslateY(p3Pngs[1], 10, 1.5);
    }, 3500);

    setTimeout(() => {
        locked = true;
        
        startFlashing(p4Pngs[3], p4Pngs[4], 1000);
    }, 2000);

    setTimeout(() => {
        fadeIn(p8Pngs[5], 0.8);
        fadeIn(p4Pngs[0], 0.8);
        console.log("locked");
        motIsOn = true;
        console.log("slowing");
    }, 4500);
});

/** Helper Functions **/
function applyTransform(element, x, y, duration) {
    if (!element) return;
    element.style.transition = `transform ${duration}s ease-in-out`;
    element.style.transform = `translate(${x}px, ${y}px)`;
}

function applyScale(element, scale, duration) {
    if (!element) return;
    element.style.transition = `transform ${duration}s ease-in-out`;
    element.style.transform = `scale(${scale})`;
}

function applyTranslateY(element, y, duration) {
    if (!element) return;
    element.style.transition = `transform ${duration}s ease-in-out`;
    element.style.transform = `translateY(${y}px)`;
}

function fadeIn(element, duration) {
    if (!element) return;
    element.style.transition = `opacity ${duration}s ease-in-out`;
    element.style.opacity = "1";
}

function startFlashing(element1, element2, interval) {
    if (!element1 || !element2) return;

    if (cameraInterval) clearInterval(cameraInterval);
    cameraInterval = setInterval(() => {
        let visible = element1.style.opacity === "0";
        element1.style.opacity = visible ? "1" : "0";
        element2.style.opacity = visible ? "0" : "1";
    }, interval);
}





//5

let p5Names = ["purple", "laser", "bed2", "bed1", "atom"];
let p5Pngs = [];
loadPngs(document.getElementById("panel5"), `panelsImg/panel5/`, p5Names, p5Pngs);