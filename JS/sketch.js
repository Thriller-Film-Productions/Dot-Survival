let player;
let cnv;
const bullets = [];

function setup() {
  player = new Player();
  if (windowWidth/windowHeight >= 1.5) {
    cnv = createCanvas(windowHeight*1.5, windowHeight);
  } else {
    cnv = createCanvas(windowWidth, windowWidth/1.5);
  }
}

function draw() {
  background(51);
  player.show();
  stroke(235);
  strokeWeight(3);
  line(0, 0, 0, height);
  line(0, 0, width, 0);
  line(0, height-2, width-2, height-2);
  line(width-2, 0, width-2, height-2);
  for (i = bullets.length-1; i >= 0; i--) {
    if (bullets[i].show()) {
      bullets.splice(i, 1);
    }
  }
}

function mousePressed() {
  bullets.push(new Bullet(createVector(player.x, player.y)));
}

function windowResized() {
  if (windowWidth/windowHeight >= 1.5) {
    resizeCanvas(windowHeight*1.5, windowHeight);
  } else {
    resizeCanvas(windowWidth, windowWidth/1.5);
  }
}
