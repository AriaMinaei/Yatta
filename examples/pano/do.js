// Generated by CoffeeScript 1.6.2
/*
Don't take this too seriously ;)
*/

var makePanorama, walls;

makePanorama = function(fullWidth, fullHeight, texture, fullCircle, sides) {
  var c, height, i, index, r, sM, walls, width, _i;

  if (fullCircle == null) {
    fullCircle = false;
  }
  if (sides == null) {
    sides = 50;
  }
  width = fullWidth / sides;
  height = fullHeight;
  sM = fullCircle ? 2 : 1;
  r = (fullWidth / PI / sM) - 20;
  walls = new Container;
  for (i = _i = 0; 0 <= sides ? _i <= sides : _i >= sides; i = 0 <= sides ? ++_i : --_i) {
    index = i + 0.5;
    c = new Rectangle(width, height);
    c.rotateY(PI * sM * index / sides);
    c.moveX(r * sin(PI * sM * index / sides));
    c.moveZ(r * cos(PI * sM * index / sides));
    c.putIn(walls);
    c.texturize(texture);
    c.setTexturePosition(-width * i, 0);
  }
  walls.go3d().enableAxis().eachFrame(function(t) {
    if (fullCircle) {
      this.setRotationY(PI * 2 * t / 15000);
    } else {
      this.setRotationY((PI / 2 * backAndForth(t, 15000) / 15000) + param('+', 0.8));
    }
    this.setOrigin(width / 2, param('Origin Y', 0), param('Origin Z', 0));
    this.setRotationX(param('Rotation X', 0.33));
    this.setRotationZ(param('Rotation Z', 0));
    this.setMovementX(display.centerX + param('Movement X', -width / 2));
    this.setMovementY(param('Movement Y', -330));
    this.setMovementZ(param('Movement Z', 0));
    return this.setPerspective(param('Perspective', 1700));
  });
  return walls;
};

walls = makePanorama(7131, 2009, 'img.jpg', false);

(function() {
  var dif, maxHeight, maxWidth, r;

  maxWidth = 1700;
  maxHeight = 1100;
  if (display.width > maxWidth) {
    dif = display.width - maxWidth;
    r = new Rectangle(dif / 2, display.height);
    r.fill.withRgb(0, 0, 0);
    r.z(500);
    r.clone().moveX(display.width - dif / 2);
  }
  if (display.height > maxHeight) {
    dif = display.height - maxHeight;
    r = new Rectangle(display.width, dif / 2);
    r.fill.withRgb(0, 0, 0);
    r.z(500);
    return r.clone().moveY(display.height - dif / 2);
  }
})();
