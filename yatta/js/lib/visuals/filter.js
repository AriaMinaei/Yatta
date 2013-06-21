var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(['./filter/blur', './filter/brightness', './filter/contrast', './filter/grayscale', './filter/hueRotate', './filter/invert', './filter/opacity', './filter/saturate', './filter/sepia'], function(blur, brightness, contrast, grayscale, hueRotate, invert, opacity, saturate, sepia) {
  var CSSFilter, filters;

  filters = {
    blur: blur,
    brightness: brightness,
    contrast: contrast,
    grayscale: grayscale,
    hueRotate: hueRotate,
    invert: invert,
    opacity: opacity,
    saturate: saturate,
    sepia: sepia
  };
  return CSSFilter = (function() {
    function CSSFilter() {
      this._filters = {};
    }

    CSSFilter.prototype.setBlur = function(d) {
      this._filters.blur = d;
      return this;
    };

    CSSFilter.prototype.setBrightness = function(d) {
      this._filters.brightness = d;
      return this;
    };

    CSSFilter.prototype.setContrast = function(d) {
      this._filters.contrast = d;
      return this;
    };

    CSSFilter.prototype.setGrayscale = function(d) {
      this._filters.grayscale = d;
      return this;
    };

    CSSFilter.prototype.rotateHue = function(d) {
      this._filters.hueRotate = d;
      return this;
    };

    CSSFilter.prototype.invertColors = function(d) {
      this._filters.invert = d;
      return this;
    };

    CSSFilter.prototype.setOpacity = function(d) {
      this._filters.opacity = d;
      return this;
    };

    CSSFilter.prototype.setSaturation = function(d) {
      this._filters.saturate = d;
      return this;
    };

    CSSFilter.prototype.setSepia = function(d) {
      this._filters.sepia = d;
      return this;
    };

    CSSFilter.prototype.toCss = function() {
      var key, str, value, _ref;

      str = '';
      _ref = this._filters;
      for (key in _ref) {
        value = _ref[key];
        str += filters[key].toCss(value) + ' ';
      }
      return str;
    };

    return CSSFilter;

  })();
});
