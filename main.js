// reset!!!
// localStorage.setItem("p1Finished", "false");
// localStorage.setItem("p2Finished", "false");
// localStorage.setItem("p3Finished", "false");
// localStorage.setItem("p4Finished", "false");
// localStorage.setItem("p5Finished", "false");
// localStorage.setItem("puzzle1Moved","false");

let uPanels = [];
let panels = [];

let wholePsLeft = 80;
let wholePsTop = 50;
export let scaling = 0.19;
for (let i = 0; i < 8; i++) {
    // prepare unfinished panel pics
    uPanels[i] = document.createElement("img");
    uPanels[i].src = `panelsImg/blank_${i+1}.png`;
    uPanels[i].width *= scaling;
    uPanels[i].style.position = "absolute";
    uPanels[i].style.zIndex = "50";

    // prepare finished panel pics
    panels[i] = document.createElement("img");
    panels[i].alt = `panelsImg/test_${i+1}.png`;
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




export function loadPngs(div,fileName, names, pngs){
    for (let i = 0; i < names.length; i++) {
        let new_img = document.createElement("img");
        new_img.src = fileName + names[i] + ".png";
        new_img.alt = fileName + names[i] + ".png";
        new_img.width *= scaling;
        // new_img.height *= pngScaling;
        pngs[i] = new_img;
        div.appendChild(pngs[i]);
        
    }
}
