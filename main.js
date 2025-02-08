// reset!!!
// localStorage.setItem("p1Finished", "false");
// localStorage.setItem("p2Finished", "false");
// localStorage.setItem("p3Finished", "false");
// localStorage.setItem("p4Finished", "false");
// localStorage.setItem("p5Finished", "false");
// localStorage.setItem("puzzle1Moved","false");

let uPanels = [];
let panels = [];

let gapsScaling = 0.7;
let wholePsLeft = 80;
let wholePsTop = 50;
let scaling = 0.19;
for (let i = 0; i < 8; i++) {
    // prepare unfinished panel pics
    uPanels[i] = document.createElement("img");
    uPanels[i].src = `panelsImg/blank_${i+1}.png`;
    uPanels[i].width *= scaling;
    uPanels[i].style.position = "absolute";
    uPanels[i].style.zIndex = "50";

    // prepare finished panel pics
    panels[i] = document.createElement("img");
    panels[i].src = `panelsImg/test_${i+1}.png`;
    panels[i].width *= scaling;

}

console.log(localStorage.getItem(`puzzle1Moved`));

for (let i = 0; i < 8; i++) {
    let div = document.getElementById(`panel${i+1}`);
    div.style.left = `0`;
    div.style.top = `0`;
    if (localStorage.getItem(`p${i+1}Finished`) === "true") {
        if (localStorage.getItem(`puzzle1Moved`) == "false") {
            document.body.style.pointerEvents = "none";
            setTimeout(() => {
                document.getElementById("puzzle1").style.transform = "translateY(-2em)";
                document.body.style.pointerEvents = "auto";
            }, 500);
            localStorage.setItem("puzzle1Moved", "true");
        } else {
            document.getElementById("puzzle1").style.top = "2em";
        }

        document.getElementById(`panel${i+1}`).appendChild(panels[i]);
    } else {
        // document.getElementById("panel1").style.backgroundColor = "grey";
        document.getElementById(`panel${i+1}`).appendChild(uPanels[i]);

    }
}

// the moving atom
const circle = document.getElementById("circle");
const container = document.getElementById("container");
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;
const circleSize = circle.clientWidth; // Assuming width = height
let atom = document.createElement("img");
atom.src = "panelsImg/color_3/atom.png";
atom.width *= scaling;
atom.style.zIndex = "10";
atom.style.position="absolute";
container.appendChild(atom);
atom.style.top="50px";
atom.style.left="50px";
atom.style.transform="translate(-50%, -50%)";
function moveCircle() {
    let newX = (0.5 - Math.random()) * (containerWidth - circleSize) * 0.7;
    let newY = (0.5 - Math.random()) * (containerHeight - circleSize) * 0.7;
    atom.style.transition = "transform 0.8s linear"; // Smooth movement
    atom.style.transform = `translate(${newX}px, ${newY}px)`;

}
// Move the circle every 2 seconds
setTimeout(() => {
    setInterval(moveCircle, 200);
}, 500);



