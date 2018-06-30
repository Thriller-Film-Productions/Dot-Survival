let player;
let cnv;
let laser;
let interval;
let rateMod = 240;
let fallout = 0;
let nuke;
let over = false;
const particles = [];
const bullets = [];
const enemies = [];
const grenades = [];
const sounds = {}

function setup() {
  player = new Player();
  if (windowWidth / windowHeight >= 1.5) {
    cnv = createCanvas(windowHeight * 1.5, windowHeight);
  } else {
    cnv = createCanvas(windowWidth, windowWidth / 1.5);
  }
  laser = new Laser(createVector(player.x, player.y));
  sounds.ExplosionSmall = loadSound("assets/explosion small.ogg");
  sounds.Grenade = loadSound("assets/grenade.ogg");
  sounds.Nuke = loadSound("assets/nuke.ogg");
}

function draw() {
  frameRate(60);
  if (frameCount % rateMod === 0) {
    enemies.push(new Enemy());
  }
  if (frameCount % (60 * 15) === 0) {
    rateMod *= 0.9;
    rateMod = ceil(rateMod);
  }
  while (particles.length < fallout * 100) {
    particles.push(new Fallout());
  }
  background(51, 128);
  stroke(235);
  strokeWeight(3);
  line(0, 0, 0, height);
  line(0, 0, width, 0);
  line(0, height - 2, width - 2, height - 2);
  line(width - 2, 0, width - 2, height - 2);
  if (fallout > 0) {
    fallout -= 0.0001;
  } else {
    fallout = 0;
  }
  for (i = bullets.length - 1; i >= 0; i--) {
    if (bullets[i].show()) {
      bullets.splice(i, 1);
    }
  }
  for (i = enemies.length - 1; i >= 0; i--) {
    if (enemies[i].show()) {
      ammo.ammo += random([0, 1, 2]);
      enemies.splice(i, 1);
      if (floor(random(0, 64)) == 0) {
        ammo.grenades++;
      }
      if (floor(random(0, 512)) == 15) {
        ammo.nukes++;
      }
    }
  }
  for (i = grenades.length - 1; i >= 0; i--) {
    if (grenades[i].show()) {
      for (j = enemies.length - 1; j >= 0; j--) {
        let a = enemies[j].testDead(grenades[i].finalX, grenades[i].finalY, width / 4);
        if (a) {
          ammo.ammo += floor(random(0, 3));
          enemies.splice(j, 1);
        }
      }
      grenades.splice(i, 1);
    }
  }
  if (mouseIsPressed && ammo.energy > 0) {
    laser.plasering = laser.lasering;
    laser.lasering = true;
    laser.show();
    ammo.energy--;
  } else {
    laser.osc.stop();
    laser.plasering = laser.lasering;
    laser.lasering = false;
  }
  if (laser.lasering == true && laser.plasering == false) {
    laser.osc.start();
  }
  player.show();
  if (nuke != undefined) {
    nuke.show();
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    if (particles[i].show()) {
      particles.splice(i, 1);
    }
  }
  noStroke();
  fill(150, 255, 150);
  text("Energy: " + ammo.energy, 10, 20);
  text("Ammo: " + ammo.ammo, 10, 40);
  text("Grenades: " + ammo.grenades, 10, 60);
  text("Nukes: " + ammo.nukes, 10, 80);
  if (over) {
    gameOver();
  }
}

setInterval(function () {
  ammo.energy++;
}, 125);

function keyPressed() {
  if (keyCode == 32) {
    if (ammo.ammo > 0) {
      bullets.push(new Bullet(createVector(player.x, player.y)));
      ammo.energy += 3;
      ammo.ammo--;
    }
    interval = setInterval(function () {
      if (ammo.ammo > 0) {
        ammo.ammo--;
        ammo.energy += 3;
        bullets.push(new Bullet(createVector(player.x, player.y)));
      }
    }, 200);
  } else if (keyCode == 81 && ammo.grenades > 0) {
    grenades.push(new Grenade());
    ammo.grenades--;
  } else if (keyCode == 87 && ammo.nukes > 0) {
    nuke = new Nuke();
    ammo.nukes--;
  }
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

function enableCheats() {
  ammo.ammo = Infinity;
  ammo.energy = Infinity;
  ammo.grenades = Infinity;
  ammo.nukes = Infinity;
}

function gameOver() {
  noLoop();
  background(51);
  noStroke();
  fill(235);
  textAlign(CENTER, CENTER);
  textSize(width / (45 / 4));
  text("GAME OVER", width / 2, height / 2);
}
