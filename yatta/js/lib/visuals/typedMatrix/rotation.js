var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var Rotation;

  return Rotation = {
    toPlainCss: function(x, y, z) {
      if ((-0.00001 < x && x < 0.00001)) {
        x = 0;
      }
      if ((-0.00001 < y && y < 0.00001)) {
        y = 0;
      }
      if ((-0.00001 < z && z < 0.00001)) {
        z = 0;
      }
      return "rotateX(" + x + "rad) rotateY(" + y + "rad) rotateZ(" + z + "rad) ";
    },
    applyTo: function(b, x, y, z) {
      var a0, a1, a10, a2, a4, a5, a6, a8, a9, b0, b1, b10, b11, b2, b3, b4, b5, b6, b7, b8, b9, cosx, cosy, cosz, sinx, siny, sinz;

      cosx = Math.cos(x);
      sinx = Math.sin(x);
      cosy = Math.cos(y);
      siny = Math.sin(y);
      cosz = Math.cos(z);
      sinz = Math.sin(z);
      a0 = cosy * cosz;
      a1 = cosx * sinz + sinx * siny * cosz;
      a2 = sinx * sinz - cosx * siny * cosz;
      a4 = -cosy * sinz;
      a5 = cosx * cosz - sinx * siny * sinz;
      a6 = sinx * cosz + cosx * siny * sinz;
      a8 = siny;
      a9 = -sinx * cosy;
      a10 = cosx * cosy;
      b0 = b[0];
      b1 = b[1];
      b2 = b[2];
      b3 = b[3];
      b4 = b[4];
      b5 = b[5];
      b6 = b[6];
      b7 = b[7];
      b8 = b[8];
      b9 = b[9];
      b10 = b[10];
      b11 = b[11];
      b[0] = a0 * b0 + a1 * b4 + a2 * b8;
      b[1] = a0 * b1 + a1 * b5 + a2 * b9;
      b[2] = a0 * b2 + a1 * b6 + a2 * b10;
      b[3] = a0 * b3 + a1 * b7 + a2 * b11;
      b[4] = a4 * b0 + a5 * b4 + a6 * b8;
      b[5] = a4 * b1 + a5 * b5 + a6 * b9;
      b[6] = a4 * b2 + a5 * b6 + a6 * b10;
      b[7] = a4 * b3 + a5 * b7 + a6 * b11;
      b[8] = a8 * b0 + a9 * b4 + a10 * b8;
      b[9] = a8 * b1 + a9 * b5 + a10 * b9;
      b[10] = a8 * b2 + a9 * b6 + a10 * b10;
      b[11] = a8 * b3 + a9 * b7 + a10 * b11;
      return b;
    }
  };
});
