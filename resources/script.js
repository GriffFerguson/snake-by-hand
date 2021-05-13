window.onload = function() {
var score = 0;

//Player
var horizontal = 50;
var horizontalChange = 0;
var vertical = 25;
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
            horizontalChange = 0.5;
            verticalChange = 0;
            break;
        case "ArrowLeft":
            // console.log("left arrow pressed");
            horizontalChange = -0.5;
            verticalChange = 0;
            break;
        case "ArrowUp":
            // console.log("up arrow pressed");
            horizontalChange = 0;
            verticalChange = -0.5;
            break;
        case "ArrowDown":
            // console.log("down arrow pressed");
            horizontalChange = 0;
            verticalChange = 0.5;
            break;
    }
    // console.log("Horizontal: " + horizontal);
    // console.log("Vertical: " + vertical);
})

setInterval (function() {
    document.getElementById("score").innerText = score;

    //Player functions
    horizontal = horizontal + horizontalChange;
    vertical = vertical + verticalChange;
    player.style.transform = 'translate(' + horizontal + 'vw,' + vertical + 'vw)';  
    
    var gameOver = 0;
    if (horizontal < 0 || horizontal > 100 || vertical < 0 || vertical > 100) {
        document.getElementById("gameOver").style.display = 'block';
        document.getElementById("finalScore").innerText = score;
        gameOver = 1;
    }

    if (gameOver == 1) {
        horizontalChange = 0;
        verticalChange = 0;
        horizontal = 49.5;
        vertical = 49.5;
    }

    //Target functions
    target.style.transform = 'translate(' + targetHori +'vw, ' + targetVert + 'vw)'
    if (
        (horizontal - 2) < targetHori &&
        (horizontal + 2) > targetHori &&
        (vertical + 2) > targetVert &&
        (vertical - 2) < targetVert
        ) {
            // console.log("Target hit!")
            targetVert = (Math.round(Math.random() * 95));
            targetHori = (Math.round(Math.random() * 47.5));
            score = score + 1;
            // console.log("Score: " + score);
        }
}, 100)
}