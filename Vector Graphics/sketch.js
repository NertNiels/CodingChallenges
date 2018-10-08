var pos;
var vel;

var left = false;
var right = false;
var up = false;
var down = false;

var bullets = [];

var e;

function setup() {
  createCanvas(1080, 720);

  x = width/2;
  y = height/2;

  pos = createVector(width/2, height/2);
  vel = createVector(0, 0);

  background(0);

  e = new enemy(200, 200, 20);

}

function mouseClicked() {


  bullets.push(new bullet(pos.x, pos.y, mouseX-pos.x, mouseY-pos.y, 5));
}

function keyPressed() {
  if(key == 'a') left = true;
  else if(key == 'd') right = true;
  else if(key == 'w') up = true;
  else if(key == 's') down = true;
}

function keyReleased() {
  if(key == 'a') left = false;
  else if(key == 'd') right = false;
  else if(key == 'w') up = false;
  else if(key == 's') down = false;
}

function draw() {
  background(0, 100);



  if(keyIsDown(LEFT_ARROW) || left) vel.x -= 0.5;
  if(keyIsDown(RIGHT_ARROW) || right) vel.x += 0.5;
  if(keyIsDown(UP_ARROW) || up) vel.y -= 0.5;
  if(keyIsDown(DOWN_ARROW) || down) vel.y += 0.5;

  if(vel.x < -5) vel.x = -5;
  else if(vel.x > 5) vel.x = 5;
  if(vel.y < -5) vel.y = -5;
  else if(vel.y > 5) vel.y = 5;

  pos.add(vel);

  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);

  push()
  translate(pos.x, pos.y);

  var angle = atan((mouseY-pos.y)/(mouseX-pos.x));
  if(mouseX < pos.x) angle += PI;
  rotate(angle);

  triangle(-10, -10, -10, 10, 20, 0);
  pop();

  for(b = bullets.length-1; b > -1; b--) {
    bullets[b].show(b);
  }

  e.show();

  vel.mult(0.95);

}
