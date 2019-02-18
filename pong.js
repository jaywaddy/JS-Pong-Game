// Global Variables
var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;

var ballSpeedX = 5;
var ballSpeedY = 2;

var paddle1Y = 250;
var paddle2Y = 250;

const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;

// Create Paddle Object
function Paddle(width, height, xPosition, yPosition) {
  
  
  this.width = 10;
  this.height = 100;
  this.xPosition = 50;
  this.yPosition = 250;

  // this.colorChange() = function() {
  //   let rgb = drawPaddle.style.backgroundColor = rgb(red, 255, blue);

  //   while (score ++) {
  //     let red = 255;
  //     let blue = 255;
      
  //     red -= 20;
  //     blue -= 20;
  //   }
  //   return rgb;
  // };
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
  canvas.style.backgroundColor = 'black';

  let framesPerSecond = 60;
  setInterval (function() {
    movement();
    drawGame();
  }, 1000/framesPerSecond);

  canvas.addEventListener ('mousemove',
    function (evt) {
      var mousePos = calculateMousePos (evt);
      paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });
}

function ballReset() {
  ballX = canvas.width/2;
  ballY = canvas.height/2;
  ballSpeedX = -ballSpeedX;
}

// AI --------------------------------
function paddleAI() {
  let paddleCenter = paddle2Y + PADDLE_HEIGHT/2

  if (paddleCenter < ballY - 35) {
    paddle2Y += 6;
  } else if (paddleCenter < ballY + 35){
    paddle2Y -= 6;
  }
}

// Movement --------------------------
function movement() {
  paddleAI ();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

 if (ballX < 0) {
   if (ballY > paddle1Y &&
       ballY < paddle1Y + PADDLE_HEIGHT) {
         ballSpeedX = -ballSpeedX;
   } else {
       ballReset();
   }
 }

    if (ballX > canvas.width) {
      if (ballY > paddle2Y &&
          ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
      } else {
        ballReset();
      }
    }

    if (ballY > canvas.height) {
      ballSpeedY = -ballSpeedY;
      }

    if (ballY < 0) {
      ballSpeedY = -ballSpeedY;
      }
    }

function drawGame() {
  //Canvas
  colorRect (0, 0, canvas.width, canvas.height, 'black');

  //Player Paddle
  colorRect (0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

  //AI Paddle
  colorRect (canvas.width-PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');

  //Ball
  colorRect (ballX, ballY, 10, 10, 'white');
}

function colorRect (leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect (leftX, topY, width, height, drawColor);
}
