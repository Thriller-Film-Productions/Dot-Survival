let player;
let gameRatio;

function setup() {
  createCanvas(windowWidth, windowHeight).position(0, 0);
  player = new Player();
  gameRatio = createVector(width, width/3*2);
}

function draw() {
  background(51);
  player.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gameRatio = createVector(width, width/3*2);
}
