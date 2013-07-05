define(['../../../tools/css'], function(css) {
  var General_;

  return General_ = (function() {
    function General_() {}

    General_.prototype.__initMixinGeneral = function() {};

    General_.prototype.setOrigin = function(origin) {
      css.setTransformOrigin(this.node, origin);
      return this;
    };

    General_.prototype.z = function(i) {
      this.node.style.zIndex = i;
      return this;
    };

    return General_;

  })();
});
