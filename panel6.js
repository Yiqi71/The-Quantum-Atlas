import { scaling } from './main.js';
import { loadPngs } from './main.js';


let p6Names = ["passive", "active1", "active2", "shade", "face"];
let p6Pngs = [];
loadPngs(document.getElementById("panel6"),`panelsImg/panel6/`, p6Names, p6Pngs);
p6Pngs[4].style.zIndex = -1;
let cameraStage = "off";
let cameraInterval = null;
function checkCamera() {
    if (cameraStage == "off") {
        p6Pngs[0].style.display = "block";
        p6Pngs[1].style.display = "none";
        p6Pngs[2].style.display = "none";
        if (cameraInterval) {
            clearInterval(cameraInterval);
            cameraInterval = null; // 避免多次 clear
        }

    } else {
        
        let activeIndex = 0; // 控制切换
        let intervalTime = 500; // 交替时间（毫秒）

        if (cameraInterval) {
            clearInterval(cameraInterval);
        }
        cameraInterval = setInterval(() => {
            if (p6Pngs[1] && p6Pngs[2]) {
                p6Pngs[0].style.display = "none";
                if (activeIndex === 0) {
                    p6Pngs[1].style.display = "block";
                    p6Pngs[2].style.display = "none";
                } else {
                    p6Pngs[1].style.display = "none";
                    p6Pngs[2].style.display = "block";
                }
                activeIndex = 1 - activeIndex; // 在 0 和 1 之间切换
            }
        }, intervalTime);
    }
}
checkCamera();

// click to turn on camera
p6Pngs[3].style.display = "block";
let camera = document.createElement("div");
// camera.style.border = "1px solid black";
camera.style.position = "absolute";
camera.style.width = "80px";
camera.style.height = "80px";
camera.style.left = "300px";
camera.style.top = "280px";
camera.style.zIndex = 100;
document.body.appendChild(camera);


camera.addEventListener("click", function () {
    if (cameraStage !== "on") { // 避免重复触发
        cameraStage = "on";
        checkCamera();

        setTimeout(() => {
            cameraStage = "off";
            checkCamera();
        }, 5000); // 5秒后切换回 "off"
    }
})