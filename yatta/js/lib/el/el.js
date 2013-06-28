define(['./mixin/generals_', './mixin/transforms_', './mixin/filters_', './mixin/interactions_', '../utility/object', '../utility/array', './tools/css'], function(Generals_, Transforms_, Filters_, Interactions_, object, array, css) {
  var El;

  implementing(Generals_, Transforms_, Filters_, Interactions_, El = (function() {
    function El(node) {
      var _this = this;

      this.node = node;
      if (this._shouldCloneInnerHTML == null) {
        this._shouldCloneInnerHTML = false;
      }
      this._initTransforms();
      this._initFilters();
      this._initInteractions();
      this._beenAppended = false;
      setTimeout(function() {
        if (!_this._beenAppended) {
          if ((_this.node.parentElement == null) && _this.node.tagName !== 'BODY') {
            return _this.putIn(display);
          } else {
            return _this._beenAppended = true;
          }
        }
      }, 0);
      this._animationEnabled = false;
      this._parent = null;
      this._children = [];
    }

    El.prototype.clone = function() {
      var newEl, newNode,
        _this = this;

      newEl = Object.create(this.constructor.prototype);
      (function() {
        var key, _results;

        _results = [];
        for (key in _this) {
          if (key === 'el' || key === '_beenAppended' || key === '_children' || key === '_parent') {
            continue;
          }
          if (_this.hasOwnProperty(key)) {
            _results.push(newEl[key] = object.clone(_this[key], true));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      })();
      newNode = this.node.cloneNode();
      newEl.node = newNode;
      newEl._children = [];
      (function() {
        var child, _i, _len, _ref, _results;

        if (_this._shouldCloneInnerHTML) {
          return newEl.node.innerHTML = _this.node.innerHTML;
        } else {
          _ref = _this._children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            _results.push(child.clone().putIn(newEl));
          }
          return _results;
        }
      })();
      (function() {
        var parent, _ref, _ref1;

        newEl._parent = null;
        parent = (_ref = (_ref1 = _this.node._parent) != null ? _ref1 : _this.node.parentElement) != null ? _ref : null;
        newEl._beenAppended = false;
        return setTimeout(function() {
          if (!newEl._beenAppended) {
            return newEl.putIn(parent);
          }
        }, 0);
      })();
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
        nextPulse(function() {
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

    El.prototype._notYourChildAnymore = function(el) {
      if (!(el instanceof El)) {
        throw Error("`el` must be an instance of `El`");
      }
      array.pluckItem(this._children, el);
      return this;
    };

    El.prototype.putIn = function(el) {
      if (el == null) {
        el = display;
      }
      if (this._parent != null) {
        this._parent._notYourChildAnymore(this);
      }
      if (el instanceof El) {
        el._append(this);
        this._parent = el;
      } else {
        el.appendChild(this.node);
        this._parent = null;
      }
      this._beenAppended = true;
      return this;
    };

    El.prototype._append = function(el) {
      var node;

      if (el instanceof El) {
        node = el.node;
        this._children.push(el);
      } else {
        node = el;
      }
      this.node.appendChild(node);
      return this;
    };

    El.prototype.remove = function() {
      if (this._parent != null) {
        this._parent._notYourChildAnymore(this);
      }
      if (this.node.parentNode != null) {
        this.node.parentNode.removeChild(this.node);
      }
      return null;
    };

    return El;

  })());
  return El;
});
