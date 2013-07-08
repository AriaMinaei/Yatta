define(function() {
  var CSSColor;

  return CSSColor = (function() {
    function CSSColor(h, s, l) {
      this.h = h;
      this.s = s;
      this.l = l;
    }

    CSSColor.prototype.setHue = function(deg) {
      this.h = deg / 360;
      return this;
    };

    CSSColor.prototype.rotateHue = function(deg) {
      deg /= 360;
      this.h = this.h + deg;
      return this;
    };

    CSSColor.prototype.setSaturation = function(amount) {
      this.s = amount / 100;
      return this;
    };

    CSSColor.prototype.saturate = function(amount) {
      this.s += amount / 100;
      return this;
    };

    CSSColor.prototype.setLightness = function(amount) {
      this.l = amount / 100;
      return this;
    };

    CSSColor.prototype.lighten = function(amount) {
      this.l += amount / 100;
      return this;
    };

    CSSColor.prototype.toCss = function() {
      var h, l, s;

      h = Math.round(this.h * 360);
      s = Math.round(this.s * 100);
      l = Math.round(this.l * 100);
      return "hsl(" + h + ", " + s + "%, " + l + "%)";
    };

    CSSColor.prototype.fromHsl = function(h, s, l) {
      this.h = h / 360;
      this.s = s / 100;
      this.l = l / 100;
      return this;
    };

    CSSColor.prototype.toRgb = function() {
      var b, g, p, q, r;

      r = 0;
      g = 0;
      b = 0;
      if (this.s === 0) {
        r = g = b = this.l;
      } else {
        q = (this.l < 0.5 ? this.l * (1 + this.s) : this.l + this.s - this.l * this.s);
        p = 2 * this.l - q;
        r = CSSColor._hue2rgb(p, q, this.h + 1 / 3);
        g = CSSColor._hue2rgb(p, q, this.h);
        b = CSSColor._hue2rgb(p, q, this.h - 1 / 3);
      }
      return [r * 255, g * 255, b * 255];
    };

    CSSColor.prototype.fromRgb = function(r, g, b) {
      var d, h, l, max, min, s;

      r /= 255;
      g /= 255;
      b /= 255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      h = 0;
      s = 0;
      l = (max + min) / 2;
      if (max !== min) {
        d = max - min;
        s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
        }
        h /= 6;
      }
      this.h = h;
      this.s = s;
      this.l = l;
      return this;
    };

    CSSColor.prototype.clone = function() {
      return new CSSColor(this.h, this.s, this.l);
    };

    CSSColor.hsl = function(h, s, l) {
      return new CSSColor(h, s, l);
    };

    CSSColor.rgb = function(r, g, b) {
      var d, h, l, max, min, s;

      r /= 255;
      g /= 255;
      b /= 255;
      max = Math.max(r, g, b);
      min = Math.min(r, g, b);
      h = 0;
      s = 0;
      l = (max + min) / 2;
      if (max !== min) {
        d = max - min;
        s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
        }
        h /= 6;
      }
      return new CSSColor(h, s, l);
    };

    CSSColor._hue2rgb = function(p, q, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    };

    return CSSColor;

  })();
});
