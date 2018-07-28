var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

const JUMP_VELOCITY = 13;

const stateEnum = {
    GAME: 1,
    END_SCREEN: 2
}

var state = stateEnum.GAME;

var player = {
    x: 80, 
    y: canvas.height / 2,
    radius: 20,
    color: "#FF0000",
    velocity: 0,
    acceleration: -0.3,
    isFalling: true
};

var button = {
    x: canvas.width / 2,
    y: (canvas.height / 2) + 70,
    w: 150,
    h: 40
}

function game(){
    if(state == stateEnum.GAME){
        draw();
    
        move();
        collisionDetection();
        requestAnimationFrame(game);
    }else if(state == stateEnum.END_SCREEN){
        endScreen();
    }
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
}

function drawPlayer(){
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI*2, false);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

function move(){
    if(player.isFalling){
        fall();
    }else{
        jump();
    }

}

function fall(){
    player.velocity += player.acceleration;
    player.y -= player.velocity;
}

function jump(){
    player.velocity = JUMP_VELOCITY;
    player.isFalling = true;
}

function endScreen(){
    inProgress = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FF5522";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);

    

    ctx.beginPath();
    ctx.rect(button.x - (button.w / 2), button.y - (button.h / 2), button.w, button.h);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();

    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Start Again", button.x, button.y + (button.h / 5));
}

document.addEventListener("keypress", keyDownHandler, false);
document.addEventListener("click", clickHandler, false);

function keyDownHandler(e){
    if(e.key == " "){
        console.log("Space bar pressed.");
        player.isFalling = false;
    }else{
        return;
    }
}

function clickHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;

    if(state == stateEnum.END_SCREEN){
        console.log(relativeX + ", " + relativeY);
        console.log(button.x + " - " + (button.x + button.w) + ", " + button.y + ", " + (button.y + button.h));
        if(relativeX > button.x && relativeX < (button.x + button.w) && relativeY > button.y && relativeY < (button.y + button.h)){
            console.log("button press");
            state = stateEnum.GAME;
            //game();
        }
    }else{
        return;
    }
}


function collisionDetection(){
    if(player.y > canvas.height){
        state = stateEnum.END_SCREEN;
    }
}

game();