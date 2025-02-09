import {
    scaling
} from './main.js';
import {
    loadPngs
} from './main.js';

let hitted = localStorage.getItem("hitted");



//4
let motIsOn = false;

let panel4 = document.getElementById("panel4");
let p4PngNames = ["lasers", "bg2", "bg1", "red", "active2", "active1"];
let p4Pngs = [];
loadPngs(panel4, "panelsImg/panel4/", p4PngNames, p4Pngs);
p4Pngs[5].style.opacity = "0";

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
    // x = (0.5 - Math.random()) * x*0.3;
    // y = (0.5 - Math.random()) * y*0.3;
    circle.style.transition = "transform 2.8s linear"; // Smooth movement
    circle.style.left= "0";
    circle.style.top= "0";
}



if (motIsOn == false) {
    setTimeout(() => {
        setInterval(moveCircle, 400);
    }, 500);
}


let angle4 = 0;

function rotateCircle() {
    angle4 += 0.3; // Adjust speed (degrees per frame)

    let circleRect = circle.getBoundingClientRect();
    let circleCenterX = circleRect.left + 163;
    let circleCenterY = circleRect.top + 322;

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

let cameraInterval  = "null";

let button2 = document.createElement("div");
document.body.appendChild(button2);
button2.classList = "fakeButton";
button2.style.left = "240px";
button2.style.top = "70px";
button2.addEventListener("click", () => {
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
        setTimeout(() => {
            p8Pngs[4].style.transition = "transform 4s ease-in-out";
            p8Pngs[4].style.transform = "scale(1)";
        }, 2000);
        setTimeout(() => {
            // if (locked === true) {
                p8Pngs[7].style.transition = "opacity 0.8s ease-in-out";
                p8Pngs[7].style.opacity = "1";
                console.log("locked");
                motIsOn = true;
                setTimeout(() => {
                    setInterval(slowCircle, 400);
                    console.log("slowing");
                }, 600);
            // }
        }, 5500);
        // 45轮流

        let activeIndex = 0; // 控制切换
    let intervalTime = 800; // 交替时间（毫秒）

    if (cameraInterval) {
        clearInterval(cameraInterval);
    }
    cameraInterval = setInterval(() => {
        if (p4Pngs[4] && p4Pngs[5]) {
            if (activeIndex === 0) {
                p4Pngs[4].style.opacity = "1";
                p4Pngs[5].style.opacity = "0";
            } else {
                p4Pngs[4].style.opacity = "0";
                p4Pngs[5].style.opacity = "1";
            }
            activeIndex = 1 - activeIndex; // 在 0 和 1 之间切换
        }
    }, intervalTime);

    }
})





//5

let p5Names = ["arm4", "arm3", "arm2", "arm1", "purple","laser", "bed2", "bed1"];
let p5Pngs = [];
loadPngs(document.getElementById("panel5"), `panelsImg/panel5/`, p5Names, p5Pngs);
p5Pngs[3].style.mixBlendMode = "multiply";