let myScatterPlot;

function setup() {
  createCanvas(600, 400);
  let data = [
    { x: 10, y: 20 },
    { x: 30, y: 50 },
    { x: 50, y: 80 },
    { x: 70, y: 40 },
    { x: 90, y: 100 }
  ]; // Example dataset
  myScatterPlot = new ScatterPlot(50, 50, 500, 300, data);
}

function draw() {
  background(255);
  myScatterPlot.draw();
}
class ScatterPlot {
  constructor(x = 50, y = 50, w = 400, h = 300, data = []) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.data = data; // Array of {x, y} points
  }

  draw() {
    // Determine the max values for scaling
    let maxX = max(this.data.map(d => d.x));
    let maxY = max(this.data.map(d => d.y));

    // Draw axes
    stroke(0);
    line(this.x, this.y, this.x, this.y + this.h); // Y-axis
    line(this.x, this.y + this.h, this.x + this.w, this.y + this.h); // X-axis

    // Draw scatter points
    fill(100, 150, 255);
    noStroke();
    for (let point of this.data) {
      let xPos = map(point.x, 0, maxX, this.x, this.x + this.w);
      let yPos = map(point.y, 0, maxY, this.y + this.h, this.y); // Flip y-axis
      ellipse(xPos, yPos, 8, 8); // Draw each point
    }
  }
}
