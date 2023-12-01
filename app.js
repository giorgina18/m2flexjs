let canvas = document.getElementById("canvas");
let g = canvas.getContext("2d");

const game_start = 0;
const gamestate_ingame = 1;
const gamestate_gameover = 2;

const ingamestate_start = 0;
const ingamestate_roll = 1;
const ingamestate_end = 0;

let gameState = game_start;
let inGameState = ingamestate_start;
let boardPositionSize = 50;
let pawnPositions = [];
let boardPositions = [];
let playerAmountButtons = [];
let uiwindow = createRect(600, 200, 300, 300)



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
            x += boardPositionSize
        }
        else if (path[i] == 3)//gaan naar links
        {
            // bedenk hier wat je met de x moet doen
            x -= boardPositionSize
        }
        else if (path[i] == 0)//gaan hier naar boven
        {
            //bedenk hier wat je met de y moet doen
            y -= boardPositionSize
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
        // const element = playerAmountButtons[i];
        g.fillStyle = "purple"
        g.fillRect(playerAmountButtons[i].x, playerAmountButtons[i].y, playerAmountButtons[i].w, playerAmountButtons[i].h)

        g.fillStyle = "#FFFFFF";
        g.fillText((i + 1) + "", playerAmountButtons[i].x, playerAmountButtons[i].y + 20);

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
}
function drawGameOver() { }

function draw() {
    clearCanvas();

    if (gameState == game_start) { 
        drawGameStart();
    
    }
    
    else if (gamestate == gamestate_ingame) {
        drawIngame();
    }
}
initGame()
draw()

