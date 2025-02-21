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
p2Pngs[0].style.zIndex = 41;
p2Pngs[1].style.zIndex = 42;

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
    new_circle.onload = () => {
        new_circle.width *= scaling;
        new_circle.width *= circleScaling[i];
    }
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
p4Pngs[1].style.mixBlendMode = "multiply";
p4Pngs[2].style.opacity = "0.6";
p4Pngs[4].style.opacity = "0";
p4Pngs[0].style.opacity = "0";

let circle = document.getElementById("circle");
let p4ANames = ["atom3", "atom2", "atom1"];
let p4As = [];
loadPngs(circle, "panelsImg/panel4/", p4ANames, p4As);
circle.style.left = "158px";
circle.style.top = "315px";
p4As.forEach((layer) =>
    layer.style.margin = "auto auto"
);

// 5
let p5Names = ["purple", "laser", "bed2", "bed1", "atom"];
let p5Pngs = [];
loadPngs(document.getElementById("panel5"), `panelsImg/panel5/`, p5Names, p5Pngs);
p5Pngs[1].style.clipPath = "polygon(0 0, 100% 0, 100% 0, 0 0)";
p5Pngs[1].style.transition = "clip-path 2s linear";
p5Pngs[1].style.zIndex = "50";
p5Pngs[4].style.left = "260px";
p5Pngs[4].style.top = "480px";
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

