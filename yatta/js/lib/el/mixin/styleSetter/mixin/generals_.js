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

    General_.prototype.css = function(prop, val) {
      this._styles[prop] = val;
      return this;
    };

    General_.prototype.addClass = function(c) {
      this.node.classList.add(c);
      return this;
    };

    General_.prototype.removeClass = function(c) {
      this.node.classList.remove(c);
      return this;
    };

    General_.prototype.toggleClass = function(c) {
      this.node.classList.toggle(c);
      return this;
    };

    General_.prototype.setClass = function(c) {
      this.node.className = c;
      return this;
    };

    return General_;

  })();
});
