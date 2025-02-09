import {
    scaling
} from './main.js';
import {
    loadPngs
} from './main.js';

let p5Names = ["arm4", "arm3", "arm2", "arm1", "purple","laser", "bed2", "bed1", "atom"];
let p5Pngs = [];
loadPngs(document.getElementById("panel5"), `panelsImg/panel5/`, p5Names, p5Pngs);