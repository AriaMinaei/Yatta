define(['./mixin/generals_', './mixin/layout_', './mixin/fill_', './mixin/typography_', './mixin/transforms_', './mixin/filters_', '../../../utility/object'], function(Generals_, Layout_, Fill_, Typography_, Transforms_, Filters_, object) {
  var StyleSetter;

  return mixing(Generals_, Layout_, Fill_, Typography_, Transforms_, Filters_, StyleSetter = (function() {
    function StyleSetter(el) {
      this.el = el;
      this.node = this.el.node;
      this._styles = this.node.style;
      StyleSetter.__initMixinsFor(this);
    }

    StyleSetter.prototype._scheduleUpdate = function() {
      return this.el._scheduleUpdate();
    };

    StyleSetter.prototype.clone = function(el) {
      var key, newObj;

      newObj = Object.create(this.constructor.prototype);
      newObj.el = el;
      newObj.node = el.node;
      newObj._styles = el.node.style;
      StyleSetter.__applyClonersFor(this, [newObj]);
      for (key in this) {
        if (newObj[key] !== void 0) {
          continue;
        }
        if (this.hasOwnProperty(key)) {
          newObj[key] = object.clone(this[key], true);
        }
      }
      return newObj;
    };

    return StyleSetter;

  })());
});
