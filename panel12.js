import {
    loadPngs
} from './main.js';

import {
    uPanels
} from './main.js';
import {
    scaling
} from './main.js';

let poster = document.getElementById("poster");
let anchor = poster.getBoundingClientRect();


// 1
let p1PngNames = ["bg1", "active1", "active2", "button_passive", "button_active"];
let p1Pngs = [];
loadPngs(document.getElementById("panel1"), "panelsImg/panel1/", p1PngNames, p1Pngs);
p1Pngs[1].style.opacity = "0";
p1Pngs[2].style.opacity = "0";
p1Pngs[4].style.opacity = "0";
p1Pngs[3].style.zIndex = 41;

// 2
let p2PngNames = ["backg", "bg1"];
let p2Pngs = [];
loadPngs(document.getElementById("panel2"), "panelsImg/panel2/", p2PngNames, p2Pngs);

// 3
let panel3 = document.getElementById(`panel3`);
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
    circleContainer.appendChild(new_circle);
}
panel3.appendChild(circleContainer);

let p3PngNames = ["lockFill", "lockOutline", "outline", "atoms2", "atoms1", "atom2", "atom1"];
let p3Pngs = [];
loadPngs(document.getElementById("panel3"), "panelsImg/panel3/", p3PngNames, p3Pngs);
p3Pngs[3].style.mixBlendMode = "lighten";
p3Pngs[5].style.mixBlendMode = "lighten";

// 4
let panel4 = document.getElementById("panel4");
let p4PngNames = ["lasers", "bg1", "red", "active2", "active1"];
let p4Pngs = [];
loadPngs(panel4, "panelsImg/panel4/", p4PngNames, p4Pngs);
p4Pngs[4].style.opacity = "0";
p4Pngs[0].style.opacity = "0";

//5
let p5Names = ["purple", "laser", "bed2", "bed1", "atom"];
let p5Pngs = [];
loadPngs(document.getElementById("panel5"), `panelsImg/panel5/`, p5Names, p5Pngs);

// 8
let p8PngNames = ["circle1", "circle1_border", "circle2", "atoms2", "atoms1", "entangled"];
let p8Pngs = [];
loadPngs(document.getElementById("panel8"), "panelsImg/panel8/", p8PngNames, p8Pngs);
p8Pngs[0].style.mixBlendMode = "multiply";
p8Pngs[2].style.transformOrigin = "23px 565px";
p8Pngs[2].style.transform = "scale(0.5)";
p8Pngs[5].style.zIndex = 40;



//laser
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = poster.clientWidth;
canvas.height = poster.clientHeight;
let red1Source = {
    x: 178,
    y: 88
};
//angle: 55
let mirror2 = {
    x: 203,
    y: 108,
    r: 40,
    angle: 20,
    adjustX: 0,
    adjustY: 20
};

let deflector = {
    x1: 280,
    y1: 125,
    x2: 180,
    y2: 180
};

let inputReflectAngle = Math.atan2(mirror2.y - red1Source.y, mirror2.x - red1Source.x) * (180 / Math.PI) + 30;
let inputDeflectAngle = Math.atan2(mirror2.y - red1Source.y, mirror2.x - red1Source.x) * (180 / Math.PI);
let isDragging = false;

// Function to draw the laser beam
function drawLaser(x1, y1, x2, y2, color = "red", o) {
    ctx.globalAlpha = o;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawMirror() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 7;

    let mirror2X2 = mirror2.x + (mirror2.r - 20) * Math.cos(mirror2.angle * (Math.PI / 180));
    let mirror2Y2 = mirror2.y + (mirror2.r - 20) * Math.sin(mirror2.angle * (Math.PI / 180));

    ctx.beginPath();
    ctx.moveTo(
        mirror2.x - (mirror2.r - 20) * Math.cos(mirror2.angle * (Math.PI / 180)),
        mirror2.y - (mirror2.r - 20) * Math.sin(mirror2.angle * (Math.PI / 180))
    );
    ctx.lineTo(mirror2X2, mirror2Y2);
    ctx.stroke();

}

// Function to draw the deflector as a line
function drawDeflector() {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(deflector.x1, deflector.y1);
    ctx.lineTo(deflector.x2, deflector.y2);
    ctx.stroke();
}

function getIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    let denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom === 0) return null; // Lines are parallel, no intersection

    let intersectX = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
    let intersectY = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;

    // Check if the intersection point is within the bounds of the line segments
    if (
        Math.min(x1, x2) <= intersectX && intersectX <= Math.max(x1, x2) &&
        Math.min(y1, y2) <= intersectY && intersectY <= Math.max(y1, y2) &&
        Math.min(x3, x4) <= intersectX && intersectX <= Math.max(x3, x4) &&
        Math.min(y3, y4) <= intersectY && intersectY <= Math.max(y3, y4)
    ) {
        return {
            x: intersectX,
            y: intersectY
        };
    }

    return null; // No intersection within bounds
}

// Reflect the laser on the mirror2
function reflectLaser(x1, y1, angle, l, color) {
    let incidentAngle = mirror2.angle;
    let reflectionAngle = 2 * incidentAngle - angle;

    let x2 = x1 + l * Math.cos(reflectionAngle * (Math.PI / 180));
    let y2 = y1 + l * Math.sin(reflectionAngle * (Math.PI / 180));

    drawLaser(mirror2.x, mirror2.y, x2, y2, color, 0.8);
    return {
        x: x2,
        y: y2,
        angle: reflectionAngle
    };

}

