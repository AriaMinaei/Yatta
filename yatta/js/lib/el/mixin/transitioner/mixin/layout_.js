define(function() {
  var Layout_;

  return Layout_ = (function() {
    function Layout_() {}

    Layout_.prototype.__initMixinLayout = function() {
      this._dimsFrom = {
        width: null,
        height: null
      };
      return this._dimsTo = {
        width: null,
        height: null
      };
    };

    Layout_.prototype.setWidth = function(w) {
      this._dimsTo.width = w;
      this._dimsFrom.width = this._styleSetter._dims.width;
      this._addUpdater('_updateWidth');
      return this;
    };

    Layout_.prototype._updateWidth = function(progress) {
      return this._styleSetter.setWidth(this._dimsFrom.width + ((this._dimsTo.width - this._dimsFrom.width) * progress));
    };

    Layout_.prototype.setHeight = function(h) {
      this._dimsTo.height = h;
      this._dimsFrom.height = this._styleSetter._dims.height;
      this._addUpdater('_updateHeight');
      return this;
    };

    Layout_.prototype._updateHeight = function(progress) {
      return this._styleSetter.setHeight(this._dimsFrom.height + ((this._dimsTo.height - this._dimsFrom.width) * progress));
    };

    return Layout_;

  })();
});
