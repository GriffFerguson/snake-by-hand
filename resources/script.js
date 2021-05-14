window.onload = function() {
var score = 0;
var gameOver = 0;

//Player
var horizontal = 50;
var horizontalChange = 0;
var vertical = 50;
var verticalChange = 0;
var player = document.getElementById("player");

//Target
var targetHori = (Math.round(Math.random() * 95));
var target = document.getElementById("target");
var targetVert = (Math.round(Math.random() * 47.5));

document.addEventListener('keydown', function(e) {
    switch(e.code) {
        case "ArrowRight":
            // console.log("right arrow pressed");
            horizontalChange = 1;
            verticalChange = 0;
            break;
        case "ArrowLeft":
            // console.log("left arrow pressed");
            horizontalChange = -1;
            verticalChange = 0;
            break;
        case "ArrowUp":
            // console.log("up arrow pressed");
            horizontalChange = 0;
            verticalChange = -1.75;
            break;
        case "ArrowDown":
            // console.log("down arrow pressed");
            horizontalChange = 0;
            verticalChange = 1.75;
            break;
    }
    // console.log("Horizontal: " + horizontal);
    // console.log("Vertical: " + vertical);
})

setInterval (function() {
    //Player functions
    horizontal = horizontal + horizontalChange;
    vertical = vertical + verticalChange;
    player.style.top = vertical + 'vh'; 
    player.style.left = horizontal + 'vw';
    
    if (horizontal < 0 || horizontal > 100 || vertical < 0 || vertical > 100) {
        document.getElementById("gameOver").style.display = 'block';
        document.getElementById("finalScore").innerText = score;
        gameOver = 1;
    }

    if (gameOver == 1) {
        horizontalChange = 0;
        verticalChange = 0;
        horizontal = 50;
        vertical = 50;
    }

    //Target functions
    target.style.top = targetVert + '%';
    target.style.left = targetHori +'%';
    if (
        (horizontal - 3) < targetHori &&
        (horizontal + 3) > targetHori &&
        (vertical + 3) > targetVert &&
        (vertical - 3) < targetVert
        ) {
            // console.log("Target hit!")
            targetVert = (Math.round(Math.random() * 95));
            targetHori = (Math.round(Math.random() * 47.5));
            score = score + 1;
            document.getElementById("score").innerText = score;
            // console.log("Score: " + score);
        }
}, 100)
}