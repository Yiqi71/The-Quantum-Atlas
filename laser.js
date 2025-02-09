const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let laserSource = {
    x: 165,
    y: 110
};
let mirror = {
    x: 250,
    y: 200,
    r: 50,
    angle: 30,
    adjustX: 0,
    adjustY: 20
};
let deflector = {
    x1: 300,
    y1: 110,
    x2: 100,
    y2: 180
};

let inputAngle = Math.atan2(mirror.y-laserSource.y, mirror.x-laserSource.x) * (180 / Math.PI);

console.log(inputAngle);
let isDragging = false;

// Function to draw the laser beam
function drawLaser(x1, y1, x2, y2, color = "red") {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// Function to draw the mirror
function drawMirror() {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 5;

    let mirrorX2 = mirror.x + mirror.r * Math.cos(mirror.angle * (Math.PI / 180));
    // console.log(mirrorX2);
    let mirrorY2 = mirror.y + mirror.r * Math.sin(mirror.angle * (Math.PI / 180));

    ctx.beginPath();
    ctx.moveTo(
        mirror.x - mirror.r * Math.cos(mirror.angle * (Math.PI / 180)),
        mirror.y - mirror.r * Math.sin(mirror.angle * (Math.PI / 180))
    );
    ctx.lineTo(mirrorX2, mirrorY2);
    ctx.stroke();

}

// Function to draw the deflector as a line
function drawDeflector() {
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(deflector.x1, deflector.y1);
    ctx.lineTo(deflector.x2, deflector.y2);
    ctx.stroke();
}

function getIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    let denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom === 0) return null; // Lines are parallel, no intersection

    let intersectX = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / denom;
    let intersectY = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / denom;

    // Check if the intersection point is within the bounds of the line segments
    if (
        Math.min(x1, x2) <= intersectX && intersectX <= Math.max(x1, x2) &&
        Math.min(y1, y2) <= intersectY && intersectY <= Math.max(y1, y2) &&
        Math.min(x3, x4) <= intersectX && intersectX <= Math.max(x3, x4) &&
        Math.min(y3, y4) <= intersectY && intersectY <= Math.max(y3, y4)
    ) {
        return {
            x: intersectX,
            y: intersectY
        };
    }

    return null; // No intersection within bounds
}

// Reflect the laser on the mirror
function reflectLaser(x1, y1, angle) {
    let incidentAngle = mirror.angle;
    let reflectionAngle = 2 * incidentAngle - angle;

    let x2 = x1 + 500 * Math.cos(reflectionAngle * (Math.PI / 180));
    let y2 = y1 + 500 * Math.sin(reflectionAngle * (Math.PI / 180));

    drawLaser(mirror.x, mirror.y, x2, y2, "yellow");
    return {
        x: x2,
        y: y2,
        angle: reflectionAngle
    };

}

// check whether deflected
function isLaserIntersectingDeflector(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;

    let fx = x1 - deflector.x;
    let fy = y1 - deflector.y;

    let a = dx * dx + dy * dy;
    let b = 2 * (fx * dx + fy * dy);
    let c = fx * fx + fy * fy - 10 * 30; // 20 is the radius of the deflector

    let discriminant = b * b - 4 * a * c;

    return discriminant >= 0; // If true, the laser intersects the deflector
}


// Split the laser into multiple beams at the deflector
function deflectLaser(x, y, angle) {
    let beams = [{
            x: x + 400 * Math.cos((angle - 20) * (Math.PI / 180)),
            y: y + 400 * Math.sin((angle - 20) * (Math.PI / 180))
        },
        {
            x: x + 400 * Math.cos(angle * (Math.PI / 180)),
            y: y + 400 * Math.sin(angle * (Math.PI / 180))
        },
        {
            x: x + 400 * Math.cos((angle + 20) * (Math.PI / 180)),
            y: y + 400 * Math.sin((angle + 20) * (Math.PI / 180))
        }
    ];

    beams.forEach((beam) => drawLaser(x, y, beam.x, beam.y, "cyan"));
}

// Update function to redraw everything
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMirror();
    drawDeflector();

    // Draw initial laser
    drawLaser(laserSource.x, laserSource.y, mirror.x, mirror.y);

    // Reflect the laser at the mirror
    let reflected = reflectLaser(mirror.x, mirror.y, inputAngle);

    // Check if the reflected laser intersects the deflector
    let intersection = getIntersection(mirror.x, mirror.y, reflected.x, reflected.y, deflector.x1, deflector.y1, deflector.x2, deflector.y2);

    if (intersection) {
        // If intersection is found, deflect laser at that point
        deflectLaser(intersection.x, intersection.y, reflected.angle);
    }
}

let initialAngle = 0;
let mouseIsDown = false;
// Drag-to-Rotate functionality
canvas.addEventListener("mousedown", (event) => {
    let dx = event.clientX - mirror.x + mirror.adjustX;
    let dy = event.clientY - mirror.y + mirror.adjustY;


    // If mouse is close to the mirror, start dragging to rotate
    if (Math.sqrt(dx * dx + dy * dy) < 80) {
        isDragging = true;

        initialAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        mouseIsDown = true;

    }
});

canvas.addEventListener("mousemove", (event) => {
    if (isDragging) {
        // Calculate the angle between mirror and mouse position
        let dx = event.clientX - mirror.x + mirror.adjustX;
        let dy = event.clientY - mirror.y + mirror.adjustY;
        console.log(dx, dy);

        let currentAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        // console.log(currentAngle, initialAngle);

        mirror.angle = currentAngle;
        // mirror.angle += currentAngle - initialAngle;
        update();
        initialAngle = currentAngle;
    }
});

canvas.addEventListener("mouseup", () => {
    isDragging = false;
    mouseIsDown = false;
});


document.addEventListener("mousemove", (event) => {
    // console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);
});


// Initial render
update();