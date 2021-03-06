var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var Perspective;

  return Perspective = {
    components: function(d) {
      var p;

      if (d === 0) {
        p = 0;
      } else {
        p = -1 / d;
      }
      return {
        m34: p
      };
    },
    matrix: function(d) {
      var p;

      if (d === 0) {
        p = 0;
      } else {
        p = -1 / d;
      }
      return {
        m11: 1,
        m12: 0,
        m13: 0,
        m14: 0,
        m21: 0,
        m22: 1,
        m23: 0,
        m24: 0,
        m31: 0,
        m32: 0,
        m33: 1,
        m34: p,
        m41: 0,
        m42: 0,
        m43: 0,
        m44: 1
      };
    },
    toPlainCss: function(d) {
      return "perspective(" + d + ") ";
    },
    applyTo: function(b, d) {
      var p;

      if (d === 0) {
        p = 0;
      } else {
        p = -1 / d;
      }
      b[8] = b[8] + p * b[12];
      b[9] = b[9] + p * b[13];
      b[10] = b[10] + p * b[14];
      b[11] = b[11] + p * b[15];
      return b;
    }
  };
});
