import {
    loadPngs
} from './main.js';

import {
    uPanels
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


let button = document.createElement("div");
poster.appendChild(button);
button.classList = "fakeButton";
button.style.left = "120px";
button.style.top = "50px";
let laserOn = false;
let cameraInterval = null;
button.addEventListener("click", () => {
    if (cameraInterval) return; // Prevent multiple intervals
    uPanels[0].style.opacity = 0;
    // zindex of atom +++++
    // split SLM from bg
    p2Pngs[1].style.zIndex = 41;
    laserOn = true;
    const intervalTime = 600; // Toggle interval (ms)
    let active = false;

    if (!p1Pngs[1] || !p1Pngs[2]) return; // Ensure required elements exist

    toggleVisibility(p1Pngs[3], false); // Hide passive button
    toggleVisibility(p1Pngs[4], true); // Show active button

    cameraInterval = setInterval(() => {
        active = !active;
        toggleVisibility(p1Pngs[1], active);
        toggleVisibility(p1Pngs[2], !active);
        update();
    }, intervalTime);
});

/** Helper function for setting element visibility **/
function toggleVisibility(element, isVisible) {
    if (element) element.style.opacity = isVisible ? "1" : "0";
}








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

let mirror1 = {
    x: 179,
    y: 89,
    r: 50,
    angle: 40,
    adjustX: 0,
    adjustY: 20
};

let deflector = {
    x1: 300,
    y1: 125,
    x2: 200,
    y2: 140
};

let inputAngle = Math.atan2(mirror2.y - red1Source.y, mirror2.x - red1Source.x) * (180 / Math.PI) + 55;
let inputAngle1 = Math.atan2(mirror1.y - red1Source.y, mirror1.x - red1Source.x) * (180 / Math.PI);
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

// Function to draw the mirror1
function drawMirror() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 7;

    let mirror2X2 = mirror2.x + (mirror2.r - 20) * Math.cos(mirror2.angle * (Math.PI / 180));
    // console.log(mirror2X2);
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
    let r = 150;
    let beams = [];
    for (let i = 2; i < 77; i += 5) {
        let b = {
            x: x + r * Math.cos((angle + i) * (Math.PI / 180)),
            y: y + r * Math.sin((angle + i) * (Math.PI / 180))
        }
        beams.push(b);
    }
    beams.forEach((beam) => drawLaser(x + 18, y, beam.x, beam.y, "red", 0.4));
}

// Update function to redraw everything
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMirror();
    // drawDeflector();

    // Draw initial laser
    //drawLaser(red1Source.x, red1Source.y, mirror1.x, mirror1.y);
    drawLaser(red1Source.x, red1Source.y, mirror2.x, mirror2.y, "red", 0.5);

    // Reflect the laser at the mirror1

    let reflected2 = reflectLaser(mirror2.x + 3, mirror2.y + 3, inputAngle + 1, 250, "red");
    let reflected = reflectLaser(mirror2.x, mirror2.y, inputAngle, 250, "blue");
    let reflected1 = reflectLaser(mirror1.x, mirror1.y, inputAngle1, 100, "red");

    // Check if the reflected laser intersects the deflector
    let intersection = getIntersection(mirror1.x, mirror1.y, reflected1.x, reflected1.y, deflector.x1, deflector.y1, deflector.x2, deflector.y2);

    if (intersection) {
        // If intersection is found, deflect laser at that point
        deflectLaser(intersection.x, intersection.y, reflected.angle);
    }
}

let initialAngle = 0;
let mouseIsDown = false;
// Drag-to-Rotate functionality
canvas.addEventListener("mousedown", (event) => {
    if (laserOn) {
        let dx = event.clientX - mirror2.x + mirror2.adjustX - anchor.left;
        let dy = event.clientY - mirror2.y + mirror2.adjustY;
        console.log(dx);
        console.log(event.clientX + "-" + mirror2.x + "+" + mirror2.adjustX + "-" + anchor.left);
        console.log("canvas");


        // If mouse is close to the mirror1, start dragging to rotate
        if (Math.sqrt(dx * dx + dy * dy) < 80) {
            isDragging = true;
            initialAngle = Math.atan2(dy, dx) * (180 / Math.PI);
            mouseIsDown = true;

        }
    }

});
localStorage.setItem("hitted", "false");

canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        // Calculate the angle between mirror1 and mouse position
        let dx = event.clientX - mirror2.x + mirror2.adjustX - anchor.left;
        let dy = event.clientY - mirror2.y + mirror2.adjustY;
        console.log(dx, dy);

        let currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        // console.log(currentAngle, initialAngle);

        mirror2.angle = currentAngle;
        // mirror2.angle += currentAngle - initialAngle;
        update();
        initialAngle = currentAngle;
    }
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
    mouseIsDown = false;
    console.log(mirror2.angle);
    if (mirror2.angle > 52 && mirror2.angle < 57) {
        localStorage.setItem("hitted", "true");
        console.log("hitted");
    }
});


document.addEventListener("mousemove", (event) => {
    // console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
});


// Initial render
if (laserOn == "true") {
    update();
}