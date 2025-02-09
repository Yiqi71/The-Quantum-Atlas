import {
    scaling
} from './main.js';
import {
    loadPngs
} from './main.js';


// bottom left and right
let p7PngNames = ["bg2", "bg1", "title2", "title1"];
let p7Pngs = [];
loadPngs(document.getElementById("panel7"), "panelsImg/panel7/", p7PngNames, p7Pngs);
p7Pngs[2].style.mixBlendMode = "multiply";
p7Pngs[0].style.zIndex = -22;
p7Pngs[1].style.zIndex = -21;
p7Pngs[2].style.zIndex = -20;