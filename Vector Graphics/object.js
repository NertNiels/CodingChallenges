function object(...points) {
  this.points = points;

  this.show = function() {
    strokeWeight(2);
    stroke(0, 255, 0);

    beginShape();
    for(i = 0; i < points.length; i++) {
      vertex(points[i].x, points[i].y);
    }
    endShape(CLOSE);
  }

  this.collideLine = function(x1, y1, x2, y2) {
    for(i = 0; i < points.length; i++) {
      if(i == points.length-1) {
        if(this.lineline(x1, y1, x2, y2, points[i].x, points[i].y, points[0].x, [points[0].y])) return true;
      } else {
        if(this.lineline(x1, y1, x2, y2, points[i].x, points[i].y, points[i+1].x, [points[i+1].y])) return true;
      }
    }
    return false;
  }

  this.lineline = function(x1, y1, x2, y2, x3, y3, x4, y4) {
    var uA = ((x4-x3)*(y1-y3) - (y4-y3)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));
    var uB = ((x2-x1)*(y1-y3) - (y2-y1)*(x1-x3)) / ((y4-y3)*(x2-x1) - (x4-x3)*(y2-y1));

    return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
  }
}
