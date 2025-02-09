import { scaling } from './main.js';
import { loadPngs } from './main.js';



// Laser source
let p1PngNames = ["bg4","bg3","bg2","bg1","button_passive"];
let p1Pngs = [];
loadPngs(document.getElementById("panel1"),"panelsImg/panel1/", p1PngNames, p1Pngs);



// 2
let p2PngNames = ["bg5","bg4","bg3","bg2","bg1"];
let p2Pngs = [];

loadPngs(document.getElementById("panel2"),"panelsImg/panel2/", p2PngNames, p2Pngs);
// p2Pngs[1].style.mixBlendMode = "lighten";
p2Pngs[2].style.mixBlendMode = "multiply";
// p2Pngs[3].style.mixBlendMode = "darken";
console.log(p2Pngs[1].style.mixBlendMode);
// p2Pngs[4].style.zIndex = 1000;