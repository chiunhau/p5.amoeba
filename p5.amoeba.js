/*
* @param {Number} x x-coordinate for the ellipse
* @param {Number} y y-coordinate for the ellipse
* @param {Array of number} vertices all segments of the ellipse, arrange in this way [x1, y1, x2, y2, ...xn, yn]
*/
p5.prototype.amoeba = function(x, y, ctrl, vertices) {
  var segments = [];
  for(var i = 0; i < vertices.length; i += 2) {
    segments.push(new p5.Vector(vertices[i] - x, vertices[i + 1] - y));
  }
  segments.push(new p5.Vector(vertices[0] - x, vertices[1] - y));
  push();
  translate(x, y);
  beginShape();
  vertex(segments[0].x, segments[0].y);

  for(var i = 0; i < segments.length - 1; i ++) {
    var firstAngle =  segments[i].heading();
    var secondAngle = segments[i + 1].heading();
  
    drawBezierV(
      segments[i].x + ctrl * Math.sin(firstAngle),
      segments[i].y - ctrl * Math.cos(firstAngle),
      segments[i + 1].x - ctrl * Math.sin(secondAngle),
      segments[i + 1].y + ctrl * Math.cos(secondAngle),
      segments[i + 1].x,
      segments[i + 1].y
    );
  }

  endShape();
  pop();
};

// extends the original bezierVertex(), for visualize and debig purpose
function drawBezierV(x1, y1, x2, y2, x3, y3) {
  bezierVertex(x1, y1, x2, y2, x3, y3);
  // fill('#4aff2e'); //marks two control point with light green
  // ellipse(x1, y1, 5, 5);
  // ellipse(x2, y2, 5, 5);
  // fill('#ff2e2e'); // red
  // rectMode(CENTER); //marks anchor point with red
  // rect(x3, y3, 8, 8);
}