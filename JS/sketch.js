let player;
let cnv;
let laser;
let interval;
let rateMod = 240;
const bullets = [];
const enemies = [];

function setup() {
  player = new Player();
  if (windowWidth / windowHeight >= 1.5) {
    cnv = createCanvas(windowHeight * 1.5, windowHeight);
  } else {
    cnv = createCanvas(windowWidth, windowWidth / 1.5);
  }
  laser = new Laser(createVector(player.x, player.y));
}

function draw() {
  if (frameCount % rateMod === 0) {
    enemies.push(new Enemy());
  }
  if (frameCount % (60 * 15) === 0) {
    rateMod *= 0.9;
    rateMod = ceil(rateMod);
  }
  background(51);
  stroke(235);
  strokeWeight(3);
  line(0, 0, 0, height);
  line(0, 0, width, 0);
  line(0, height - 2, width - 2, height - 2);
  line(width - 2, 0, width - 2, height - 2);
  for (i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].show()) {
      bullets.splice(i, 1);
    }
  }
  for (i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].show()) {
      ammo.ammo+=floor(random(0, 3));
      enemies.splice(i, 1);
      if (floor(random(0, 16)) == 0) {
        ammo.grenades++;
      }
    }
  }
  if (mouseIsPressed && ammo.energy > 0) {
    laser.lasering = true;
    laser.show();
    ammo.energy--;
  } else {
    laser.lasering = false;
  }
  noStroke();
  fill(235);
  text("Energy: " + ammo.energy, 10, 20);
  text("Ammo: " + ammo.ammo, 10, 40);
  text("Grenades: " + ammo.grenades, 10, 60);
  player.show();
}

setInterval(function() {
  ammo.energy++;
}, 125);

function keyPressed() {
  if (ammo.ammo > 0) {
    bullets.push(new Bullet(createVector(player.x, player.y)));
    ammo.energy+=3;
    ammo.ammo--;
  }
  interval = setInterval(function () {
    if (ammo.ammo > 0) {
      ammo.ammo--;
      ammo.energy+=3;
      bullets.push(new Bullet(createVector(player.x, player.y)));
    }
  }, 200);
}

function keyReleased() {
  clearInterval(interval);
}

function windowResized() {
  if (windowWidth / windowHeight >= 1.5) {
    resizeCanvas(windowHeight * 1.5, windowHeight);
  } else {
    resizeCanvas(windowWidth, windowWidth / 1.5);
  }
}
