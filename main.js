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
    uPanels[i].style.zIndex = 40;
    uPanels[i].style.opacity = 0.6;
    poster.appendChild(uPanels[i]);
}

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

//puzzle
// console.log(localStorage.getItem(`puzzle1Moved`));

// for (let i = 0; i < 8; i++) {
//     let div = document.getElementById(`panel${i+1}`);
//     div.style.left = `0`;
//     div.style.top = `0`;
//     if (localStorage.getItem(`p${i+1}Finished`) === "true") {
//         if (localStorage.getItem(`puzzle1Moved`) == "false") {
//             document.body.style.pointerEvents = "none";
//             setTimeout(() => {
//                 document.getElementById("puzzle1").style.transform = "translateY(-2em)";
//                 document.body.style.pointerEvents = "auto";
//             }, 500);
//             localStorage.setItem("puzzle1Moved", "true");
//         } else {
//             document.getElementById("puzzle1").style.top = "2em";
//         }

//         document.getElementById(`panel${i+1}`).appendChild(panels[i]);
//     } else {
//         // document.getElementById("panel1").style.backgroundColor = "grey";
//         document.getElementById(`panel${i+1}`).appendChild(uPanels[i]);

//     }
// }




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