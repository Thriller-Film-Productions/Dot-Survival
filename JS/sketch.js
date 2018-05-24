let player;
let cnv;
let laser;
let interval;
let rateMod = 240;
const bullets = [];
const enemies = [];

function setup() {
  player = new Player();
  if (windowWidth/windowHeight >= 1.5) {
    cnv = createCanvas(windowHeight*1.5, windowHeight);
  } else {
    cnv = createCanvas(windowWidth, windowWidth/1.5);
  }
  laser = new Laser(createVector(player.x, player.y));
}

function draw() {
  if (frameCount % rateMod === 0) {
    enemies.push(new Enemy());
  }
  if (frameCount % (60*15) === 0) {
    rateMod*=0.9;
  }
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
  for (i = enemies.length-1; i >= 0; i--) {
    if (enemies[i].show()) {
      enemies.splice(i, 1);
    }
  }
  if (mouseIsPressed) {
    laser.show();
  }
}

function keyPressed() {
  bullets.push(new Bullet(createVector(player.x, player.y)));
  interval = setInterval(function() {bullets.push(new Bullet(createVector(player.x, player.y)))}, 200);
}

function keyReleased() {
  clearInterval(interval);
}

function windowResized() {
  if (windowWidth/windowHeight >= 1.5) {
    resizeCanvas(windowHeight*1.5, windowHeight);
  } else {
    resizeCanvas(windowWidth, windowWidth/1.5);
  }
}
