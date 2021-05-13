window.onload = function() {
var score = 0;

//Player
var horizontal = 49.5;
var horizontalChange = 0;
var vertical = 49.5;
var verticalChange = 0;
var player = document.getElementById("player");

//Target
var targetHori = (Math.random() * 98);
var target = document.getElementById("target");
var targetVert = (Math.random() * 98);

document.addEventListener('keydown', function(e) {
    switch(e.code) {
        case "ArrowRight":
            // console.log("right arrow pressed");
            horizontalChange = 0.6;
            verticalChange = 0;
            break;
        case "ArrowLeft":
            // console.log("left arrow pressed");
            horizontalChange = -0.6;
            verticalChange = 0;
            break;
        case "ArrowUp":
            // console.log("up arrow pressed");
            horizontalChange = 0;
            verticalChange = -1;
            break;
        case "ArrowDown":
            // console.log("down arrow pressed");
            horizontalChange = 0;
            verticalChange = 1;
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
    player.style.transform = 'translate(' + horizontal + 'vw,' + vertical + 'vh)';  
    if (horizontal < 0 || horizontal > 100 || vertical < 0 || vertical > 100) {
        document.getElementById("gameOver").style.display = 'block';
        document.getElementById("finalScore").innerText = score;
        horizontalChange = 0;
        verticalChange = 0;
        horizontal = 49.5;
        vertical = 49.5;
    }

    //Target functions
    target.style.transform = 'translate(' + targetHori +'vw, ' + targetVert + 'vh)'
    if (
        (horizontal - 2.5) < targetHori &&
        (horizontal + 2.5) > targetHori &&
        (vertical + 3.25) > targetVert &&
        (vertical - 3.25) < targetVert
        ) {
            // console.log("Target hit!")
            targetVert = (Math.random() * 98);
            targetHori = (Math.random() * 98);
            score = score + 1;
            // console.log("Score: " + score);
        }
}, 100)
}