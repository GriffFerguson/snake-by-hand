var ar = 0;
getAspectRatio();
window.addEventListener('resize', getAspectRatio)

var score = 0;
var gameOver = 0;

//Player
var horizontal = 50;
var horizontalChange = 0;
var vertical = (50 * ar);
var verticalChange = 0;
var player = document.getElementById("player");
var horizontalArc = [];
var verticalArc = [];

//Target
var targetHori = (Math.round(Math.random() * 100));
var target = document.getElementById("target");
var targetVert = (Math.round(Math.random() *  (47.5 * ar)));

document.addEventListener('keydown', function(e) {
    switch(e.code) {
        case "ArrowRight":
            // console.log("right arrow pressed");
            if (horizontalChange != -1.8) {
                horizontalChange = 1.8;
                verticalChange = 0;
            }
            break;
        case "ArrowLeft":
            // console.log("left arrow pressed");
            if (horizontalChange != 1.8) {
                horizontalChange = -1.8;
                verticalChange = 0;
            }
            break;
        case "ArrowUp":
            // console.log("up arrow pressed");
            if (verticalChange != 1.8) {
                horizontalChange = 0;
                verticalChange = -1.8;
            }
            break;
        case "ArrowDown":
            // console.log("down arrow pressed");
            if (verticalChange != -1.8) {
                horizontalChange = 0;
                verticalChange = 1.8;
            }
            break;
    }
    // console.log("Horizontal: " + horizontal);
    // console.log("Vertical: " + vertical);
})

setInterval (function() {
    //Player functions
    horizontal = horizontal + horizontalChange;
    vertical = vertical + verticalChange;
    player.style.top = vertical + 'vw'; 
    player.style.left = horizontal + 'vw';
    
    if (horizontal < 0 || horizontal > 100 || vertical < 0 || vertical > 100) {gameOver = 1;}

    if (gameOver == 1) {
        document.getElementById("gameOver").style.display = 'block';
        document.getElementById("finalScore").innerText = score;
        horizontalChange = 0;
        verticalChange = 0;
        horizontal = 50;
        vertical = (50 * ar);
        for (let index = 0; index <= score; index++) {
            document.getElementById("player_seg" + index).remove();
        }
    }

    //Target functions
    target.style.top = targetVert + 'vw';
    target.style.left = targetHori +'vw';
    if (
        (horizontal - 2) < targetHori &&
        (horizontal + 2) > targetHori &&
        (vertical + 3) > targetVert &&
        (vertical - 3) < targetVert
    ) {
        // console.log("Target hit!")
        targetHori = (Math.round(Math.random() * 100));
        targetVert = (Math.round(Math.random() *  (47.5 * ar)));
        // console.log("targetHori: " + targetHori + "\r\ntargetVert: " + targetVert);
        score = score + 1;
        document.getElementById("score").innerText = score;
        console.log("Score: " + score);

        //Add player segment
        var seg = document.createElement("div");
        seg.classList.add("playersegment");
        seg.setAttribute("id", "player_seg" + (score - 1));
        document.body.appendChild(seg);
    }

    //Player length
    horizontalArc.unshift(horizontal);
    verticalArc.unshift(vertical);
    for (let index = 0; index < score; index++) {
        document.getElementById("player_seg" + index).style.left = horizontalArc[index + 1] +'vw';
        document.getElementById("player_seg" + index).style.top = verticalArc[index + 1] + 'vw';
    }
    if (horizontalArc.length > score) {horizontalArc.pop()}
    if (verticalArc.length > score) {verticalArc.pop()}
    // console.log("Horizontal History: " + horizontalArc + "\r\nVertical History: " + verticalArc);
    
    //Player segment collisions
    for (let index = 0; index <= score; index++) {
        if (
            vertical == verticalArc[index + 1] && 
            horizontal == horizontalArc[index + 1]
        ) {
            gameOver = 1;
            console.log("Vertical collision");
        }
    }
}, 87)


function getAspectRatio() {
    // Aspect ratio is measured in the 
    // amount to multiply the horizontal side 
    // by to reach an equivalent measurement on
    // the vertical side

    var width = window.innerWidth;
    var height = window.innerHeight;

    ar = height/width;
    console.log("Detected aspect ratio: " + ar);
}

function reset() {
    var horiArcLength = horizontalArc.length;
    var vertArcLength = verticalArc.length;
    
    for (let index = 0; index <= horiArcLength; index++) {
        horizontalArc.pop();
        verticalArc.pop();
    }
    score = 0;
    horizontal = 50;
    vertical = (50 * ar);
    horizontalChange = 0;
    verticalChange = 0;
    gameOver = 0;
    document.getElementById("gameOver").style.display = 'none';
    console.clear();
    getAspectRatio();
    console.log("Game restarted!")
}