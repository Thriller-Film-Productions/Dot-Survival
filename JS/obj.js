const ammo = {
  energy: 0,
  ammo: 10,
  grenades: 0,
  nukes: 0
}

const Player = function () {
  this.x = 230;
  this.y = 128;
  this.r = 1 / 16;
  this.getPos = () => {
    return getPos(this.x, this.y);
  }
  this.show = () => {
    let pos = this.getPos()
    fill(235);
    noStroke();
    ellipse(pos.x, pos.y, this.r * width, this.r * width);
  }
}

const Bullet = function (origin) {
  this.pos = origin;
  this.speed = 5;
  this.size = 1 / 128;
  this.dx = getModelPos(mouseX, mouseY).x - this.pos.x;
  this.dy = getModelPos(mouseX, mouseY).y - this.pos.y;
  this.r = ds = Math.hypot(this.dx, this.dy);
  this.show = function () {
    noStroke();
    fill(235);
    this.pos.x += this.dx / this.r * this.speed;
    this.pos.y += this.dy / this.r * this.speed;
    let pos = getPos(this.pos.x, this.pos.y);
    ellipse(pos.x, pos.y, this.size * width, this.size * width);
    if (!collidePointRect(pos.x, pos.y, 0, 0, width, height)) {
      return "spliceMe";
    }
    for (let enemy of enemies) {
      let thisPos = getPos(this.pos.x, this.pos.y);
      let enPos = getPos(enemy.x, enemy.y);
      rectMode(CENTER);
      if (collidePointRect(thisPos.x, thisPos.y, enPos.x, enPos.y-(width * enemy.w)/2, width * enemy.w, width * enemy.w)) {
        enemy.health -= 8;
        return "spliceMe";
      }
    }
  }
}

const Laser = function (origin) {
  this.pos = origin;
  this.lasering;
  this.show = () => {
    noFill();
    stroke("#ffa0a0");
    strokeWeight(width / 128);
    let pos = getPos(this.pos.x, this.pos.y);
    line(pos.x, pos.y, mouseX, mouseY);
  }
}

const Enemy = function () {
  this.x = 0;
  this.y = round(random(0, 256));
  this.w = 1 / 16;
  this.speed = 0.125;
  this.health = 16;
  this.show = function () {
    let pos = getPos(this.x, this.y);
    let r = Math.atan2(getPos(player.x, player.y).y - pos.y, getPos(player.x, player.y).x - pos.x);
    rectMode(CENTER);
    fill(235);
    rect(pos.x, pos.y, width * this.w, width * this.w);
    this.x += cos(r) * this.speed;
    this.y += sin(r) * this.speed;
    if (laser.lasering && collidePointRect(mouseX, mouseY, pos.x-(width * this.w)/2, pos.y-(width * this.w)/2, width * this.w, width * this.w)) {
      this.health-=0.5;
    }
    if (this.health <= 0) {
      return "spliceMe";
    }
  }
  this.testDead = (x, y, r) => {
    let pos = getPos(this.x, this.y);
    let grenPos = getPos(x, y);
    fill(255, 256, 150, 128);
    noStroke();
    ellipse(grenPos.x, grenPos.y, r, r);
    if (collideRectCircle(pos.x-(width * this.w)/2, pos.y-(width * this.w)/2, width * this.w, width * this.w, grenPos.x, grenPos.y, r, r)) {
      return "spliceMe";
    }
  }
}

const Grenade = function() {
  this.x = 230;
  this.y = 128;
  let pos = getModelPos(mouseX, mouseY);
  this.finalX = pos.x;
  this.finalY = pos.y;
  this.size = 1/64;
  this.show = () => {
    this.x = lerp(this.x, this.finalX, 0.1);
    this.y = lerp(this.y, this.finalY, 0.1);
    let pos = getPos(this.x, this.y);
    ellipse(pos.x, pos.y, width*this.size, width*this.size);
    if (round(this.x/5)*5 == round(this.finalX/5)*5 && round(this.y/5)*5 == round(this.finalY/5)*5) {
      return "spliceMe";
    }
  }
}

const Nuke = function() {
  this.x = 128;
  this.y = 0;
  this.show = () => {
    if (this.x == 128 && !this.y == 128) {
      let pos = getPos(this.x, this.y);
      fill(235);
      ellipse(pos.x, pos.y, width/8, width/4);
      this.y+=8;
    }
  }
}

function getPos(x, y) {
  return createVector(x / 256 * width, y / 256 * height);
}

function getModelPos(x, y) {
  return createVector(x * 256 / width, y * 256 / height);
}