// check whether deflected
function isLaserIntersectingDeflector(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    let fx = x1 - deflector.x;
    let fy = y1 - deflector.y;

    let a = dx * dx + dy * dy;
    let b = 2 * (fx * dx + fy * dy);
    let c = fx * fx + fy * fy - 10 * 30; // 20 is the radius of the deflector

    let discriminant = b * b - 4 * a * c;

    return discriminant >= 0; // If true, the laser intersects the deflector
}


// Split the laser into multiple beams at the deflector
function deflectLaser(x, y, angle) {
    let r = 130;
    let beams = [];
    for (let i = 14; i < 86; i += 5) {
        let b = {
            x: x + r * Math.cos((angle + i) * (Math.PI / 180)),
            y: y + r * Math.sin((angle + i) * (Math.PI / 180))
        }
        beams.push(b);
    }
    beams.forEach((beam) => drawLaser(x, y, beam.x, beam.y, "red", 0.4));
}

// Update function to redraw everything
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMirror();
    drawDeflector();

    // Draw initial laser

    drawLaser(red1Source.x, red1Source.y, mirror2.x, mirror2.y, "red", 0.5);

    let reflected2 = reflectLaser(mirror2.x + 3, mirror2.y + 3, inputReflectAngle + 1 + 25, 250, "red");
    let reflected = reflectLaser(mirror2.x, mirror2.y, inputReflectAngle + 25, 250, "blue");
    let reflected1 = reflectLaser(mirror2.x, mirror2.y, inputDeflectAngle, 70, "red");

    // Check if the reflected laser intersects the deflector
    let intersection = getIntersection(mirror2.x, mirror2.y, reflected1.x, reflected1.y, deflector.x1, deflector.y1, deflector.x2, deflector.y2);

    if (intersection) {
        // If intersection is found, deflect laser at that point
        deflectLaser(intersection.x, intersection.y, reflected.angle);
    }
}

let initialAngle = 0;
let mouseIsDown = false;




// button1
let button = document.createElement("div");
poster.appendChild(button);
button.classList = "fakeButton";
button.style.left = "120px";
button.style.top = "50px";
let laserOn = false;
let cameraInterval1 = null;
button.addEventListener("click", () => {
    if (cameraInterval1) return; // Prevent multiple intervals
    uPanels[0].style.opacity = 0;
    // zindex of atom +++++
    // split SLM from bg
    p3Pngs[5].style.zIndex = 41;
    p3Pngs[6].style.zIndex = 41;
    p2Pngs[1].style.zIndex = 141;
    laserOn = true;
    const intervalTime = 600; // Toggle interval (ms)
    let active = false;

    if (!p1Pngs[1] || !p1Pngs[2]) return; // Ensure required elements exist

    toggleVisibility(p1Pngs[3], false); // Hide passive button
    toggleVisibility(p1Pngs[4], true); // Show active button

    cameraInterval1 = setInterval(() => {
        active = !active;
        toggleVisibility(p1Pngs[1], active);
        toggleVisibility(p1Pngs[2], !active);

    }, intervalTime);
    update();
});

/** Helper function for setting element visibility **/
function toggleVisibility(element, isVisible) {
    if (element) element.style.opacity = isVisible ? "1" : "0";
}




//4
let motIsOn = false;

// the moving atom
let circle = document.getElementById("circle");
let p4ANames = ["atom3", "atom2", "atom1"];
let p4As = [];
loadPngs(circle, "panelsImg/panel4/", p4ANames, p4As);

// Cache Circle Center
let circleCenterX, circleCenterY;

function updateCircleCenter() {
    let rect = circle.getBoundingClientRect();
    let anchor = poster.getBoundingClientRect();
    circleCenterX = rect.left + 163 - anchor.left;
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
    let circleCenterX = 163;
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




// 3
// moving circles


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



// lock animation
let atomDX = -23;
let atomDY = -26;
let lockStart = false;


let locked = false;




if (locked == false) {
    p8Pngs[5].style.opacity = "0";
}

let cameraInterval2 = "null";

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



// Drag-to-Rotate functionality
canvas.addEventListener("mousedown", (event) => {
    if (laserOn) {
        let dx = event.clientX - mirror2.x + mirror2.adjustX - anchor.left;
        let dy = event.clientY - mirror2.y + mirror2.adjustY;

        if (Math.sqrt(dx * dx + dy * dy) < 80) {
            isDragging = true;
            initialAngle = Math.atan2(dy, dx) * (180 / Math.PI);
            mouseIsDown = true;

        }
    }

});
let hitted = false;

canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        let dx = event.clientX - mirror2.x + mirror2.adjustX - anchor.left;
        let dy = event.clientY - mirror2.y + mirror2.adjustY;
        let currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        mirror2.angle = currentAngle;
        update();
        initialAngle = currentAngle;
    }
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
    mouseIsDown = false;
    console.log(mirror2.angle);
    if (mirror2.angle > 52 && mirror2.angle < 57) {
        hitted = true;
        console.log("hitted");
        uPanels[1].style.opacity = "0";
        uPanels[2].style.opacity = "0";
        uPanels[3].style.opacity = "0";
        uPanels[7].style.opacity = "0";
        uPanels[8].style.opacity = "0";

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
    }
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

    if (cameraInterval2) clearInterval(cameraInterval2);
    cameraInterval2 = setInterval(() => {
        let visible = element1.style.opacity === "0";
        element1.style.opacity = visible ? "1" : "0";
        element2.style.opacity = visible ? "0" : "1";
    }, interval);
}