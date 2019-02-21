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
        && puck.xPos < paddle.xPos) {
        puck.xSpeed = -puck.xSpeed;
      }
    },
  
    // Bouncing Off Right Paddle
    bounceRight: () => {
      if (puck.yPos > AI.paddle.yPos
        && puck.yPos < AI.paddle.yPos + AI.paddle.height
        && puck.xPos > AI.paddle.xPos) {
        puck.xSpeed = -puck.xSpeed;
        AI.reset();
      }
      AI.reset();
    },

    // Bounce Angle Mechanics
    bounceAngle: () => {
      // Puck Fraction Values ( In 5ths)
      let x1 = 0.2,
          x2 = 0.4,
          x3 = 0.6,
          x4 = 0.8;

      // 1/5
      if (puck.yPos > paddle.yPos && puck.yPos < paddle.yPos + (paddle.height * x1) && puck.xPos < paddle.xPos
        || puck.yPos > AI.paddle.yPos && puck.yPos < AI.paddle.yPos + (AI.paddle.height * x1) && puck.xPos > AI.paddle.xPos) {
          puck.ySpeed = 2;
          puck.ySpeed *= 1.5;
          slow();
      }

      // 2/5
      if (puck.yPos > paddle.yPos + (paddle.height * x1) && puck.yPos < paddle.yPos + (paddle.height * x2) && puck.xPos < paddle.xPos
        || puck.yPos > AI.paddle.yPos && puck.yPos < AI.paddle.yPos + (AI.paddle.height * x2) && puck.xPos > AI.paddle.xPos) {
          puck.ySpeed = 2;
          puck.ySpeed *=  -1.2;
      }

      // 3/5
      if (puck.yPos > paddle.yPos + (paddle.height * x2) && puck.yPos < paddle.yPos + (paddle.height * x3) && puck.xPos < paddle.xPos
        || puck.yPos > AI.paddle.yPos && puck.yPos < AI.paddle.yPos + (AI.paddle.height * x3) && puck.xPos > AI.paddle.xPos) {
          puck.ySpeed = 2;
          boost();
      }

      // 4/5
      if (puck.yPos > paddle.yPos + (paddle.height * x3) && puck.yPos < paddle.yPos + (paddle.height * x4) && puck.xPos < paddle.xPos
        || puck.yPos > AI.paddle.yPos && puck.yPos < AI.paddle.yPos + (AI.paddle.height * x4) && puck.xPos > AI.paddle.xPos) {
          puck.ySpeed = 2;
          puck.ySpeed *=  -1.2;
      }

      // 5/5
      if (puck.yPos > paddle.yPos + (paddle.height * x4) && puck.yPos < paddle.yPos + (paddle.height) && puck.xPos < paddle.xPos
        || puck.yPos > AI.paddle.yPos && puck.yPos < AI.paddle.yPos + (AI.paddle.height) && puck.xPos > AI.paddle.xPos) {
          puck.ySpeed = 2;
          puck.ySpeed *= 1.5;
          // slow();
      }
    }
  };