define(['./mixin/generals_', './mixin/layout_', './mixin/fill_', './mixin/transforms_', './mixin/filters_', '../../../utility/object'], function(Generals_, Layout_, Fill_, Transforms_, Filters_, object) {
  var StyleSetter;

  return mixing(Generals_, Layout_, Fill_, Transforms_, Filters_, StyleSetter = (function() {
    function StyleSetter(el) {
      this.el = el;
      this.node = this.el.node;
      this._styles = this.node.style;
      this.__initMixins();
    }

    StyleSetter.prototype.clone = function(el) {
      var key, newObj;

      newObj = Object.create(this.constructor.prototype);
      newObj.el = el;
      newObj.node = el.node;
      newObj._styles = el.node.style;
      this.__applyCloners(newObj);
      for (key in this) {
        if (newObj[key] != null) {
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
