function bullet(x, y, a, o, intensity) {

  this.pos = createVector(x, y);
  this.a = a;
  this.o = o;
  this.intensity = intensity;

  this.show = function(i) {
    stroke(255);
    strokeWeight(this.intensity);

    var w;
    if(a < 0) w = 0;
    else w = width;

    var eX = (w-this.pos.x)*a;
    var eY = eX*o;
    // if(eY < 0) eY = 0;
    if (eY >= height) eY = height;

    line(this.pos.x, this.pos.y, this.pos.x + eX, this.pos.y + eY);

    this.intensity--;

    if(this.intensity < 1) bullets.splice(i, 1);
  }
}
