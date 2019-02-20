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
  xCenter: 500,
  yCenter: 250
};

let canvasContext;

// Player Paddle Properties - Left Paddle
let paddle = {
  width: 10,
  height: 100,
  xPos: 10,
  yPos: canvas.height / 2.5,
  color: 'white',
  center: () => {
    let center = paddle.yPos + (paddle.height / 2);
    return center;
  }
};

// AI Paddle Properties - Right Paddle
let AI = {
  paddle: {
    width: 10,
    height: 100,
    xPos: canvas.width - 20,
    yPos: canvas.height / 2.5,
    color: 'white',
    center: () => {
      let center = AI.paddle.yPos + (AI.paddle.height / 2);
      return center;
    }
  },

  // AI Motion
  move: () => {
    // AI Puck Tracker
    if (AI.paddle.center() < puck.yPos && puck.xSpeed > 0) {
      setTimeout(function(){
        AI.paddle.yPos += 2;
      }, 200);
    } else if (AI.paddle.center() > puck.yPos && puck.xSpeed > 0){
      AI.paddle.yPos -= 2;
    } else {
      AI.paddle.yPos += 0;
    }

    
  },

  // AI Idle Reset
  reset: () => {

    // Mover to Center from Above
    while (puck.xSpeed < 0
      && AI.paddle.center() < canvas.height / 2) {
      AI.paddle.yPos += 1.5;
      if (AI.paddle.center() == canvas.height / 2) {
        AI.paddle.yPos += 0;
      }
      break;
    }

    // Mover to Center from Below
    while (puck.xSpeed < 0
      && AI.paddle.center() > canvas.height / 2) {
      AI.paddle.yPos -= 1.5;
      if (AI.paddle.center() == canvas.height / 2) {
        AI.paddle.yPos += 0;
      }
      break;
    }
  }
};

// Puck
let puck = {
  width: 10,
  height: 10,
  xPos: canvas.xCenter,
  yPos: canvas.yCenter,
  xSpeed: 5,
  ySpeed: 2,
  color: 'white',

  // Puck Movement
  move: () => {
    AI.move();
    puck.xPos += puck.xSpeed;
    puck.yPos += puck.ySpeed;
    
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
  },

  //Bouncing Off Left
  bounceLeft: () => {
    if (puck.yPos > paddle.yPos
      && puck.yPos < paddle.yPos + paddle.height
      && puck.xPos == paddle.xPos) {
      puck.xSpeed = -puck.xSpeed;

      console.log('bounce left');
    }
  },

  // Bouncing Off Right Paddle
  bounceRight: () => {
    if (puck.yPos > AI.paddle.yPos
      && puck.yPos < AI.paddle.yPos + AI.paddle.height
      && puck.xPos == AI.paddle.xPos) {
      puck.xSpeed = -puck.xSpeed;
      
      console.log('bounce right');
      AI.reset();
    }
    AI.reset();
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
    puck.bounceLeft();
    puck.bounceRight();
    drawGame();
  }, 1000/framesPerSecond);

  canvas.addEventListener ('mousemove', (event) => {
    let mousePos = calculateMousePos(event);
    paddle.yPos = mousePos.y - (paddle.height / 2);
  });
}

function resetPuck() {
  puck.xPos = canvas.xCenter;
  puck.yPos = canvas.yCenter;
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