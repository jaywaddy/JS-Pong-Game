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


// Canvas Properties
let canvas = {
  width: 1000,
  height: 500,
};

let canvasContext;

// Player Paddle Properties - Left Paddle
let paddle = {
  width: 10,
  height: 100,
  xPos: 10,
  yPos: canvas.height / 2.5,
  color: 'white'
};

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
    // Center of AI's Paddle
    let paddleCenter = AI.paddle.yPos + (AI.paddle.height / 2);

    // AI Puck Tracker
    if (paddleCenter < puck.yPos && puck.xSpeed > 0) {
      setTimeout(function(){
        AI.paddle.yPos += 2;
      }, 200);
      
    } else if (paddleCenter > puck.yPos && puck.xSpeed > 0){
      AI.paddle.yPos -= 2;
    } else {
      AI.paddle.yPos += 0;
    }

    // AI Idle Movement
    if (puck.xPos < 0) {
      if (puck.yPos > canvas.height / 2) {
        AI.paddle.yPos += 1;
      } else if (puck.yPos < canvas.height / 2) {
        AI.paddle.yPos -= 1;
      }
    }
  }
};

// Puck
let puck = {
  width: 10,
  height: 10,
  xPos: canvas.width / 2,
  yPos: canvas.height / 2,
  xSpeed: 5,
  ySpeed: 2,
  color: 'white',

  // Puck Movement
  move: () => {
    AI.move();
    puck.xPos += puck.xSpeed;
    puck.yPos += puck.ySpeed;

    // Puck Hitting Left Paddle
    if (puck.yPos > paddle.yPos
        && puck.yPos < paddle.yPos + paddle.height
        && puck.xPos == paddle.xPos) {
      puck.xSpeed = -puck.xSpeed;
    }

    // Puck Hitting Right Paddle
    
    if (puck.yPos > AI.paddle.yPos
        && puck.yPos < AI.paddle.yPos + AI.paddle.height
        && puck.xPos == AI.paddle.xPos) {
      puck.xSpeed = -puck.xSpeed;
    }
    
    // Puck Hitting Left or Right Wall
    if (puck.xPos < 0 || puck.xPos > canvas.width) {
      resetPuck();
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
    drawGame();
  }, 1000/framesPerSecond);

  canvas.addEventListener ('mousemove', (event) => {
    let mousePos = calculateMousePos(event);
    paddle.yPos = mousePos.y - (paddle.height/2);
  });
}

function resetPuck() {
  puck.xPos = canvas.width/2;
  puck.yPos = canvas.height/2;
  puck.xSpeed = -puck.xSpeed;
}

function drawGame() {
  // Canvas
  colorRect (
    0, 
    0,
    canvas.width, 
    canvas.height, 
    'black'
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
