define(['../../../tools/css', '../tools/colorHolder'], function(css, ColorHolder) {
  var Fill_;

  return Fill_ = (function() {
    function Fill_() {}

    Fill_.prototype.__initMixinFill = function() {
      this.fill = new ColorHolder(this._getFillUpdater());
      return this._fill = {
        bgColor: 'none',
        color: 'inherit',
        border: 'none',
        opacity: 1
      };
    };

    Fill_.prototype.__clonerForFill = function(newStyleSetter) {
      newStyleSetter.fill = this.fill.clone(newStyleSetter._getFillUpdater());
    };

    Fill_.prototype._getFillUpdater = function() {
      var _this = this;

      return function() {
        _this._updateFill();
      };
    };

    Fill_.prototype._updateFill = function() {
      this._styles.backgroundColor = this._fill.bgColor = this.fill._color.toCss();
      return this;
    };

    Fill_.prototype.fillWithColor = function(r, g, b) {
      this._fill.bgColor.fromRgb(r, g, b);
      this._styles.backgroundColor = this._fill.bgColor.toCss();
      return null;
    };

    Fill_.prototype.fillWithHslColor = function(h, s, l) {
      this._fill.bgColor.fromHsl(h, s, l);
      return this._styles.backgroundColor = this._fill.bgColor.toCss();
    };

    Fill_.prototype.rotateFillHue = function(amount) {
      this._fill.bgColor.rotateHue(amount);
      return this._styles.backgroundColor = this._fill.bgColor.toCss();
    };

    Fill_.prototype.setTextColor = function(r, g, b) {
      this._styles.color = this._fill.color = css.rgb(r, g, b);
      return null;
    };

    Fill_.prototype.makeHollow = function() {
      return this._styles.color = this._fill.color = 'transparent';
    };

    Fill_.prototype.setBorder = function(thickness, r, g, b) {
      if (thickness == null) {
        this._styles.border = this._fill.border = 'none';
      } else {
        this._styles.border = this._fill.border = "" + thickness + "px solid " + (css.rgb(r, g, b));
      }
      return this;
    };

    Fill_.prototype.removeBorder = function() {
      this._styles.border = this._fill.border = 'none';
      return this;
    };

    Fill_.prototype.setOpacity = function(d) {
      this._styles.opacity = this._fill.opacity = d;
      return this;
    };

    Fill_.prototype.adjustOpacity = function(d) {
      this._fill.opacity += d;
      this._styles.opacity = this._fill.opacity;
      return this;
    };

    return Fill_;

  })();
});
