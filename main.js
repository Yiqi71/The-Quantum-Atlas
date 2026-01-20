export let scaling = 0.26;
let poster = document.getElementById("poster");

const loaderOverlay = document.getElementById("loaderOverlay");
const loaderBar = document.getElementById("loaderBar");
const loaderText = document.getElementById("loaderText");
const trackedImages = new WeakSet();
let totalImages = 0;
let loadedImages = 0;
let loaderFinished = false;
let loaderObserver = null;
let loaderTargetPercent = 0;
let loaderVisualPercent = 0;
let loaderRafId = null;
let loaderWantsFinish = false;

function finalizeLoader() {
    if (loaderFinished) return;
    loaderFinished = true;
    document.body.classList.remove("loading");
    if (loaderObserver) loaderObserver.disconnect();
    if (loaderOverlay) loaderOverlay.setAttribute("aria-hidden", "true");
}

function animateLoader() {
    if (!loaderBar || !loaderText) {
        loaderRafId = null;
        return;
    }

    let delta = loaderTargetPercent - loaderVisualPercent;
    if (Math.abs(delta) < 0.1) {
        loaderVisualPercent = loaderTargetPercent;
    } else {
        loaderVisualPercent += delta * 0.04;
    }
    loaderVisualPercent = Math.min(100, Math.max(0, loaderVisualPercent));

    loaderBar.style.width = `${loaderVisualPercent}%`;
    loaderText.textContent = `${Math.round(loaderVisualPercent)}%`;

    if (loaderWantsFinish && loaderVisualPercent >= 99.5) {
        loaderVisualPercent = 100;
        loaderBar.style.width = "100%";
        loaderText.textContent = "100%";
        loaderRafId = null;
        finalizeLoader();
        return;
    }

    if (loaderVisualPercent !== loaderTargetPercent || loaderWantsFinish) {
        loaderRafId = requestAnimationFrame(animateLoader);
    } else {
        loaderRafId = null;
    }
}

function updateLoader() {
    if (!loaderBar || !loaderText || totalImages === 0) return;
    let percent = Math.round((loadedImages / totalImages) * 100);
    loaderTargetPercent = Math.min(100, Math.max(0, percent));

    if (loadedImages >= totalImages) {
        loaderWantsFinish = true;
        if (loaderObserver) loaderObserver.disconnect();
    }

    if (!loaderRafId) {
        loaderRafId = requestAnimationFrame(animateLoader);
    }
}

function trackImage(img) {
    if (!img || trackedImages.has(img)) return;
    trackedImages.add(img);
    totalImages += 1;

    if (img.complete) {
        loadedImages += 1;
        updateLoader();
        return;
    }

    let onAssetReady = () => {
        loadedImages += 1;
        updateLoader();
    };
    img.addEventListener("load", onAssetReady, {
        once: true
    });
    img.addEventListener("error", onAssetReady, {
        once: true
    });

    updateLoader();
}

function preloadCssAssets() {
    let noise = new Image();
    noise.src = "panelsImg/Noise.png";
    trackImage(noise);
}

function observeImages() {
    document.querySelectorAll("img").forEach(trackImage);

    loaderObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType !== Node.ELEMENT_NODE) return;
                if (node.tagName === "IMG") {
                    trackImage(node);
                } else if (node.querySelectorAll) {
                    node.querySelectorAll("img").forEach(trackImage);
                }
            });
        });
    });

    loaderObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}

preloadCssAssets();
observeImages();

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
}
checkScaling();


//prepare locked panels
export let uPanels = [];
export let uPanelWrappers = [];
for (let i = 0; i < 9; i++) {
    uPanels[i] = document.createElement("img");
    uPanels[i].src = `panelsImg/blackPanel_${i+1}.png`;
    uPanels[i].onload = () => {
        uPanels[i].width *= scaling;
        const wrapper = uPanelWrappers[i];
        if (wrapper) {
            wrapper.style.width = `${uPanels[i].width}px`;
            wrapper.style.height = `${uPanels[i].height}px`;
            wrapper.dataset.fullHeight = `${uPanels[i].height}`;
        }
    }
    uPanels[i].style.zIndex = 30;
    uPanels[i].style.opacity = 0.6;
    if (i === 4 || i === 6) {
        const wrapper = document.createElement("div");
        wrapper.style.position = "absolute";
        wrapper.style.left = "0";
        wrapper.style.top = "0";
        wrapper.style.overflow = "hidden";
        wrapper.style.zIndex = 30;
        uPanelWrappers[i] = wrapper;
        wrapper.appendChild(uPanels[i]);
        poster.appendChild(wrapper);
    } else {
        poster.appendChild(uPanels[i]);
    }
}
uPanels[1].style.zIndex = 42;
if (uPanelWrappers[4]) uPanelWrappers[4].style.zIndex = 30;
if (uPanelWrappers[6]) uPanelWrappers[6].style.zIndex = 30;

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
        new_img.onload = () => {
            new_img.width *= scaling;
        }
        pngs[i] = new_img;
        div.appendChild(pngs[i]);
    }
}
