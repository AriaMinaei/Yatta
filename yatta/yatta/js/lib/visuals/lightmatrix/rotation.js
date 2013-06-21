var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var Rotation;

  return Rotation = {
    components: function(x, y, z) {
      var cosx, cosy, cosz, sinx, siny, sinz;

      cosx = Math.cos(x);
      sinx = Math.sin(x);
      cosy = Math.cos(y);
      siny = Math.sin(y);
      cosz = Math.cos(z);
      sinz = Math.sin(z);
      return {
        m11: cosy * cosz,
        m12: cosx * sinz + sinx * siny * cosz,
        m13: sinx * sinz - cosx * siny * cosz,
        m21: -cosy * sinz,
        m22: cosx * cosz - sinx * siny * sinz,
        m23: sinx * cosz + cosx * siny * sinz,
        m31: siny,
        m32: -sinx * cosy,
        m33: cosx * cosy
      };
    },
    matrix: function(x, y, z) {
      var components;

      components = Rotation.components(x, y, z);
      return {
        m11: components.m11,
        m12: components.m12,
        m13: components.m13,
        m14: 0,
        m21: components.m21,
        m22: components.m22,
        m23: components.m23,
        m24: 0,
        m31: components.m31,
        m32: components.m32,
        m33: components.m33,
        m34: 0,
        m41: 0,
        m42: 0,
        m43: 0,
        m44: 1
      };
    },
    toPlainCss: function(x, y, z) {
      return "rotateX(" + x + "rad) rotateY(" + y + "rad) rotateZ(" + z + "rad) ";
    },
    applyTo: function(b, x, y, z) {
      var am11, am12, am13, am21, am22, am23, am31, am32, am33, bm11, bm12, bm13, bm14, bm21, bm22, bm23, bm24, bm31, bm32, bm33, bm34, cosx, cosy, cosz, sinx, siny, sinz;

      cosx = Math.cos(x);
      sinx = Math.sin(x);
      cosy = Math.cos(y);
      siny = Math.sin(y);
      cosz = Math.cos(z);
      sinz = Math.sin(z);
      am11 = cosy * cosz;
      am12 = cosx * sinz + sinx * siny * cosz;
      am13 = sinx * sinz - cosx * siny * cosz;
      am21 = -cosy * sinz;
      am22 = cosx * cosz - sinx * siny * sinz;
      am23 = sinx * cosz + cosx * siny * sinz;
      am31 = siny;
      am32 = -sinx * cosy;
      am33 = cosx * cosy;
      bm11 = b.m11;
      bm12 = b.m12;
      bm13 = b.m13;
      bm14 = b.m14;
      bm21 = b.m21;
      bm22 = b.m22;
      bm23 = b.m23;
      bm24 = b.m24;
      bm31 = b.m31;
      bm32 = b.m32;
      bm33 = b.m33;
      bm34 = b.m34;
      b.m11 = am11 * bm11 + am12 * bm21 + am13 * bm31;
      b.m12 = am11 * bm12 + am12 * bm22 + am13 * bm32;
      b.m13 = am11 * bm13 + am12 * bm23 + am13 * bm33;
      b.m14 = am11 * bm14 + am12 * bm24 + am13 * bm34;
      b.m21 = am21 * bm11 + am22 * bm21 + am23 * bm31;
      b.m22 = am21 * bm12 + am22 * bm22 + am23 * bm32;
      b.m23 = am21 * bm13 + am22 * bm23 + am23 * bm33;
      b.m24 = am21 * bm14 + am22 * bm24 + am23 * bm34;
      b.m31 = am31 * bm11 + am32 * bm21 + am33 * bm31;
      b.m32 = am31 * bm12 + am32 * bm22 + am33 * bm32;
      b.m33 = am31 * bm13 + am32 * bm23 + am33 * bm33;
      b.m34 = am31 * bm14 + am32 * bm24 + am33 * bm34;
      return b;
    }
  };
});
