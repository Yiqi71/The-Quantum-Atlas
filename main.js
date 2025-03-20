export let scaling = 0.25;
let poster = document.getElementById("poster");

function checkScaling(){
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let widthScaling = windowWidth/2546;
    let heightScaling = windowHeight/3218;
    if(widthScaling<heightScaling){
        scaling = widthScaling;
    }else{
        scaling = heightScaling;
    }
    console.log(scaling);
}
checkScaling();


//prepare locked panels
export let uPanels = [];
for (let i = 0; i < 9; i++) {
    uPanels[i] = document.createElement("img");
    uPanels[i].src = `panelsImg/blackPanel_${i+1}.png`;
    uPanels[i].onload = () => {
        uPanels[i].width *= scaling;
    }
    uPanels[i].style.zIndex = 30;
    uPanels[i].style.opacity = 0.6;
    poster.appendChild(uPanels[i]);
}
uPanels[1].style.zIndex = 42;

// load background
let fixedBg = document.createElement("img");
fixedBg.src = `panelsImg/bg.png`;
fixedBg.onload = () => {
    fixedBg.width *= scaling;
}
fixedBg.style.zIndex = -9;
poster.appendChild(fixedBg);

// load outline
let fixedOutline = document.createElement("img");
fixedOutline.src = `panelsImg/fixed_outline.png`;
fixedOutline.onload = () => {
    fixedOutline.width *= scaling;
}
fixedOutline.style.zIndex = 888;
poster.appendChild(fixedOutline);

export function loadPngs(div, fileName, names, pngs) {
    for (let i = 0; i < names.length; i++) {
        let new_img = document.createElement("img");
        new_img.src = fileName + names[i] + ".png";
        new_img.alt = fileName + names[i] + ".png";
        // console.log(new_img.width);
        new_img.onload = () => {
            new_img.width *= scaling;
        }
        pngs[i] = new_img;
        div.appendChild(pngs[i]);
    }
}