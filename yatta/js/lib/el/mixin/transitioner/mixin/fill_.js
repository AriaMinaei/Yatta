define(function() {
  var Fill_;

  return Fill_ = (function() {
    function Fill_() {}

    Fill_.prototype.__initMixinFill = function() {
      this._fromFill = {
        opacity: null
      };
      this._toFill = {
        opacity: null
      };
      this._currentFill = this.el._styleSetter._fill;
    };

    Fill_.prototype._adjustFromValuesForFill = function() {
      this._fromFill.opacity = this._currentFill.opacity;
    };

    Fill_.prototype._disableTransitionForFill = function() {
      this._toFill.opacity = this._currentFill.opacity;
      this._needsUpdate.opacity = false;
    };

    Fill_.prototype._updateTransitionForFill = function(progress) {
      if (this._needsUpdate.opacity) {
        this._updateOpacity(progress);
      }
    };

    Fill_.prototype.setOpacity = function(d) {
      this._toFill.opacity = d;
      this._needsUpdate.opacity = true;
      this._update();
      return this;
    };

    Fill_.prototype._updateOpacity = function(progress) {
      this._styleSetter.setOpacity(this._fromFill.opacity + (this._toFill.opacity - this._fromFill.opacity) * progress);
    };

    return Fill_;

  })();
});
