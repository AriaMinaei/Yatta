define(['../tools/css', './_tools'], function(css, _tools) {
  var Typography_;

  return Typography_ = (function() {
    function Typography_() {}

    Typography_.prototype.__initMixinTypography = function() {
      this._face = Typography_.defaultFace;
      this._size = Typography_.defaultSize;
      return this._color = Typography_.defaultColor;
    };

    Typography_.prototype._initTypography = function() {
      this.setSize();
      this.setColor();
      return this.setFace();
    };

    Typography_.prototype.setFace = function(face) {
      if (!face) {
        this._face = Typography_.defaultFace;
      } else {
        this._face = face;
      }
      this._applyFace();
      return this;
    };

    Typography_.prototype._applyFace = function() {
      this.node.style.fontFamily = this._face;
      return this;
    };

    Typography_.prototype.setSize = function(size) {
      if (!size) {
        this._size = Typography_.defaultSize;
      } else {
        this._size = size;
      }
      this._applySize();
      return this;
    };

    Typography_.prototype._applySize = function() {
      this.node.style.fontSize = this._size + 'px';
      return this;
    };

    Typography_.prototype.setColor = function(r, g, b) {
      if (arguments.length === 0) {
        this._color = Typography_.defaultColor;
      } else {
        this._color = css.rgb(r, g, b);
      }
      this._applyColor();
      return this;
    };

    Typography_.prototype._applyColor = function() {
      this.node.style.color = this._color;
      this._applyStroke();
      return this;
    };

    Typography_.prototype._applyStroke = function() {
      if (_tools.needsTextStroke()) {
        this.node.style.webkitTextStroke = '1.5 ' + this._color;
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

    return Typography_;

  })();
});
