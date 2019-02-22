// Canvas Properties
let canvas = {
  width: 1000,
  height: 500,
  xCenter: 500,
  yCenter: 250
};

let canvasContext;

// Game Score
let playerScore = 0;
let AIScore = 0;

// Buffs & Debuffs
let boost = function() {
  puck.xSpeed *= 1.1;
};

let slow = function() {
  puck.xSpeed *= 0.9;
};

let stickyPuck = () => {
  // if () {

  // }
};





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
    puck.move();
    puck.bounceLeft();
    puck.bounceRight();
    puck.bounceAngle();
    drawGame();
  }, 1000/framesPerSecond);

  canvas.addEventListener ('mousemove', (event) => {
    let mousePos = calculateMousePos(event);
    paddle.yPos = mousePos.y - (paddle.height / 2);
  });
}

function resetPuck() {
  puck.xPos = canvas.width / 2;
  puck.yPos = canvas.height / 2;
  puck.xSpeed = 5;
  puck.xSpeed = -puck.xSpeed;
  puck.ySpeed = 2;

}

function drawGame() {
  // Canvas
  colorRect (
    0, 
    0,
    canvas.width, 
    canvas.height, 
    '#171821'
  );

  // Player Paddle
  colorRect (
    paddle.xPos, 
    paddle.yPos, 
    paddle.width, 
    paddle.height, 
    paddle.color
  );

  // AI Paddle
  colorRect (
    AI.paddle.xPos,
    AI.paddle.yPos, 
    AI.paddle.width,
    AI.paddle.height, 
    AI.paddle.color
  );

  // Puck
  colorRect (
    puck.xPos, 
    puck.yPos, 
    puck.width, 
    puck.height, 
    puck.color
  );
}

function colorRect (leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect (
    leftX, 
    topY, 
    width, 
    height, 
    drawColor
  );
}