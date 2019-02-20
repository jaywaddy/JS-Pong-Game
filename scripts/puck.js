// Puck
let puck = {
    width: 10,
    height: 10,
    xPos: canvas.xCenter,
    yPos: canvas.yCenter,
    xSpeed: 5,
    ySpeed: 2,
    color: '#646991',
  
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