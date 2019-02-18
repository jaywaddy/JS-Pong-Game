// Global Variables
let canvas = {
  width: 1000,
  height: 500
};

let canvasContext;

// Paddle Properties - Left Paddle
let paddle = {
  width: 10,
  height: 100,
  xPos: 10,
  yPos: canvas.height / 2.5,
  color: 'white'
}

// AI Paddle Properties - Right Paddle
let AI = {
  paddle: {
    width: 10,
    height: 100,
    xPos: canvas.width - 20,
    yPos: canvas.height / 2.5,
    color: 'white'
  },
  // AI Motion
  move: () => {
    let paddleCenter = AI.paddle.yPos + AI.paddle.height/2

    if (paddleCenter < puck.yPos - AI.paddle.height/2) {
      AI.paddle.yPos += 6;
    } else if (paddleCenter < puck.yPos + AI.paddle.height/2){
      AI.paddle.yPos -= 6;
    } else {
      AI.paddle.yPos += 0;
    }
  }
}

// Puck
let puck = {
  width: 10,
  height: 10,
  xPos: 0,
  yPos: 0,
  xSpeed: 5,
  ySpeed: 2,
  color: 'white'
}

function calculateMousePos (evt) {
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = evt.clientX - rect.left - root.scrollLeft;
  let mouseY = evt.clientY - rect.top - root.scrollTop;
  return {
    x:mouseX, 
    y:mouseY
  };

}

window.onload = function() {
  canvas = document.querySelector('#canvas');
  canvasContext = canvas.getContext ('2d');

  let framesPerSecond = 60;
  setInterval (function() {
    movement();
    drawGame();
  }, 1000/framesPerSecond);

  canvas.addEventListener ('mousemove', (event) => {
    let mousePos = calculateMousePos(event);
    paddle.yPos = mousePos.y - (paddle.height/2);
  });
}

function ballReset() {
  puck.xPos = canvas.width/2;
  puck.yPos = canvas.height/2;
  puck.xSpeed = -puck.xSpeed;
}

// ---------- Puck Movement ---------- 
function movement() {
  AI.move();

  puck.xPos += puck.xSpeed;
  puck.yPos += puck.ySpeed;

  // Puck Hitting Left Paddle & AI Score Point
  if (puck.xPos < 0) {
    if (puck.yPos > paddle.yPos && 
      puck.yPos < paddle.yPos + paddle.height) {
      puck.xSpeed = -puck.xSpeed;
    } else {
      ballReset();
    }
  }

  // Puck Hitting Right Paddle & Player Score Pint
  if (puck.xPos > canvas.width) {
    if (puck.yPos > AI.paddle.yPos &&
      puck.yPos < AI.paddle.yPos + AI.paddle.height) {
      puck.xSpeed = -puck.xSpeed;
    } else {
      ballReset();
    }
  }

  // Puck Bouncing Off Bottom
  if (puck.yPos > canvas.height - puck.height) {
    puck.ySpeed = -puck.ySpeed;
  }

  // Puck Bouncing Off Top
  if (puck.yPos < 0) {
    puck.ySpeed = -puck.ySpeed;
  }
}

function drawGame() {
  // Canvas
  colorRect (0, 0, canvas.width, canvas.height, 'black');

  // Player Paddle
  colorRect (paddle.xPos, paddle.yPos, paddle.width, paddle.height, 'white');

  // AI Paddle
  colorRect (AI.paddle.xPos, AI.paddle.yPos, AI.paddle.width, AI.paddle.height, 'white');

  // Puck
  colorRect (puck.xPos, puck.yPos, puck.width, puck.height, 'white');
}

function colorRect (leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect (leftX, topY, width, height, drawColor);
}
