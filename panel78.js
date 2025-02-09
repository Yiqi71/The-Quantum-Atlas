import { scaling } from './main.js';
import { loadPngs } from './main.js';
import {
    locked
} from './panel3.js';

// bottom left and right
let p7PngNames = ["bg2", "bg1", "title2", "title1"];
let p7Pngs = [];
loadPngs(document.getElementById("panel7"),"panelsImg/panel7/", p7PngNames, p7Pngs);

let p8PngNames = ["bg2", "bg1", "circle2", "circle1", "circle1_border","atoms2", "atoms1", "entangled"];
let p8Pngs = [];
loadPngs(document.getElementById("panel8"),"panelsImg/panel8/", p8PngNames, p8Pngs);

p8Pngs[7].style.display = "none";
if(locked){
    p8Pngs[7].style.display ="block";
}