// panel3
let panel3 = document.getElementById(`panel3`);

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

function rotateCircles() {
    angle += 0.4; // Adjust speed (degrees per frame)

    document.getElementById("bigger_circle").style.transform = `rotate(${angle}deg)`;
    document.getElementById("smaller_circle").style.transform = `rotate(-${angle}deg)`;

    requestAnimationFrame(rotateCircles); // Keep rotating
}

rotateCircles(); // Start the animation



// others

let p3PngNames = ["bg", "lockFill", "lockOutline", "outline", "atoms2", "atoms1", "atom2", "atom1"];
let p3Pngs = [];
loadPngs("panelsImg/panel3/", p3PngNames, p3Pngs);
// for (let i = 0; i < pngNames.length; i++) {
//     let new_img = document.createElement("img");
//     new_img.src = "panelsImg/panel3/" + pngNames[i] + ".png";
//     new_img.alt = "panelsImg/panel3/" + pngNames[i] + ".png";
//     new_img.width *= scaling;
//     new_img.style.position = "absolute";
//     new_img.style.left = "0";
//     new_img.style.top = "0";
//     // new_img.height *= pngScaling;
//     panel3.appendChild(new_img);
//     pngs[i] = new_img;
// }
p3Pngs[0].style.zIndex = -1;

// lock animation
let locked = false;

function updatePosition() {
    if (locked) {
        p3Pngs[1].style.transition = "top 0.5s ease";
        p3Pngs[2].style.transition = "top 0.5s ease";

        p3Pngs[1].style.top = "5px";
        p3Pngs[2].style.top = "5px";
    } else {
        p3Pngs[1].style.top = "0px";
        p3Pngs[2].style.top = "0px";
    }
}

updatePosition();









// //rotate the circles
// let circleContainer = document.createElement("div");
// // circleContainer.style.overflow = "hidden";
// circleContainer.style.border = "1pt solid black";
// circleContainer.style.position = "absolute";
// circleContainer.style.top = "70px";
// circleContainer.style.left = "20px";
// circleContainer.style.width = "97px";
// circleContainer.style.height = "90px";
// let circles = ["bigCircle", "smallCircle"];
// let circleTops = [-110, -285];
// let circleLefts = [260,110];
// let circleScaling = [0.70, 0.7];
// let zIndexs = [-10,-1];
// for (let i = 0; i < circles.length; i++) {
//     let new_circle = document.createElement("img");
//     new_circle.id = circles[i];
//     new_circle.src = "panelsImg/panel3/" + circles[i] + ".png";
//     new_circle.alt = "panelsImg/panel3/" + circles[i] + ".png";
//     new_circle.width *= scaling;
//     new_circle.style.top = circleTops[i]+"px";
//     new_circle.style.left = circleLefts[i]+"px";

//     new_circle.style.position = "absolute";

//     new_circle.style.zIndex = zIndexs[i];

//     circleContainer.appendChild(new_circle);
// }
// panel3.appendChild(circleContainer);


// let angle = 0;
// function rotateCircles() {
//     angle += 0.4; // Adjust speed (degrees per frame)

//     // Get the elements
//     let bigCircle = document.getElementById("bigCircle");
//     let smallCircle = document.getElementById("smallCircle");

//     // Set the center of rotation to 100px, 100px
//     bigCircle.style.transformOrigin = "462px 209px";
//     smallCircle.style.transformOrigin = "462px 209px";

//     // Apply the rotation transformation
//     bigCircle.style.transform = `rotate(${angle}deg)`;
//     smallCircle.style.transform = `rotate(${angle}deg)`;

//     requestAnimationFrame(rotateCircles); // Keep rotating
// }

// rotateCircles(); // Start the animation