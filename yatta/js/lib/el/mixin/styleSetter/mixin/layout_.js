define(function() {
  var Layout_;

  return Layout_ = (function() {
    function Layout_() {}

    Layout_.prototype.__initMixinLayout = function() {
      return this._dims = {
        width: null,
        height: null
      };
    };

    Layout_.prototype.setWidth = function(w) {
      this._dims.width = w;
      this._styles.width = w + 'px';
      this.el._updateAxis();
      return this;
    };

    Layout_.prototype.setHeight = function(h) {
      this._dims.height = h;
      this._styles.height = h + 'px';
      this.el._updateAxis();
      return this;
    };

    return Layout_;

  })();
});
