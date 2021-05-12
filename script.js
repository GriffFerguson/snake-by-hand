var right = 0;
var left = 0;
var up = 0;
var down = 0;
var player = document.getElementById("player");

document.addEventListener('keydown', function(e) {
    switch(e.code) {
        case "ArrowRight":
            console.log("right arrow pressed");
            right = 1;
            left = 0;
            up = 0;
            down = 0;
            break;
        case "ArrowLeft":
            console.log("left arrow pressed");
            right = 0;
            left = 1;
            up = 0;
            down = 0;
            break;
        case "ArrowUp":
            console.log("up arrow pressed");
            right = 0;
            left = 0;
            up = 1;
            down = 0;
            break;
        case "ArrowDown":
            console.log("down arrow pressed");
            right = 0;
            left = 0;
            up = 0;
            down = 1;
            break;
            
    }
    console.log("Right: " + right);
    console.log("Left: " + left);
    console.log("Up: " + up);
    console.log("Down: " + down);
})