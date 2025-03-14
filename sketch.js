class ScatterPlot {
  constructor(x = 50, y = 50, w = 400, h = 300) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.data = []; // Store points as {x, y}
  }

  // Add new data point
  addData(xVal, yVal) {
    this.data.push({ x: xVal, y: yVal });
  }

  // Get max values dynamically for scaling
  getMaxValues() {
    let maxX = this.data.length > 0 ? max(this.data.map(d => d.x)) : 1;
    let maxY = this.data.length > 0 ? max(this.data.map(d => d.y)) : 1;
    return { maxX, maxY };
  }

  draw() {
    if (this.data.length === 0) return;

    let { maxX, maxY } = this.getMaxValues(); // Get dynamic scaling

    // Draw axes
    stroke(0);
    line(this.x, this.y, this.x, this.y + this.h); // Y-axis
    line(this.x, this.y + this.h, this.x + this.w, this.y + this.h); // X-axis

    // Labels
    textSize(12);
    fill(0);
    textAlign(CENTER, BOTTOM);
    text("X-Axis", this.x + this.w / 2, this.y + this.h + 30);
    textAlign(RIGHT, CENTER);
    text("Y-Axis", this.x - 10, this.y + this.h / 2);

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

// Global scatter plot instance
let myScatterPlot;

function setup() {
  createCanvas(600, 400);
  myScatterPlot = new ScatterPlot(50, 50, 500, 300);

  // Generate 10 random data points
  for (let i = 0; i < 10; i++) {
    let randomX = random(0, 100); // Random X values between 0 and 100
    let randomY = random(0, 100); // Random Y values between 0 and 100
    myScatterPlot.addData(randomX, randomY);
  }
}

function draw() {
  background(255);
  myScatterPlot.draw();
}
