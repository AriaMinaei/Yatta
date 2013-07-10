var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var Perspective;

  return Perspective = {
    components: function(d) {
      var p;

      if ((-0.00001 < d && d < 0.00001)) {
        d = 0;
      }
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
      b.m31 = b.m31 + p * b.m41;
      b.m32 = b.m32 + p * b.m42;
      b.m33 = b.m33 + p * b.m43;
      b.m34 = b.m34 + p * b.m44;
      return b;
    }
  };
});
