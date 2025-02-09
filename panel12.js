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
p2Pngs[1].style.mixBlendMode = "lighten";
console.log(p2Pngs[1].style.mixBlendMode);
