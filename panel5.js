import {
    scaling
} from './main.js';
import {
    loadPngs
} from './main.js';

let p5Names = ["arm4", "arm3", "arm2", "arm1", "purple","laser", "bed2", "bed1", "atom"];
let p5Pngs = [];
loadPngs(document.getElementById("panel5"), `panelsImg/panel5/`, p5Names, p5Pngs);
p5Pngs[3].style.mixBlendMode = "multiply";

let stop = 0;
function moveCircle() {
    let newX = (0.5 - Math.random()) * 20;
    let newY = (0.5 - Math.random()) * 20;
    p5Pngs[8].style.transition = "transform 0.8s linear"; // Smooth movement
    p5Pngs[8].style.transform = `translate(${newX}px, ${newY}px)`;

}

function slowCircle() {
    let x = parseFloat(p5Pngs[8].style.left) || 0;
    let y = parseFloat(p5Pngs[8].style.top) || 0;
    // x = (0.5 - Math.random()) * x*0.3;
    // y = (0.5 - Math.random()) * y*0.3;
    p5Pngs[8].style.transition = "transform 2.8s linear"; // Smooth movement
    p5Pngs[8].style.left= "0";
    p5Pngs[8].style.top= "0";
}

let button5 = document.createElement("div");
document.body.appendChild(button5);
button5.classList = "fakeButton";
button5.style.left = "240px";
button5.style.top = "70px";
button5.addEventListener("click", () => {
    stop = 1;
})
if(stop == 0){
    moveCircle();
}else{
    slowCircle();
}