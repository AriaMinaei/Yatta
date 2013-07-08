define(['../../../tools/css'], function(css) {
  var Typography_;

  return Typography_ = (function() {
    function Typography_() {}

    Typography_.prototype.__initMixinTypography = function() {
      this._type = {
        face: Typography_.defaultFace,
        size: Typography_.defaultSize,
        color: Typography_.defaultColor
      };
      this._sizeSet = false;
    };

    Typography_.prototype._getSize = function() {
      if (!this._sizeSet) {
        this._type.size = parseFloat(getComputedStyle(this.node).fontSize);
        this._sizeSet = true;
      }
      return this._type.size;
    };

    Typography_.prototype._initTypography = function() {
      this.setSize();
      this.setFace();
      return this.setColor();
    };

    Typography_.prototype.setFace = function(face) {
      if (!face) {
        this._type.face = Typography_.defaultFace;
      } else {
        this._type.face = face;
      }
      this._applyFace();
      return this;
    };

    Typography_.prototype._applyFace = function() {
      this._styles.fontFamily = this._type.face;
      return this;
    };

    Typography_.prototype.setSize = function(size) {
      if (!size) {
        this._type.size = Typography_.defaultSize;
      } else {
        this._type.size = size;
      }
      this._applySize();
      return this;
    };

    Typography_.prototype._applySize = function() {
      this._styles.fontSize = this._type.size + 'px';
      return this;
    };

    Typography_.prototype.setColor = function(r, g, b) {
      if (arguments.length === 0) {
        this._type.color = Typography_.defaultColor;
      } else {
        this._type.color = css.rgb(r, g, b);
      }
      this._applyColor();
      return this;
    };

    Typography_.prototype._applyColor = function() {
      this._styles.color = this._type.color;
      this._applyStroke();
      return this;
    };

    Typography_.prototype._applyStroke = function() {
      if (Typography_.needsTextStroke() && this._getSize() < 50) {
        this._styles.webkitTextStroke = '1.5 ' + this._type.color;
      }
      return this;
    };

    Typography_.defaultFace = '"HelveticaNeueLT Std Thin"';

    Typography_.setDefaultFace = function(face) {
      if (face == null) {
        face = "HelveticaNeueLT Std Thin";
      }
      return this.defaultFace = face;
    };

    Typography_.defaultSize = 36;

    Typography_.setDefaultSize = function(size) {
      if (size == null) {
        size = 36;
      }
      return this.defaultSize = size;
    };

    Typography_.defaultColor = css.rgb(255, 255, 255);

    Typography_.setDefaultColor = function(r, g, b) {
      if (arguments.length === 0) {
        this.defaultColor = css.rgb(255, 255, 255);
      }
      return this.defaultColor = css.rgb(r, g, b);
    };

    Typography_.needsTextStroke = (function() {
      var _needsTextStroke;

      _needsTextStroke = null;
      return function() {
        if (_needsTextStroke === null) {
          if (navigator.appVersion.indexOf('Chrome') !== -1 && navigator.appVersion.indexOf('Windows') !== -1) {
            _needsTextStroke = true;
          } else {
            _needsTextStroke = false;
          }
        }
        return _needsTextStroke;
      };
    })();

    return Typography_;

  })();
});
