let canvas = document.getElementById("canvas");
let g = canvas.getContext("2d");

const gamestate_start = 0;
const gamestate_ingame = 1;
const gamestate_gameover = 2;

const ingamestate_start = 0;
const ingamestate_roll = 1;
const ingamestate_end = 0;

let gameState = gamestate_start;
let inGameState = ingamestate_start;
let boardPositionSize = 50;
let pawnPositions = [];
let boardPositions = [];
let playerAmountButtons = [];
let uiwindow = createRect(600, 200, 300, 300)
let images = {};

let lastRoll = -1;



function createRect(x, y, w, h) {
    let rectangle = {
        x: x,
        y: y,
        x2: x + w,
        y2: y + h,
        w: w,
        h: h,
    };
    return rectangle;
}

function clearCanvas() {
    g.fillStyle = "lightslategray";
    g.fillRect(0, 0, canvas.width, canvas.height);
}


function createBoardPositions() {
    let x = 0;
    let y = canvas.height - boardPositionSize;
    let path = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    for (let i = 0; i < path.length; i++) {

        if (path[i] == 1)//gaan naar rechts
        {
            //bedenk hier wat je met de x moet doen
            x += boardPositionSize + 5
        }
        else if (path[i] == 3)//gaan naar links
        {
            // bedenk hier wat je met de x moet doen
            x -= boardPositionSize + 5
        }
        else if (path[i] == 0)//gaan hier naar boven
        {
            //bedenk hier wat je met de y moet doen
            y -= boardPositionSize + 5
        }
        boardPositions.push(createRect(x, y, boardPositionSize, boardPositionSize));
    }
}


function initGame() {
    createBoardPositions();

    for (let i = 0; i < 4; i++) {
        let button = createRect(uiwindow.x + 5 + (i * 50), uiwindow.y + 50, 50, 50);
        button.playerAmount = i + 1;
        playerAmountButtons.push(button)
    }

}



function drawGameStart() {

    for (let i = 0; i < playerAmountButtons.length; i++) {
        const pos = playerAmountButtons[i];
        g.fillStyle = "purple"
        g.fillRect(playerAmountButtons[i].x, playerAmountButtons[i].y, playerAmountButtons[i].w, playerAmountButtons[i].h)

        g.fillStyle = "#FFFFFF";
        g.fillText((i + 1) + "", playerAmountButtons[i].x, playerAmountButtons[i].y + 20);
        g.drawImage(images["pawn" + i + ".png"], pos.x, pos.y, pos.w, pos.h)

    }
}

function drawIngame() {
    for (let i = 0; i < boardPositions.length; i++) {
        let pos = boardPositions[i];
        g.fillStyle = "#004400";
        g.fillRect(pos.x, pos.y, pos.w, pos.h);
        g.fillStyle = "#FFFFFF";
        g.fillText((i + 1) + "", pos.x, pos.y + 20);
    }


    let snakeImage = images["snakes.png"];
    g.drawImage(snakeImage, 0, 55, 600, 600);

    for (let i = 0; i < pawnPositions.length; i++) {


        let pos = pawnPositions[i];
        let boardI = pos.boardI;

        let boardpos = boardPositions[boardI];
        let pawnSize = boardPositionSize / 2;



        if (i == 0) {
            g.drawImage(images["pawn" + i + ".png"], boardpos.x, boardpos.y, pawnSize, pawnSize)
        }

        else if (i == 1) {
            g.drawImage(images["pawn" + i + ".png"], boardpos.x + pawnSize, boardpos.y, pawnSize, pawnSize)
        }
        else if (i == 2) {
            g.drawImage(images["pawn" + i + ".png"], boardpos.x, boardpos.y + pawnSize, pawnSize, pawnSize)
        }
        else if (i == 3) {
            g.drawImage(images["pawn" + i + ".png"], boardpos.x + pawnSize, boardpos.y + pawnSize, pawnSize, pawnSize)
        }
    }


}
function drawGameOver() { }

function draw() {
    clearCanvas();

    if (gameState == gamestate_start) {
        drawGameStart();

    }

    else if (gameState == gamestate_ingame) {
        drawIngame();
        drawUI()
    }
 }  


 function startRoll(){
    ingameState = ingamestate_roll
    lastRoll = -1
    draw();
    setTimeout(endRoll,500)
 }


 function drawUI(){
 
 if(ingameState == ingamestate_roll){

        if(lastRoll ==-1){
            g.fillText("rollen...." ,20,20)
        }else{
            g.drawImage(images["dice"+lastRoll+".png"])
        }
    }
}

function endRoll(){
    lastRoll = 
}


function loadImages() {
    let sources = [
        "img/dice1.png", "img/dice2.png", "img/dice3.png", "img/dice4.png", "img/dice5.png", "img/dice6.png",
        "img/pawn0.png", "img/pawn1.png", "img/pawn2.png", "img/pawn3.png",
        "img/snakes.png",
        "img/trophy.png",
        "img/window.png",
    ];

    let scope = this;

    let loaded = 0;
    for (let i = 0; i < sources.length; i++) {
        let img = new Image();


        img.onload = function () {
            loaded++;
            if (loaded == sources.length) {
                imagesLoaded();
            }
        };
        img.src = sources[i];

        images[sources[i].replace("img/", "")] = img;
    }
}

function canvasClicked(mouseEvent) {

    if (gameState == gamestate_start) {

        let mX = mouseEvent.clientX;
        let mY = mouseEvent.clientY;

        for (let i = 0; i < playerAmountButtons.length; i++) {
            const button = playerAmountButtons[i];
            let hitButton = inRect(mX, mY, button);
            if (hitButton == true) {

                startGame(button.playerAmount);
                break;
            }
        }
    }
    else if (gameState == gamestate_ingame) {

        if (ingameState == ingamestate_start) {
            startRoll();

        }
    }
}




function createPawn(playerI) {

    return { board: 0, playerI: playerI };
}


function startGame(playerAmount) {

    gameState = gamestate_ingame;
    inGameState = ingamestate_start;
    pawnPositions = [];
    playerTurn = 0;
    winner = -1;
    console.log("playerAmount" + playerAmount);
    for (let i = 0; i < playerAmount; i++) {
        let poppetje = createPawn(i)

        pawnPositions.push(poppetje)
    }
    draw();
}

function inRect(px, py, rect) {

    let result = (px >= rect.x && px <= rect.x2 && py >= rect.y && py <= rect.y2)
    return result;
}

function imagesLoaded() {
    initGame();

    canvas.addEventListener("click", (e) => { canvasClicked(e) });


    draw();
}

function createPawn(playerI) {
    return { boardI: 0, playerI: playerI }
}


loadImages();