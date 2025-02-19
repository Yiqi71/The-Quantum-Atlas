// reset!!!
// localStorage.setItem("p1Finished", "false");
// localStorage.setItem("p2Finished", "false");
// localStorage.setItem("p3Finished", "false");
// localStorage.setItem("p4Finished", "false");
// localStorage.setItem("p5Finished", "false");
// localStorage.setItem("puzzle1Moved","false");


export let scaling = 0.19;
let poster = document.getElementById("poster");

//prepare locked panels
export let uPanels = [];
for (let i = 0; i < 9; i++) {
    uPanels[i] = document.createElement("img");
    uPanels[i].src = `panelsImg/blackPanel_${i+1}.png`;
    uPanels[i].width *= scaling;
    uPanels[i].style.position = "absolute";
    uPanels[i].style.zIndex = 30;
    uPanels[i].style.opacity = 0.6;
    poster.appendChild(uPanels[i]);
}
uPanels[1].style.zIndex = 42;

// load background
let fixedBg = document.createElement("img");
fixedBg.src = `panelsImg/bg.png`;
fixedBg.width *= scaling;
fixedBg.style.zIndex = -9;
poster.appendChild(fixedBg);

// load outline
let fixedOutline = document.createElement("img");
fixedOutline.src = `panelsImg/fixed_outline.png`;
fixedOutline.width *= scaling;
fixedOutline.style.zIndex = 888;
poster.appendChild(fixedOutline);

export function loadPngs(div, fileName, names, pngs) {
    for (let i = 0; i < names.length; i++) {
        let new_img = document.createElement("img");
        new_img.src = fileName + names[i] + ".png";
        new_img.alt = fileName + names[i] + ".png";
        new_img.width *= scaling;
        pngs[i] = new_img;
        div.appendChild(pngs[i]);
    }
}