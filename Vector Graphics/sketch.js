var left = false;
var right = false;
var up = false;
var down = false;

var bullets = [];

var play;

var ANGLE = 0;

function setup() {
  createCanvas(1080, 720);

  x = width/2;
  y = height/2;

  pos = createVector(width/2, height/2);
  vel = createVector(0, 0);

  background(0);


  obj = new object();
  obj.init(createVector(100, 100), createVector(120, 60), createVector(140, 100));

  play = new player(createVector(width/2, height/2));
}

function mouseClicked() {


  bullets.push(new bullet(play.pos.x, play.pos.y, mouseX-play.pos.x, mouseY-play.pos.y, 5));
}

function mouseMoved() {
  play.updateAngle();
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
  background(25);



  if(keyIsDown(LEFT_ARROW) || left) play.vel.x -= 0.5;
  if(keyIsDown(RIGHT_ARROW) || right) play.vel.x += 0.5;
  if(keyIsDown(UP_ARROW) || up) play.vel.y -= 0.5;
  if(keyIsDown(DOWN_ARROW) || down) play.vel.y += 0.5;




  noFill();
  stroke(0, 255, 0);
  strokeWeight(2);



  play.show();

  for(b = bullets.length-1; b > -1; b--) {
    bullets[b].show(b);
  }


  obj.show();

}
