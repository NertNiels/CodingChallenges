function object() {
  this.angle = 0;

  this.init = function(...points) {
    this.points = points;

    this.pointsRotate = points;
  }

  this.show = function() {
    strokeWeight(2);
    stroke(0, 255, 0);
    fill(255, 0, 0);

    beginShape();
    for(i = 0; i < this.points.length; i++) {
      vertex(this.pointsRotate[i].x, this.pointsRotate[i].y);
    }
    endShape(CLOSE);


  }

  this.collideLine = function(x1, y1, x2, y2) {
    for(i = 0; i < this.points.length; i++) {
      if(i == this.points.length-1) {
        if(this.lineline(x1, y1, x2, y2, this.pointsRotate[i].x, this.pointsRotate[i].y, this.pointsRotate[0].x, [this.pointsRotate[0].y])) return true;
      } else {
        if(this.lineline(x1, y1, x2, y2, this.pointsRotate[i].x, this.pointsRotate[i].y, this.pointsRotate[i+1].x, [this.pointsRotate[i+1].y])) return true;
      }
    }
    return false;
  }

  this.lineline = function(x1, y1, x2, y2, x3, y3, x4, y4) {
    var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
  }

  this.rotate = function(angle) {
    if(this.angle == angle) return;
    this.angle = angle;

    // console.log(this.angle);

    for(i = 0; i < this.points.length; i++) {

      this.pointsRotate[i].x = this.points[i].x*cos(this.angle)-this.points[i].y*sin(this.angle);
      this.pointsRotate[i].y = this.points[i].y*cos(this.angle)+this.points[i].x*sin(this.angle);
    }
  }
}
