function bullet(x, y, dX, dY, intensity) {

  this.pos = createVector(x, y);
  this.dX = dX;
  this.dY = dY;
  this.posEnd = createVector(this.pos.x + (this.dX*10), this.pos.y + (this.dY*10));
  this.intensity = intensity;

  if(obj.collideLine(this.pos.x, this.pos.y, this.posEnd.x, this.posEnd.y)) {
    console.log("oof");
  }

  this.show = function(i) {
    stroke(255);
    strokeWeight(this.intensity);



    line(this.pos.x, this.pos.y, this.posEnd.x, this.posEnd.y);

    this.intensity--;

    if(this.intensity < 1) bullets.splice(i, 1);
  }
}
