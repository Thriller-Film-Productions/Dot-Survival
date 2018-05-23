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
  this.shoot = () => {

  }
}

const bullet = (origin) => {
  this.r = atan2(mouseY - height / 2, mouseX - width / 2);
  this.pos = origin;
  this.speed = 1;
  this.size = 1/64;
  this.show = function() {
    let pos = getPos(pos.x, pos.y);
    this.pos.x+=sin(this.speed);
    this.pos.y+=cos(this.speed);
    ellipse(pos.x, pos.y, this.size*width, this.size*width);
  }
}

function getPos(x, y) {
  return createVector(x/256*width, y/256*height);
}
