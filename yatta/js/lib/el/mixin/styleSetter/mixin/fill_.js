define(['../../../tools/css'], function(css) {
  var Fill_;

  return Fill_ = (function() {
    function Fill_() {}

    Fill_.prototype.__initMixinFill = function() {
      return this._fill = {
        bgColor: null,
        color: null,
        border: 'none',
        opacity: 1
      };
    };

    Fill_.prototype.fillWithColor = function(r, g, b) {
      this._styles.backgroundColor = this._fill.bgColor = css.rgb(r, g, b);
      return null;
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

    return Fill_;

  })();
});
