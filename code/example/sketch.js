const sketchWidth = 400;
const sketchHeight = 400;

function setup () {
  createCanvas(sketchWidth, sketchHeight);
}

function draw() {
  noLoop();
  stroke('black');
  circle(200, 200, 50);
  save();
}