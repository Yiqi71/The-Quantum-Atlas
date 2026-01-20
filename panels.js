import {
    loadPngs
} from './main.js';

import {
    uPanels
} from './main.js';
import {
    scaling
} from './main.js';
import {
    uPanelWrappers
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
p2Pngs[0].style.zIndex = 41;
p2Pngs[1].style.zIndex = 42;

// 3
let panel3 = document.getElementById(`panel3`);
let circleContainer = document.createElement("div");
circleContainer.style.overflow = "hidden";
// circleContainer.style.border = "1pt solid black";
circleContainer.style.position = "absolute";
circleContainer.style.top = `${scaling*626.315789}px`;
circleContainer.style.left = `${scaling*1931.57895}px`;
circleContainer.style.width = `${scaling*510.526316}px`;
circleContainer.style.height = `${scaling*473.684211}px`;
let circles = ["bigger_circle", "smaller_circle"];
let circleTops = [0, `${scaling*157.894737}px`];
let circleLefts = [0, `${scaling*184.210526}px`];
let circleScaling = [0.70, 0.6];
for (let i = 0; i < circles.length; i++) {
    let new_circle = document.createElement("img");
    new_circle.id = circles[i];
    new_circle.src = "panelsImg/panel3/" + circles[i] + ".png";
    new_circle.alt = "panelsImg/panel3/" + circles[i] + ".png";
    new_circle.onload = () => {
        new_circle.width *= scaling;
        new_circle.width *= circleScaling[i];
    }
    new_circle.style.left = circleLefts[i];
    new_circle.style.top = circleTops[i];
    circleContainer.appendChild(new_circle);
}
panel3.appendChild(circleContainer);

let p3PngNames = ["lockFill", "lockOutline", "outline", "atoms2", "atoms1", "atom2", "atom1"];
let p3Pngs = [];
loadPngs(document.getElementById("panel3"), "panelsImg/panel3/", p3PngNames, p3Pngs);
p3Pngs[3].style.mixBlendMode = "color-dodge";
p3Pngs[5].style.mixBlendMode = "color-dodge";

// 4
let panel4 = document.getElementById("panel4");
let p4PngNames = ["lasers", "bg1", "red", "active2", "active1"];
let p4Pngs = [];
loadPngs(panel4, "panelsImg/panel4/", p4PngNames, p4Pngs);
p4Pngs[1].style.mixBlendMode = "multiply";
p4Pngs[2].style.mixBlendMode = "hard-light";
p4Pngs[2].style.opacity = "0.9";
p4Pngs[2].style.zIndex = "20";
p4Pngs[4].style.opacity = "0";
p4Pngs[0].style.opacity = "0";

let circle = document.getElementById("circle");
let p4ANames = ["atom3", "atom2", "atom1"];
let p4As = [];
loadPngs(circle, "panelsImg/panel4/", p4ANames, p4As);
circle.style.left = `${scaling*831.578947}px`;
circle.style.top = `${scaling*1657.89474}px`;
circle.style.width = `${scaling*50/0.19}px`;
circle.style.height = `${scaling*50/0.19}px`
p4As.forEach((layer) =>
    layer.style.margin = "auto auto"
);

// 5
let p5Names = ["purple", "red_laser", "bed2", "bed1", "atom"];
let p5Pngs = [];
loadPngs(document.getElementById("panel5"), `panelsImg/panel5/`, p5Names, p5Pngs);
p5Pngs[1].style.clipPath = "polygon(0 0, 100% 0, 100% 0, 0 0)";

p5Pngs[1].style.zIndex = "50";
p5Pngs[4].style.left = `${scaling*1368.42105}px`;
p5Pngs[4].style.top = `${scaling*480/0.19}px`;

// p5Pngs[4].style.opacity = "0";
// p5Pngs[4].style.zIndex = "50";
let boundary = [
    [513, 400],
    [565, 436],
    [545, 487],
    [512, 502],
    [509, 537],
    [436, 573],
    [407, 556]
];
for (let i = 0; i < boundary.length; i++) {
    boundary[i][0] -= 497;
    boundary[i][1] -= 486;
}

// 6
let p6Names = ["passive", "active1", "active2", "shade"];
let p6Pngs = [];
loadPngs(document.getElementById("panel6"), `panelsImg/panel6/`, p6Names, p6Pngs);
let cameraCanOn = false;

// 8
let p8PngNames = ["circle2", "circle1", "circle1_border", "atoms2", "atoms1", "entangled"];
let p8Pngs = [];
loadPngs(document.getElementById("panel8"), "panelsImg/panel8/", p8PngNames, p8Pngs);
p8Pngs[1].style.mixBlendMode = "multiply";
p8Pngs[3].style.mixBlendMode = "color-dodge";
p8Pngs[0].style.transformOrigin = `${scaling*121.05}px ${scaling*2973.68421}px`;
p8Pngs[0].style.transform = "scale(0.5)";
p8Pngs[5].style.zIndex = 40;
p8Pngs[5].style.mixBlendMode = "lighten";



//laser
const reflectCanvas = document.getElementById("reflectCanvas");
const deflectCanvas = document.getElementById("deflectCanvas");

const reflectCtx = reflectCanvas.getContext("2d");
const deflectCtx = deflectCanvas.getContext("2d");

reflectCanvas.width = poster.clientWidth;
reflectCanvas.height = poster.clientHeight;
deflectCanvas.width = poster.clientWidth;
deflectCanvas.height = poster.clientHeight;


let red1Source = {
    x: scaling/0.19*178,
    y: scaling/0.19*88
};
//angle: 55
let mirror2 = {
    x: scaling/0.19*203,
    y: scaling/0.19*108,
    r: scaling/0.19*40,
    angle: 20,
    adjustX: scaling/0.19*0,
    adjustY: scaling/0.19*20
};

let deflector = {
    x1: scaling/0.19*280,
    y1: scaling/0.19*125,
    x2: scaling/0.19*180,
    y2: scaling/0.19*180
};

let inputReflectAngle = Math.atan2(mirror2.y - red1Source.y, mirror2.x - red1Source.x) * (180 / Math.PI) + 30;
let inputDeflectAngle = Math.atan2(mirror2.y - red1Source.y, mirror2.x - red1Source.x) * (180 / Math.PI);
let isDragging = false;

// Function to draw the laser beam
function drawLaser(ctx, x1, y1, x2, y2, color = "red", opacity = 0.8) {
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = scaling/0.19*3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawMirror() {
    reflectCtx.strokeStyle = "white";
    reflectCtx.lineWidth = scaling/0.19*7;

    let mirror2X2 = mirror2.x + (mirror2.r - scaling/0.19*20) * Math.cos(mirror2.angle * (Math.PI / 180));
    let mirror2Y2 = mirror2.y + (mirror2.r - scaling/0.19*20) * Math.sin(mirror2.angle * (Math.PI / 180));

    reflectCtx.beginPath();
    reflectCtx.moveTo(
        mirror2.x - (mirror2.r - scaling/0.19*20) * Math.cos(mirror2.angle * (Math.PI / 180)),
        mirror2.y - (mirror2.r - scaling/0.19*20) * Math.sin(mirror2.angle * (Math.PI / 180))
    );
    reflectCtx.lineTo(mirror2X2, mirror2Y2);
    reflectCtx.stroke();

}

// Function to draw the deflector as a line
function drawDeflector() {
    deflectCtx.strokeStyle = "blue";
    deflectCtx.lineWidth = 5;
    deflectCtx.beginPath();
    deflectCtx.moveTo(deflector.x1, deflector.y1);
    deflectCtx.lineTo(deflector.x2, deflector.y2);
    deflectCtx.stroke();
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


function reflectLaser(ctx, x1, y1, angle, l, color) {
    let incidentAngle = mirror2.angle;
    let reflectionAngle = 2 * incidentAngle - angle;

    let x2 = x1 + scaling/0.19*l * Math.cos(reflectionAngle * (Math.PI / 180));
    let y2 = y1 + scaling/0.19*l * Math.sin(reflectionAngle * (Math.PI / 180));

    drawLaser(ctx, mirror2.x, mirror2.y, x2, y2, color, 0.8);
    return {
        x: x2,
        y: y2,
        angle: reflectionAngle
    };
}

function deflectLaser(ctx, x, y, angle) {
    let r = scaling/0.19*130;
    let beams = [];
    for (let i = 14; i < 86; i += 5) {
        let b = {
            x: x + r * Math.cos((angle + i) * (Math.PI / 180)),
            y: y + r * Math.sin((angle + i) * (Math.PI / 180))
        };
        beams.push(b);
    }
    beams.forEach((beam) => drawLaser(ctx, x, y, beam.x, beam.y, "red", 0.4));
}

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

function update() {
    reflectCtx.clearRect(0, 0, reflectCanvas.width, reflectCanvas.height);
    deflectCtx.clearRect(0, 0, deflectCanvas.width, deflectCanvas.height);
    // drawMirror(reflectCtx);
    // drawDeflector(reflectCtx);
    drawLaser(reflectCtx, red1Source.x, red1Source.y, mirror2.x, mirror2.y, "red", 0.5);
    let reflected2 = reflectLaser(reflectCtx, mirror2.x + 3, mirror2.y + 3, inputReflectAngle + 1 + 25, 250, "red");
    let reflected = reflectLaser(reflectCtx, mirror2.x, mirror2.y, inputReflectAngle + 25, 250, "blue");

    // **在 deflectCanvas 上绘制**
    let reflected1 = reflectLaser(deflectCtx, mirror2.x, mirror2.y, inputDeflectAngle, 70, "red");

    // Check if the reflected laser intersects the deflector
    let intersection = getIntersection(mirror2.x, mirror2.y, reflected1.x, reflected1.y, deflector.x1, deflector.y1, deflector.x2, deflector.y2);

    if (intersection) {
        deflectLaser(deflectCtx, intersection.x, intersection.y, reflected.angle);
    }
}

let initialAngle = 0;


// button1 - shoot laser
let button = document.createElement("div");
poster.appendChild(button);
button.classList = "fakeButton";
button.style.left = `${scaling*680}px`;
button.style.top = `${scaling*263.157895}px`;
button.style.width = `${scaling*50/0.19}px`;
button.style.height = `${scaling*50/0.19}px`;
let laserOn = false;
let cameraInterval1 = null;

button.addEventListener("click", () => {
    if (cameraInterval1) return; // Prevent multiple intervals
    uPanels[0].style.opacity = 0;
    // zindex of atom +++++
    p3Pngs[5].style.zIndex = 41;
    p3Pngs[6].style.zIndex = 41;
    p2Pngs[1].style.zIndex = 141;
    laserOn = true;

    let active = false;

    if (!p1Pngs[1] || !p1Pngs[2]) return; // Ensure required elements exist

    toggleVisibility(p1Pngs[3], false); // Hide passive button
    toggleVisibility(p1Pngs[4], true); // Show active button

    cameraInterval1 = setInterval(() => {
        active = !active;
        toggleVisibility(p1Pngs[1], active);
        toggleVisibility(p1Pngs[2], !active);
    }, 250);
    update();
});



//4
let motIsOn = false;

// MOVING ATOM IN MOT
let circleX = 0;
let circleY = 0;
let centerX = 0;
let centerY = 0;
let speedX = 5;
let speedY = -5;
let damping = 0.99;

function moveCircle(r) {
    let aX = (centerX - circleX) / (140*scaling/0.19);
    speedX += aX;
    // speedX *= damping;
    circleX += speedX;

    let aY = (centerY - circleY) / (110*scaling/0.19);
    speedY += aY;
    // speedY *= damping;
    circleY += speedY;
    if (r > 100) {
        if (circleX >= centerX + r || circleX <= centerX - r) {
            speedX = -speedX * damping;
        }

        if (circleY >= centerY + r || circleY <= centerY - r) {
            speedY = -speedY * damping;
        }
        circle.style.transition = "transform 0.8s linear"; // Smooth movement
        circle.style.transform = `translate(${circleX}px, ${circleY}px)`;
    } else {
        circle.style.transition = "transform 1s linear";
        circle.style.transform = `translate(${0}px, ${0}px)`;
    }
}

// Unified Animation Loop
const rafTasks = new Set();
let rafId = null;
let animating = false;
let rotateCirclesRunning = false;
let laserPulseRunning = false;
let tweezerMoveRunning = false;
let lockSequenceStarted = false;

function startRafLoop() {
    if (rafId) return;
    const tick = (time) => {
        rafTasks.forEach((task) => task(time));
        rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
}

function addRafTask(task) {
    rafTasks.add(task);
    startRafLoop();
}

function removeRafTask(task) {
    rafTasks.delete(task);
    if (rafTasks.size === 0 && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
    }
}

function startAfterFrame(task) {
    requestAnimationFrame(() => requestAnimationFrame(task));
}

function animateCircle() {
    if (!animating) return;
    moveCircle(motIsOn ? 5 : 105);
}

function startCircleAnimation() {
    if (animating) return;
    animating = true;
    addRafTask(animateCircle);
}

function stopCircleAnimation() {
    animating = false;
    removeRafTask(animateCircle);
}
// Start animation once after a delay
setTimeout(startCircleAnimation, 500);


let angle4 = 0;

function rotateCircle() {
    angle4 += 0.3; // Adjust speed (degrees per frame)

    // atom
    p4As[2].style.transform = `rotate(${angle4}deg)`;
    p4As[1].style.transform = `rotate(${angle4}deg)`;

    // 底色
    p4As[0].style.transform = `rotate(${angle4}deg)`;
}

addRafTask(rotateCircle); // Start the animation


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
}

function startRotateCircles() {
    if (rotateCirclesRunning) return;
    rotateCirclesRunning = true;
    addRafTask(rotateCircles);
}

function stopRotateCircles() {
    if (!rotateCirclesRunning) return;
    rotateCirclesRunning = false;
    removeRafTask(rotateCircles);
}



// lock animation
let atomDX = -23*scaling/0.19;
let atomDY = -26*scaling/0.19;
let locked = false;

if (locked == false) {
    p8Pngs[5].style.opacity = "0";
}


let cameraInterval2 = "null";

// prism


let triangle = document.getElementById("triangleContainer");
triangle.style.left = `${scaling*176/0.19}px`;
triangle.style.top = `${scaling*76/0.19}px`;
triangle.style.width = `${scaling*60/0.19}px`;
triangle.style.height = `${scaling*60/0.19}px`;

let prism = document.getElementById("prism");
prism.width*= scaling;
prism.style.zIndex = 10000000;
prism.style.left = `${scaling*17/0.19}px`;
prism.style.top = `${scaling*17/0.19}px`;

let triangleShape = document.getElementById("triangle");
triangleShape.style.width = `${scaling*24/0.19}px`;
triangleShape.style.height = `${scaling*25/0.19}px`;
triangleShape.style.opacity = 0;


// Drag-to-Rotate functionality for both mouse and touch
triangle.addEventListener("mousedown", handleTriangleMouseDown);
triangle.addEventListener("mousemove", handleTriangleMouseMove);
triangle.addEventListener("mouseup", handleTriangleMouseUp);
triangle.addEventListener("touchstart", handleTriangleTouchStart, { passive: false });
triangle.addEventListener("touchmove", handleTriangleTouchMove, { passive: false });
triangle.addEventListener("touchend", handleTriangleTouchEnd);

let triangleDragListenersActive = false;

function addTriangleDragListeners() {
    if (triangleDragListenersActive) return;
    triangleDragListenersActive = true;
    window.addEventListener("mousemove", handleTriangleMouseMove);
    window.addEventListener("mouseup", handleTriangleMouseUp);
    window.addEventListener("touchmove", handleTriangleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTriangleTouchEnd);
    window.addEventListener("touchcancel", handleTriangleTouchEnd);
}

function removeTriangleDragListeners() {
    if (!triangleDragListenersActive) return;
    triangleDragListenersActive = false;
    window.removeEventListener("mousemove", handleTriangleMouseMove);
    window.removeEventListener("mouseup", handleTriangleMouseUp);
    window.removeEventListener("touchmove", handleTriangleTouchMove);
    window.removeEventListener("touchend", handleTriangleTouchEnd);
    window.removeEventListener("touchcancel", handleTriangleTouchEnd);
}

function handleTriangleMouseDown(e) {
    if (laserOn) {
        startDragging(e.clientX, e.clientY);
        addTriangleDragListeners();
        e.preventDefault();
    }
}

function handleTriangleMouseMove(event) {
    if (isDragging) {
        updateRotation(event.clientX, event.clientY);
    }
}

function handleTriangleMouseUp() {
    endDragging();
}

function handleTriangleTouchStart(event) {
    if (laserOn) {
        event.preventDefault(); // Prevent scrolling
        const touch = event.touches[0];
        startDragging(touch.clientX, touch.clientY);
        addTriangleDragListeners();
    }
}

function handleTriangleTouchMove(event) {
    if (isDragging) {
        event.preventDefault();
        const touch = event.touches[0];
        updateRotation(touch.clientX, touch.clientY);
    }
}

function handleTriangleTouchEnd() {
    endDragging();
}


function startDragging(clientX, clientY) {
    let dx = clientX - mirror2.x + mirror2.adjustX - anchor.left;
    let dy = clientY - mirror2.y + mirror2.adjustY;

    isDragging = true;
    initialAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    // if (Math.sqrt(dx * dx + dy * dy) < 80) {
    // }
}

function updateRotation(startX, startY) {
    let dx = startX - mirror2.x + mirror2.adjustX - anchor.left;
    let dy = startY - mirror2.y + mirror2.adjustY;
    let currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    mirror2.angle = currentAngle;
    triangle.style.transform = `rotate(${currentAngle}deg)`;
    update();
    initialAngle = currentAngle;
}

function endDragging() {
    isDragging = false;
    removeTriangleDragListeners();

    if (mirror2.angle > 52 && mirror2.angle < 57) {
        if (lockSequenceStarted) return;
        lockSequenceStarted = true;
        uPanels[1].style.opacity = "0";
        uPanels[2].style.opacity = "0";
        uPanels[3].style.opacity = "0";
        uPanels[7].style.opacity = "0";
        uPanels[8].style.opacity = "0";

        if (locked) return; // Exit if already locked


        setTimeout(() => {
            applyTransform(p3Pngs[5], atomDX, atomDY, 3);
            applyTransform(p3Pngs[6], atomDX, atomDY, 3);
            applyScale(p8Pngs[0], 1, 4);
            startAfterFrame(startRotateCircles);
        }, 500);

        setTimeout(() => {
            locked = true;
            startFlashing(p4Pngs[3], p4Pngs[4], 280);
        }, 2000);

        setTimeout(() => {
            applyTranslateY(p3Pngs[0], 10*scaling/0.19, 1.5);
            applyTranslateY(p3Pngs[1], 10*scaling/0.19, 1.5);
        }, 3500);

        setTimeout(() => {
            fadeIn(p8Pngs[5], 0.8);

        
            flashingLaser.style.opacity = 1;
            flashingLaser.style.pointerEvents = "auto";
            startAfterFrame(startLaserPulse);
     
            p5Pngs[4].style.opacity = "1";
            startAfterFrame(startTweezerMove);
            p5Pngs[4].style.zIndex = "50";

            // reset 1
            clearInterval(cameraInterval1);
            p1Pngs[1].style.opacity = "0";
            p1Pngs[2].style.opacity = "0";
        }, 4500);

        setTimeout(() => {
            reflectCanvas.style.opacity = "0";
            deflectCanvas.style.opacity = "0";
            
        }, 7000);
    }
}

// purple flashing laser
let flashingLaser = document.getElementById("flashingLaser");
flashingLaser.style.left = `${scaling*396/0.19}px`;
flashingLaser.style.top = `${scaling*248/0.19}px`;
flashingLaser.style.width = `${scaling*15/0.19}px`;
flashingLaser.style.height = `${scaling*15/0.19}px`;
flashingLaser.style.borderRadius = `${scaling*7.5/0.19}px`;

let flashingLaserScale = 1;
let flashingLaserOpacity = 0;
let flashingLaserGrowing = true; // 控制大小变化

let flashingIsDragging = false;
let flashingStartX = 0;
let flashingDragStartX = 0;
let flashingStartY = 0;
let flashingDragStartY = 0;

function warmUpAnimationTargets() {
    const targets = [
        flashingLaser,
        circle,
        reflectCanvas,
        deflectCanvas,
        triangle,
        p5Pngs[1],
        p5Pngs[4],
        p8Pngs[0],
        p8Pngs[5],
        uPanelWrappers[4],
        uPanelWrappers[6],
        ...p4As
    ];

    targets.forEach((el) => {
        if (!el) return;
        if (!el.style.willChange) {
            el.style.willChange = "transform, opacity, clip-path";
        }
        // Force style calculation once to reduce first-frame spikes.
        el.getBoundingClientRect();
        if (el.tagName === "IMG" && el.decode) {
            el.decode().catch(() => {});
        }
    });
}

window.addEventListener("load", warmUpAnimationTargets);

function animateLaser() {
    if (flashingLaserGrowing) {
        flashingLaserScale += 0.015;
        flashingLaserOpacity += 0.05;
        if (flashingLaserScale >= 1.4) flashingLaserGrowing = false; // 达到最大尺寸后缩小
    } else {
        flashingLaserScale -= 0.025;
        flashingLaserOpacity -= 0.07;
        if (flashingLaserScale <= 1) flashingLaserGrowing = true; // 达到最小尺寸后放大
    }

    flashingLaser.style.transform = `scale(${flashingLaserScale})`;
    flashingLaser.style.opacity = flashingLaserOpacity;
}

function startLaserPulse() {
    if (laserPulseRunning) return;
    laserPulseRunning = true;
    addRafTask(animateLaser);
}

function stopLaserPulse() {
    if (!laserPulseRunning) return;
    laserPulseRunning = false;
    removeRafTask(animateLaser);
}

// 鼠标按下事件，开始拖动
flashingLaser.addEventListener("mousedown", startDragFlash);
flashingLaser.addEventListener("touchstart", startDragFlash, { passive: false });

flashingLaser.addEventListener("mousemove", dragFlash);
flashingLaser.addEventListener("touchmove", dragFlash, { passive: false });

flashingLaser.addEventListener("mouseup", stopDragFlash);
flashingLaser.addEventListener("touchend", stopDragFlash);

let flashDragListenersActive = false;

function addFlashDragListeners() {
    if (flashDragListenersActive) return;
    flashDragListenersActive = true;
    window.addEventListener("mousemove", dragFlash);
    window.addEventListener("mouseup", stopDragFlash);
    window.addEventListener("touchmove", dragFlash, { passive: false });
    window.addEventListener("touchend", stopDragFlash);
    window.addEventListener("touchcancel", stopDragFlash);
}

function removeFlashDragListeners() {
    if (!flashDragListenersActive) return;
    flashDragListenersActive = false;
    window.removeEventListener("mousemove", dragFlash);
    window.removeEventListener("mouseup", stopDragFlash);
    window.removeEventListener("touchmove", dragFlash);
    window.removeEventListener("touchend", stopDragFlash);
    window.removeEventListener("touchcancel", stopDragFlash);
}

function startDragFlash(e){
    e.preventDefault(); // 防止默认行为，如滚动
    flashingIsDragging = true;
    addFlashDragListeners();

    let event = e.touches ? e.touches[0] : e; // 处理触摸事件
    flashingStartX = event.clientX;
    flashingStartY = event.clientY;
    flashingDragStartX = flashingLaser.offsetLeft;
    flashingDragStartY = flashingLaser.offsetTop;
}

function dragFlash(e){
    if (!flashingIsDragging) return;
    e.preventDefault();

    let event = e.touches ? e.touches[0] : e; // 处理触摸事件
    let deltaX = event.clientX - flashingStartX;
    let deltaY = event.clientY - flashingStartY;

    let newPositionX = flashingDragStartX + deltaX;
    let newPositionY = flashingDragStartY + deltaY;

    flashingLaser.style.left = `${newPositionX}px`;
    flashingLaser.style.top = `${newPositionY}px`;

    let top = p5Pngs[1].offsetTop;
    let bottom = top + p5Pngs[1].offsetHeight;

    let showPurple = Math.max(0, Math.min(100, ((event.clientY - top) / (bottom - top)) * 100));
    let lowClip = showPurple-10;
    let highClip = showPurple+10
    p5Pngs[1].style.clipPath = `polygon(${-40+showPurple}% 0, ${90-showPurple/8}% 0, 85% ${highClip}%, 45% ${lowClip}%)`;
}

function stopDragFlash(e){
    if (!flashingIsDragging) return;
    flashingIsDragging = false;
    removeFlashDragListeners();

    let left = flashingLaser.offsetLeft;
    let top = flashingLaser.offsetTop;

    if (left < scaling / 0.19 * 320 && top > scaling / 0.19 * 437) {
        turnOnTweezer();
    }
}


function turnOnTweezer() {
    const panel4Mask = uPanelWrappers[4];
    if (panel4Mask && panel4Mask.dataset.fullHeight) {
        panel4Mask.style.height = `${panel4Mask.dataset.fullHeight}px`;
        panel4Mask.style.transition = "height 2s linear";
    }
    motIsOn = true;
    setTimeout(() => {
        if (panel4Mask) {
            panel4Mask.style.height = "0px";
        }
        fadeIn(p4Pngs[0], 0.8);
        clearInterval(cameraInterval2);
    }, 100);
    //     p5Pngs[1].style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"; // 让图片完全显示
    setTimeout(() => {


        flashingLaser.style.opacity = 0;
        stopLaserPulse();
        // p5Pngs[4].style.transform = (`translate(${0}px, ${0}px)`);

        stopTweezerMove();

        cameraCanOn = true;
    }, 1600);
}

// 6 camera
let cameraStage = "off";
let cameraInterval = null;
let finishGame = false;

function checkCamera() {
    if (cameraStage == "off") {
        p6Pngs[0].style.display = "block";
        p6Pngs[1].style.display = "none";
        p6Pngs[2].style.display = "none";
        if (!finishGame) {
            uPanels[5].style.opacity = 0.6;
        }
        if (cameraInterval) {
            clearInterval(cameraInterval);
            cameraInterval = null; // 避免多次 clear
        }

    } else {
        uPanels[5].style.opacity = 0;
        let activeIndex = 0; // 控制切换
        let intervalTime = 280; // 交替时间（毫秒）

        if (cameraInterval) {
            clearInterval(cameraInterval);
        }
        cameraInterval = setInterval(() => {
            if (p6Pngs[1] && p6Pngs[2]) {
                p6Pngs[0].style.display = "none";
                if (activeIndex === 0) {
                    p6Pngs[1].style.display = "none";
                    p6Pngs[2].style.display = "block";
                } else {
                    p6Pngs[1].style.display = "block";
                    p6Pngs[2].style.display = "none";

                }
                activeIndex = 1 - activeIndex; // 在 0 和 1 之间切换
            }
        }, intervalTime);
    }
}
checkCamera();

// click to turn on camera
p6Pngs[3].style.display = "block";
let camera = document.createElement("div");
// camera.style.border = "1px solid black";
camera.style.position = "absolute";
camera.style.width = `${scaling*842.105263}px`;
camera.style.height = `${scaling*526.315789}px`;
camera.style.left = `${scaling*1578.94737}px`;
camera.style.top = `${scaling*1473.68421}px`;
camera.style.zIndex = 100;
poster.appendChild(camera);


let cameraHoldStart = 0;
let titleProgress = 0;
let titleAnimating = false;
const holdDuration = 7000; // 2秒完全消失

function animatePanel() {
    if (!titleAnimating) return;
    const elapsed = Date.now() - cameraHoldStart;
    titleProgress = Math.min(elapsed / holdDuration, 1);

    // 计算剪切蒙版位置，从100%逐渐减少到0%
    const panel6Mask = uPanelWrappers[6];
    if (panel6Mask && panel6Mask.dataset.fullHeight) {
        const fullHeight = Number(panel6Mask.dataset.fullHeight);
        panel6Mask.style.height = `${fullHeight * (1 - titleProgress)}px`;
    }

    if (titleProgress >= 0.4) {
        finishGame = true;
        stopTitleAnimation();
    }
}

function startTitleAnimation() {
    if (titleAnimating) return;
    titleAnimating = true;
    addRafTask(animatePanel);
}

function stopTitleAnimation() {
    if (!titleAnimating) return;
    titleAnimating = false;
    removeRafTask(animatePanel);
}

camera.addEventListener("mousedown", function () {
    if (cameraCanOn && cameraStage !== "on") {
        cameraStage = "on";
        checkCamera();
        cameraHoldStart = Date.now();
        startAfterFrame(startTitleAnimation);
    }
});

camera.addEventListener("mouseup", function () {
    if (cameraStage === "on") {
        cameraStage = "off";
        checkCamera();
        stopTitleAnimation();
        if (!finishGame) {
            const panel6Mask = uPanelWrappers[6];
            if (panel6Mask && panel6Mask.dataset.fullHeight) {
                panel6Mask.style.height = `${panel6Mask.dataset.fullHeight}px`;
            }
        }

    }
});


// 兼容移动端，检测触摸事件
camera.addEventListener("touchstart", function (event) {
    event.preventDefault(); // 防止触摸事件干扰点击
    if (cameraCanOn && cameraStage !== "on") {
        cameraStage = "on";
        checkCamera();
        cameraHoldStart = Date.now();
        startAfterFrame(startTitleAnimation);
    }
});

camera.addEventListener("touchend", function () {
    if (cameraStage === "on") {
        cameraStage = "off";
        checkCamera();
        stopTitleAnimation();
        if (!finishGame) {
            const panel6Mask = uPanelWrappers[6];
            if (panel6Mask && panel6Mask.dataset.fullHeight) {
                panel6Mask.style.height = `${panel6Mask.dataset.fullHeight}px`;
            }
        }
    }
});


// 5 atom move function    
let circleTX = 0;
let circleTY = 0;
let centerTX = 0;
let centerTY = 0;
let speedTX = 2;
let speedTY = -3;

function tweezerAtomMove() {
    let aX = (centerTX - circleTX) / 240;
    speedTX += aX;
    circleTX += speedTX;

    let aY = (centerTY - circleTY) / 210;
    speedTY += aY;
    circleTY += speedTY;
    let ran = 0.5 * Math.random() - 1;
    let ranX = 0.8 * Math.random() - 1.1;
    let disU1 = pointToLineDistance(boundary[6][0], boundary[6][1], boundary[0][0], boundary[0][1], circleTX, circleTY);
    let disU2 = pointToLineDistance(boundary[1][0], boundary[1][1], boundary[0][0], boundary[0][1], circleTX, circleTY);

    let disBoundary = 15;

    // let boundary = [
    //     [513, 400],
    //     [565, 436],
    //     [545, 487],
    //     [512, 502],
    //     [509, 537],
    //     [436, 573],
    //     [407, 556]
    // ];


    if (speedTY > 0) {
        if (circleTY > boundary[5][1]) {
            speedTY = -3;
        }
        for (let i = boundary.length - 1; i > 1; i--) {
            let y1;
            let y2;
            if (boundary[i][1] > boundary[i - 1][1]) {
                y2 = boundary[i][1];
                y1 = boundary[i - 1][0];
            } else {
                y1 = boundary[i][1];
                y2 = boundary[i - 1][0];
            }
            let x1 = boundary[i][0];
            let x2 = boundary[i - 1][0];

            if (circleTX >= x1 && circleTX < x2 && circleTY >= y1 && circleTY <= y2) {
                let dis = pointToLineDistance(boundary[i][0], boundary[i][1], boundary[i - 1][0], boundary[i - 1][1], circleTX, circleTY);
                if (dis <= disBoundary) {
                    speedTY = ran * speedTY * damping;
                }
            }
        }
    } else {
        if (circleTY < boundary[0][1]) {
            speedTY = 3;
        }

        if (disU1 <= disBoundary) {
            speedTY = ran * speedTY * damping;
        }

        if (disU2 <= disBoundary) {
            speedTY = ran * speedTY * damping;
        }
    }

    if (speedTX > 0) {
        if (circleTX > boundary[1][0]) {
            speedTX = -3;
        }
    } else {
        if (circleTX < boundary[6][0]) {
            speedTX = 3;
        }

    }
    p5Pngs[4].style.transform = `rotate(${angle4}deg)`;
    p5Pngs[4].style.transform = (`translate(${circleTX}px, ${circleTY}px)`);
}

function startTweezerMove() {
    if (tweezerMoveRunning) return;
    tweezerMoveRunning = true;
    addRafTask(tweezerAtomMove);
}

function stopTweezerMove() {
    if (!tweezerMoveRunning) return;
    tweezerMoveRunning = false;
    removeRafTask(tweezerAtomMove);
}

function pointToLineDistance(x1, y1, x2, y2, circleTX, circleTY) {
    let A = y1 - y2;
    let B = x2 - x1;
    let C = (x1) * (y2) - (x2) * (y1);

    let distance = Math.abs(A * circleTX + B * circleTY + C) / Math.sqrt(A * A + B * B);
    return distance;
}


/** Helper function for setting element visibility **/
function toggleVisibility(element, isVisible) {
    if (element) element.style.opacity = isVisible ? "1" : "0";
}

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
