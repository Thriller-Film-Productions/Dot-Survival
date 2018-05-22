const ammo = {
  energy:0,
  ammo:10,
  grenades:0,
  nukes:0
}

const Player = function() {
  this.x = 0;
  this.y = 0;
  this.r = 1/16;
  this.getPos = () => {
    return getPos(this.x, this.y);
  }
  this.show = () => {
    pos = this.getPos()
    fill(235);
    noStroke();
    ellipse(pos.x, pos.y, this.r*width, this.r*width);
  }
}

function getPos(x, y) {
  return createVector(x/256*gameRatio.x, y/256*gameRatio.y+((height-gameRatio.y)/2));
}
