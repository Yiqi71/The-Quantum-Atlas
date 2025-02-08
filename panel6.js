let face = document.createElement("img");
face.src = `panelsImg/panel6/export as.png`;
face.width *= scaling;
face.style.position = "absolute";
face.style.left = "0";
face.style.top = "0";

let names = ["passive", "active1", "active2", "shade"];
let pngs = [];
for (let i = 0; i < 4; i++) {
    let face = document.createElement("img");

    face.src = `panelsImg/panel6/${names[i]}.png`;
    face.width *= scaling;
    face.style.position = "absolute";
    face.style.left = "0";
    face.style.top = "0";
    face.style.zIndex = i;
    face.style.display = "none";
    pngs[i] = face;
    document.body.appendChild(pngs[i]);
}
document.body.appendChild(face);

let stage = "1";
if (stage == "off") {
    pngs[3].style.display = "block";
    pngs[0].style.display = "block";

} else {
    let activeIndex = 0; // 控制切换
    let intervalTime = 500; // 交替时间（毫秒）

    setInterval(() => {
        if (pngs[1] && pngs[2]) {
            if (activeIndex === 0) {
                pngs[1].style.display = "block";
                pngs[2].style.display = "none";
            } else {
                pngs[1].style.display = "none";
                pngs[2].style.display = "block";
            }
            activeIndex = 1 - activeIndex; // 在 0 和 1 之间切换
        }
    }, intervalTime);
}