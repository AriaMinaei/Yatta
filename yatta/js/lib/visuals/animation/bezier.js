var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  /*
   * Source: http://stackoverflow.com/a/11697909/607997
   * http://codepen.io/onedayitwillmake/details/EHDmw
   * by Mario Gonzalez
  */

  /*
   * Solver for cubic bezier curve with implicit control points at (0,0) and (1.0, 1.0)
  */

  var UnitBezier;

  return UnitBezier = (function() {
    function UnitBezier(p1x, p1y, p2x, p2y) {
      this.cx = 3.0 * p1x;
      this.bx = 3.0 * (p2x - p1x) - this.cx;
      this.ax = 1.0 - this.cx - this.bx;
      this.cy = 3.0 * p1y;
      this.by = 3.0 * (p2y - p1y) - this.cy;
      this.ay = 1.0 - this.cy - this.by;
    }

    UnitBezier.epsilon = 1e-6;

    UnitBezier.prototype.sampleCurveX = function(t) {
      return ((this.ax * t + this.bx) * t + this.cx) * t;
    };

    UnitBezier.prototype.sampleCurveY = function(t) {
      return ((this.ay * t + this.by) * t + this.cy) * t;
    };

    UnitBezier.prototype.sampleCurveDerivativeX = function(t) {
      return (3.0 * this.ax * t + 2.0 * this.bx) * t + this.cx;
    };

    UnitBezier.prototype.solveCurveX = function(x, epsilon) {
      var d2, i, t0, t1, t2, x2;

      t0 = void 0;
      t1 = void 0;
      t2 = void 0;
      x2 = void 0;
      d2 = void 0;
      i = void 0;
      t2 = x;
      i = 0;
      while (i < 8) {
        x2 = this.sampleCurveX(t2) - x;
        if (Math.abs(x2) < epsilon) {
          return t2;
        }
        d2 = this.sampleCurveDerivativeX(t2);
        if (Math.abs(d2) < epsilon) {
          break;
        }
        t2 = t2 - x2 / d2;
        i++;
      }
      t0 = 0.0;
      t1 = 1.0;
      t2 = x;
      if (t2 < t0) {
        return t0;
      }
      if (t2 > t1) {
        return t1;
      }
      while (t0 < t1) {
        x2 = this.sampleCurveX(t2);
        if (Math.abs(x2 - x) < epsilon) {
          return t2;
        }
        if (x > x2) {
          t0 = t2;
        } else {
          t1 = t2;
        }
        t2 = (t1 - t0) * .5 + t0;
      }
      return t2;
    };

    UnitBezier.prototype.solve = function(x, epsilon) {
      return this.sampleCurveY(this.solveCurveX(x, epsilon));
    };

    return UnitBezier;

  })();
});
