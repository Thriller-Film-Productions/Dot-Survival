const ammo = {
  energy:0,
  ammo:10,
  grenades:0,
  nukes:0
}

const Player = function() {
  this.x = 230;
  this.y = 128;
  this.r = 1/16;
  this.getPos = () => {
    return getPos(this.x, this.y);
  }
  this.show = () => {
    let pos = this.getPos()
    fill(235);
    noStroke();
    ellipse(pos.x, pos.y, this.r*width, this.r*width);
  }
}

const Bullet = function(origin) {
  this.r = Math.atan2(mouseY - getPos(player.x, player.y).y, mouseX - getPos(player.x, player.y).x);
  this.pos = origin;
  this.speed = 5;
  this.size = 1/128;
  this.show = function() {
    noStroke();
    fill(235);
    let pos = getPos(this.pos.x, this.pos.y);
    this.pos.x+=cos(this.r)*this.speed;
    this.pos.y+=sin(this.r)*this.speed;
    ellipse(pos.x, pos.y, this.size*width, this.size*width);
    if (!collidePointRect(pos.x, pos.y, 0, 0, width, height)) {
      return "spliceMe";
    }
  }
}

const Laser = function(origin) {
  this.pos = origin;
  this.show = () => {
    noFill();
    stroke(235);
    strokeWeight(width/128);
    let pos = getPos(this.pos.x, this.pos.y);
    line(pos.x, pos.y, mouseX, mouseY);
  }
}

const Enemy = function() {
  this.x = 0;
  this.y = round(random(0, 256));
  this.w = 1/16;
  this.speed = 0.125;
  this.show = function() {
    let pos = getPos(this.x, this.y);
    let r = Math.atan2(getPos(player.x, player.y).y - pos.y, getPos(player.x, player.y).x - pos.x);
    rectMode(CENTER);
    fill(235);
    rect(pos.x, pos.y, width*this.w, width*this.w);
    this.x+=cos(r)*this.speed;
    this.y+=sin(r)*this.speed;
  }
}

function getPos(x, y) {
  return createVector(x/256*width, y/256*height);
}
