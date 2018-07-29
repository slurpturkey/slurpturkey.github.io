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

function game(){
    if(state == stateEnum.GAME){
        
        draw();
        
        move();
        collisionDetection();

    }else if(state == stateEnum.END_SCREEN){
        endScreen();
    }
    requestAnimationFrame(game);
}

function setPlayer(){
    player.x = 80;
    player.y = canvas.height / 2;
    player.radius = 20;
    player.color = "#FF0000";
    player.velocity = 0;
    player.acceleration = -0.3;
    player.isFalling = true;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FF5522";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2);

    ctx.font = "20px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Press space to start again.", canvas.width / 2, (canvas.height / 2) + 50);
}

document.addEventListener("keypress", keyDownHandler, false);

function keyDownHandler(e){
    if(e.key == " "){
        if(state == stateEnum.GAME){
            console.log("Space bar pressed.");
            player.isFalling = false;
        }else if(state == stateEnum.END_SCREEN){
            setPlayer()
            state = stateEnum.GAME;
            return;
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