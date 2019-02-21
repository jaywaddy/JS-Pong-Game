// Player Paddle Properties - Left Paddle
let paddle = {
    width: 10,
    height: 100,
    xPos: 10,
    yPos: canvas.height / 2.5,
    color: '#646991',
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
      color: '#646991',
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
          AI.paddle.yPos += 3;
        }, 200);
      } else if (AI.paddle.center() > puck.yPos && puck.xSpeed > 0){
        AI.paddle.yPos -= 3;
      } else {
        AI.paddle.yPos += 0;
      }
  
      
    },
  
    // AI Idle Reset
    reset: () => {
  
      // Mover to Center from Above
      setTimeout( () => {
        while (puck.xSpeed < 0
          && AI.paddle.center() < canvas.height / 2) {
          AI.paddle.yPos += 1.5;
          if (AI.paddle.center() == canvas.height / 2) {
            AI.paddle.yPos += 0;
          }
          break;
        }
      }, 200);
      
      // Mover to Center from Below
      setTimeout( () => {
        while (puck.xSpeed < 0
          && AI.paddle.center() > canvas.height / 2) {
          AI.paddle.yPos -= 1.5;
          if (AI.paddle.center() == canvas.height / 2) {
            AI.paddle.yPos += 0;
          }
          break;
        }
      }, 200);
    }
  };