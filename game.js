
class Vec {
  constructor (x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  constructor (w, h) {
    this.pos = new Vec;
    this.size = new Vec (w, h);
  }
}

class Puck extends Rect {
  constructor() {
    super (10, 10);
    this.vel = new Vec;
  }
}

window.onload = function () {
  const canvas = document.getElementById ('gameCanvas');
  const context = canvas.getContext ('2d');

  const puck = new Puck;
  puck.pos.x = canvas.width/2 - puck.pos.x/2;
  puck.pos.y = canvas.height/2 - puck.pos.y/2;


  function update (dt) {
    ball.pos.x =+ ball.vel.x * dt;
    ball.pos.y =+ ball.vel.y * dt;

    // Canvas
    context.fillStyle = '#333';
    context.fillRect (0, 0, canvas.width, canvas.height);

    // Puck
    context.fillStyle = '#fff';
    context.fillRect (puck.pos.x, puck.pos.y, puck.size.x, puck.size.y);

  }
}
