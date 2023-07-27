var ar = 0;
getAspectRatio();
window.addEventListener('resize', getAspectRatio)

var score = 0;
var scoreElem = document.getElementById("score");
var gameOver = new Event("gameOver");
var inhibiter = false;
var pauseVector = []

//Player
var horizontal = 50; // Horizontal position
var horizontalChange = 0; // Speed in horizontal direction
var vertical = (50 * ar); //Vertical position
var verticalChange = 0; // Speed in vertical direction
var player = document.getElementById("player");
var horizontalArc = []; // List of past horizontal coordinates for trailing elems
var verticalArc = []; // List of past vertical coordinates for trailing elems

//Target
var targetHori = (Math.round(Math.random() * 100));
var target = document.getElementById("target");
var targetVert = (Math.round(Math.random() *  (47.5 * ar)));

document.addEventListener('keydown', function(e) {
    switch(e.code) {
        case "ArrowRight":
            // console.log("right arrow pressed");
            if (horizontalChange != -2 && !inhibiter) {
                horizontalChange = 2;
                verticalChange = 0;
            }
            break;
        case "ArrowLeft":
            // console.log("left arrow pressed");
            if (horizontalChange != 2 && !inhibiter) {
                horizontalChange = -2;
                verticalChange = 0;
            }
            break;
        case "ArrowUp":
            // console.log("up arrow pressed");
            if (verticalChange != 2 && !inhibiter) {
                horizontalChange = 0;
                verticalChange = -2;
            }
            break;
        case "ArrowDown":
            // console.log("down arrow pressed");
            if (verticalChange != -2 && !inhibiter) {
                horizontalChange = 0;
                verticalChange = 2;
            }
            break;
        case "KeyP":
            if (!inhibiter) {
                pauseVector = [horizontalChange, verticalChange];
                horizontalChange = 0;
                verticalChange = 0;
                inhibiter = true;
            } else {
                horizontalChange = pauseVector[0];
                verticalChangeChange = pauseVector[1];
                inhibiter = false;
            }
            break;
    }
})

setInterval (function() {
    // Player movement
    horizontal = horizontal + horizontalChange;
    vertical = vertical + verticalChange;
    player.style.top = vertical + 'vw'; 
    player.style.left = horizontal + 'vw';
    // console.log(horizontal, vertical)
    
    if (horizontal < 0 || horizontal > 100 || vertical < 0 || vertical > 100 * ar) document.dispatchEvent(gameOver);

    //Target collision
    target.style.top = targetVert + 'vw';
    target.style.left = targetHori +'vw';
    if (
        (horizontal - 2) < targetHori &&
        (horizontal + 2) > targetHori &&
        (vertical + 2) > targetVert &&
        (vertical - 2) < targetVert
    ) {
        // console.log("Target hit!")
        targetHori = (Math.floor(Math.random() * 50) * 2);
        targetVert = (Math.floor(Math.random() * 50) * 2 * ar);
        // console.log("targetHori: " + targetHori + "\r\ntargetVert: " + targetVert);
        
        // Update score
        score = score + 1;
        scoreElem.innerText = score;
        console.log("Score: " + score);

        // Add player segment
        var seg = document.createElement("div");
        seg.classList.add("playersegment");
        seg.setAttribute("id", "player_seg" + (score - 1));
        document.body.appendChild(seg);
    }

    //Player length
    if (!inhibiter) {
        horizontalArc.unshift(horizontal);
        verticalArc.unshift(vertical);
    }
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
            (horizontalChange != 0 && verticalChange != 0) &&
            (vertical == verticalArc[index + 1] && 
            horizontal == horizontalArc[index + 1])
        ) {
            document.dispatchEvent(gameOver);
        }
    }
}, 100)


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

document.getElementById("reset").addEventListener("click", () => {
    var horiArcLength = horizontalArc.length;
    // var vertArcLength = verticalArc.length;
    inhibiter = false;
    
    for (let index = 0; index <= horiArcLength; index++) {
        horizontalArc.pop();
        verticalArc.pop();
    }


    document.getElementById("gameOver").style.display = 'none';
    getAspectRatio();
    console.log("Game restarted!")
})

document.addEventListener("gameOver", e => {
    document.getElementById("finalScore").innerText = score;
    document.getElementById("gameOver").style.display = 'block';
    
    horizontal = 50;
    vertical = (50 * ar);
    horizontalChange = 0;
    verticalChange = 0;
    horizontal = 50;
    scoreElem.innerText = 0;
    inhibiter = true;
    
    vertical = (50 * ar);
    var segs = document.getElementsByClassName("playersegment");
    for (let i = 0; i < segs.length; i++) {
        segs[i].remove();
        i--;
    }

    score = 0;
})