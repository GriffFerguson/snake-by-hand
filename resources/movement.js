window.onload = function() {
var horizontal = 49.5;
var horizontalChange = 0;
var vertical = 49.5;
var verticalChange = 0;

var player = document.getElementById("player");

document.addEventListener('keydown', function(e) {
    switch(e.code) {
        case "ArrowRight":
            console.log("right arrow pressed");
            horizontalChange = 0.6;
            verticalChange = 0;
            player.transform = 'translate'
            break;
        case "ArrowLeft":
            console.log("left arrow pressed");
            horizontalChange = -0.6;
            verticalChange = 0;
            break;
        case "ArrowUp":
            console.log("up arrow pressed");
            horizontalChange = 0;
            verticalChange = -1;
            break;
        case "ArrowDown":
            console.log("down arrow pressed");
            horizontalChange = 0;
            verticalChange = 1;
            break;
    }
    console.log("Horizontal: " + horizontal);
    console.log("Vertical: " + vertical);
})

setInterval (function() {
    horizontal = horizontal + horizontalChange;
    vertical = vertical + verticalChange;
    player.style.transform = 'translate(' + horizontal + 'vw,' + vertical + 'vh)';  
}, 100)
}