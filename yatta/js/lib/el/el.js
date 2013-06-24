define(['../utility/object', './css', '../tools', './_el/__generals', './_el/__transforms', './_el/__filters', './_el/__interactions', '../utility/generals'], function(object, css, tools, __Generals, __Transforms, __Filters, __Interactions) {
  var El, body;

  body = document.body;
  return implementing(__Generals, __Transforms, __Filters, __Interactions, El = (function() {
    function El(node) {
      var _this = this;

      this.node = node;
      this._initTransforms();
      this._initFilters();
      this._initInteractions();
      this._beenAppended = false;
      setTimeout(function() {
        if (!_this._beenAppended) {
          return _this.putIn(body);
        }
      }, 0);
      this._animationEnabled = false;
    }

    El.prototype.clone = function() {
      var key, newEl, newNode, parent,
        _this = this;

      newEl = Object.create(this.constructor.prototype);
      for (key in this) {
        if (key === 'el' || key === '_beenAppended') {
          continue;
        }
        if (this.hasOwnProperty(key)) {
          newEl[key] = object.clone(this[key], true);
        }
      }
      newNode = this.node.cloneNode();
      newNode.innerHTML = this.node.innerHTML;
      parent = this.node.parentElement;
      newEl.node = newNode;
      newEl._beenAppended = false;
      setTimeout(function() {
        if (!newEl._beenAppended) {
          return newEl.putIn(parent);
        }
      }, 0);
      return newEl;
    };

    El.prototype.enableAnimation = acceptLazyArgs(function(duration) {
      if (duration == null) {
        duration = 500;
      }
      duration = parseInt(duration) / 1000;
      css.setTransitionDuration(this.node, duration + 's');
      this._animationEnabled = true;
      return this;
    });

    El.prototype._do = function(fn) {
      var _this = this;

      if (!this._animationEnabled) {
        fn.apply(this);
      } else {
        tools.nextTick(function() {
          return fn.apply(_this);
        });
      }
      return this;
    };

    El.prototype.ease = acceptLazyArgs(function(func) {
      if (func == null) {
        func = 'ease-out';
      }
      css.setTransitionTimingFunction(this.node, func);
      return this;
    });

    El.prototype.putIn = function(el) {
      if (el == null) {
        el = body;
      }
      if (el instanceof El) {
        el = el.node;
      }
      this._beenAppended = true;
      el.appendChild(this.node);
      return this;
    };

    return El;

  })());
});