// 8
let p8PngNames = ["circle1", "circle1_border", "circle2", "atoms2", "atoms1", "entangled"];
let p8Pngs = [];
loadPngs(document.getElementById("panel8"), "panelsImg/panel8/", p8PngNames, p8Pngs);
p8Pngs[0].style.mixBlendMode = "multiply";
p8Pngs[2].style.transformOrigin = "23px 565px";
p8Pngs[2].style.transform = "scale(0.5)";
p8Pngs[5].style.zIndex = 40;



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
function drawLaser(ctx, x1, y1, x2, y2, color = "red", opacity = 0.8) {
    ctx.globalAlpha = opacity;
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawMirror() {
    reflectCtx.strokeStyle = "white";
    reflectCtx.lineWidth = 7;

    let mirror2X2 = mirror2.x + (mirror2.r - 20) * Math.cos(mirror2.angle * (Math.PI / 180));
    let mirror2Y2 = mirror2.y + (mirror2.r - 20) * Math.sin(mirror2.angle * (Math.PI / 180));

    reflectCtx.beginPath();
    reflectCtx.moveTo(
        mirror2.x - (mirror2.r - 20) * Math.cos(mirror2.angle * (Math.PI / 180)),
        mirror2.y - (mirror2.r - 20) * Math.sin(mirror2.angle * (Math.PI / 180))
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

    let x2 = x1 + l * Math.cos(reflectionAngle * (Math.PI / 180));
    let y2 = y1 + l * Math.sin(reflectionAngle * (Math.PI / 180));

    drawLaser(ctx, mirror2.x, mirror2.y, x2, y2, color, 0.8);
    return {
        x: x2,
        y: y2,
        angle: reflectionAngle
    };
}

function deflectLaser(ctx, x, y, angle) {
    let r = 130;
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
let mouseIsDown = false;


// button1 - shoot laser
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
    let aX = (centerX - circleX) / 140;
    speedX += aX;
    // speedX *= damping;
    circleX += speedX;

    let aY = (centerY - circleY) / 110;
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

// Efficient Animation Loop
let animating = false;

function animateCircle() {
    if (!animating) return;
    moveCircle(motIsOn ? 5 : 105);
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

    // atom
    p4As[2].style.transform = `rotate(${angle4}deg)`;
    p4As[1].style.transform = `rotate(${angle4}deg)`;

    // 底色
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

let flashingLaser = document.getElementById("flashingLaser");

let flashingLaserScale = 1;
let flashingLaserOpacity = 0;
let flashingLaserGrowing = true; // 控制大小变化
let flashingLaserAnimaId = null;

function animateLaser() {
    if (flashingLaserGrowing) {
        flashingLaserScale += 0.025;
        flashingLaserOpacity += 0.05;
        if (flashingLaserScale >= 1.5) flashingLaserGrowing = false; // 达到最大尺寸后缩小
    } else {
        flashingLaserScale -= 0.025;
        flashingLaserOpacity -= 0.05;
        if (flashingLaserScale <= 1) flashingLaserGrowing = true; // 达到最小尺寸后放大
    }

    flashingLaser.style.transform = `scale(${flashingLaserScale})`;
    flashingLaser.style.opacity = flashingLaserOpacity;

    flashingLaserAnimaId = requestAnimationFrame(animateLaser); // 递归调用
}

let cameraInterval2 = "null";
let triangle = document.getElementById("triangleContainer");

// Drag-to-Rotate functionality
triangle.addEventListener("mousedown", (event) => {
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

triangle.addEventListener("mousemove", (event) => {
    if (isDragging) {
        let dx = event.clientX - mirror2.x + mirror2.adjustX - anchor.left;
        let dy = event.clientY - mirror2.y + mirror2.adjustY;
        let currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        mirror2.angle = currentAngle;
        triangle.style.transform = `rotate(${currentAngle}deg)`;
        update();
        initialAngle = currentAngle;
    }
});

triangle.addEventListener("mouseup", () => {
    isDragging = false;
    mouseIsDown = false;
    if (mirror2.angle > 52 && mirror2.angle < 57) {
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
            locked = true;
            startFlashing(p4Pngs[3], p4Pngs[4], 1000);
        }, 2000);

        setTimeout(() => {
            applyTranslateY(p3Pngs[0], 10, 1.5);
            applyTranslateY(p3Pngs[1], 10, 1.5);
        }, 3500);

        setTimeout(() => {
            fadeIn(p8Pngs[5], 0.8);
            fadeIn(p4Pngs[0], 0.8);
            console.log("locked");
            motIsOn = true;
            console.log("slowing");
            flashingLaser.style.opacity = 1;
            flashingLaser.style.pointerEvents = "auto";
            animateLaser();
            p5Pngs[4].style.opacity = "1";
            tweezerAtomMove();
        }, 4500);
    }
});

flashingLaser.addEventListener("click", () => {
    console.log("tweezerOn!");
    p5Pngs[1].style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)"; // 让图片完全显示
    setTimeout(() => {
        uPanels[4].style.opacity = 0;

        flashingLaser.style.opacity = 0;
        cancelAnimationFrame(flashingLaserAnimaId);
        flashingLaserAnimaId = null;

        cancelAnimationFrame(tweezerAtomMoveAnimaId);
        tweezerAtomMoveAnimaId = null;
    }, 1500);
});

// 6 camera
let cameraStage = "off";
let cameraInterval = null;

function checkCamera() {
    if (cameraStage == "off") {
        p6Pngs[0].style.display = "block";
        p6Pngs[1].style.display = "none";
        p6Pngs[2].style.display = "none";
        if (cameraInterval) {
            clearInterval(cameraInterval);
            cameraInterval = null; // 避免多次 clear
        }

    } else {

        let activeIndex = 0; // 控制切换
        let intervalTime = 280; // 交替时间（毫秒）

        if (cameraInterval) {
            clearInterval(cameraInterval);
        }
        cameraInterval = setInterval(() => {
            if (p6Pngs[1] && p6Pngs[2]) {
                p6Pngs[0].style.display = "none";
                if (activeIndex === 0) {
                    p6Pngs[1].style.display = "block";
                    p6Pngs[2].style.display = "none";
                } else {
                    p6Pngs[1].style.display = "none";
                    p6Pngs[2].style.display = "block";
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
camera.style.width = "80px";
camera.style.height = "80px";
camera.style.left = "300px";
camera.style.top = "280px";
camera.style.zIndex = 100;
poster.appendChild(camera);


camera.addEventListener("click", function () {
    if (cameraStage !== "on") { // 避免重复触发
        cameraStage = "on";
        checkCamera();

        setTimeout(() => {
            cameraStage = "off";
            checkCamera();
        }, 5000); // 5秒后切换回 "off"
    }
})

// 5 atom move function    
let circleTX = 0;
let circleTY = 0;
let centerTX = 0;
let centerTY = 0;
let speedTX = 3;
let speedTY = -3;

let tweezerAtomMoveAnimaId = null;

function tweezerAtomMove() {
    let aX = (centerTX - circleTX) / 140;
    speedTX += aX;
    circleTX += speedTX;

    let aY = (centerTY - circleTY) / 110;
    speedTY += aY;
    circleTY += speedTY;
    let ran = 0.5 * Math.random() - 1;
    let ranX = 0.8 * Math.random() - 1.1;
    let disU1 = pointToLineDistance(boundary[6][0], boundary[6][1], boundary[0][0], boundary[0][1], circleTX, circleTY);
    let disU2 = pointToLineDistance(boundary[1][0], boundary[1][1], boundary[0][0], boundary[0][1], circleTX, circleTY);

    let disBoundary = 10;

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
            console.log(circleTY);
        }
        for (let i = boundary.length - 1; i > 2; i--) {
            if (circleTX >= boundary[i][0] && circleTX < boundary[i - 1][0] && circleTY >= boundary[i][1] && circleTY <= boundary[i - 1][1]) {
                let dis = pointToLineDistance(boundary[i][0], boundary[i][1], boundary[i - 1][0], boundary[i - 1][1], circleTX, circleTY);
                if (dis <= disBoundary) {
                    speedTY = ran * speedTY * damping;
                    speedTX = ranX * speedTX * damping;
                }
            }
        }
    } else {
        if (circleTY < boundary[0][1]) {
            speedTY = 3;
        }

        if (disU1 <= disBoundary) {
            speedTY = ran * speedTY * damping;
            speedTX = ranX * speedTX * damping;
        }

        if (disU2 <= disBoundary) {
            speedTY = ran * speedTY * damping;
            speedTX = ranX * speedTX * damping;
        }
    }

    if (speedTX > 0) {
        if (circleTX > boundary[1][0]) {
            speedTX = -3;
            // console.log("Jump1");
            // console.log(circleTX);
        }
    } else {
        if (circleTX < boundary[6][0]) {
            speedTX = 3;
        }

    }
    p5Pngs[4].style.transform = `rotate(${angle4}deg)`;
    p5Pngs[4].style.transform = (`translate(${circleTX}px, ${circleTY}px)`);
    // console.log(circleTX);
    // console.log(speedTX);
    tweezerAtomMoveAnimaId = requestAnimationFrame(tweezerAtomMove);
}
tweezerAtomMove();

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