function enemy(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;

  this.show = function() {
      stroke(255, 0, 0);
      strokeWeight(2);

      ellipse(this.pos.x, this.pos.y, r*2);
  }
}
