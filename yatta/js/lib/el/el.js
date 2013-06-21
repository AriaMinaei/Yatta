define(['../utility/object', './css', '../visuals/lightmatrix', '../visuals/filter', '../tools'], function(object, css, LightMatrix, CSSFilter, tools) {
  var El, body, fn, key, _fn, _fn1, _ref, _ref1;

  body = document.body;
  El = (function() {
    function El(node) {
      var _this = this;

      this.node = node;
      this._transform = new LightMatrix;
      this._cssFilter = new CSSFilter;
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

    El.prototype.enableAnimation = function(duration) {
      if (duration == null) {
        duration = 500;
      }
      duration = parseInt(duration) / 1000;
      css.setTransitionDuration(this.node, duration + 's');
      this._animationEnabled = true;
      return this;
    };

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

    El.prototype.ease = function(func) {
      if (func == null) {
        func = 'ease-out';
      }
      css.setTransitionTimingFunction(this.node, func);
      return this;
    };

    El.prototype.updateTransform = function(withAnim) {
      var _this = this;

      if (withAnim == null) {
        withAnim = false;
      }
      this._do(function() {
        return css.setTransform(_this.node, _this._transform.toPlainCss());
      });
      return this;
    };

    El.prototype.updateCssFilter = function(withAnim) {
      var _this = this;

      if (withAnim == null) {
        withAnim = false;
      }
      this._do(function() {
        return css.setCssFilter(_this.node, _this._cssFilter.toCss());
      });
      return this;
    };

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

    El.prototype.setWidth = function(d) {
      var _this = this;

      this._do(function() {
        return _this.node.style.width = d + 'px';
      });
      return this;
    };

    El.prototype.setHeight = function(d) {
      var _this = this;

      this._do(function() {
        return _this.node.style.height = d + 'px';
      });
      return this;
    };

    El.prototype.go3d = function() {
      css.setTransformStyle(this.node, 'preserve-3d');
      return this;
    };

    El.prototype.setOrigin = function(origin) {
      var _this = this;

      this._do(function() {
        return css.setTransformOrigin(_this.node, origin);
      });
      return this;
    };

    El.prototype.fillWith = function(r, g, b) {
      var args,
        _this = this;

      args = arguments;
      this._do(function() {
        var color;

        if (args.length === 0) {
          color = 'transparent';
        } else if (args.length === 1) {
          color = r;
        } else {
          color = tools.rgb(r, g, b);
        }
        return _this.node.style.background = color;
      });
      return this;
    };

    El.prototype.makeHollow = function() {
      var _this = this;

      this._do(function() {
        return _this.fillWith();
      });
      return this;
    };

    El.prototype.setBorder = function(thickness, r, g, b) {
      var args,
        _this = this;

      args = arguments;
      this._do(function() {
        if (args.length === 0) {
          return _this.node.style.border = 'none';
        } else if (args.length !== 4) {
          throw Error("setBorders() requires either 0 or 4 arguments: thickness, r, g, b");
        } else {
          return _this.node.style.border = thickness + 'px solid ' + tools.rgb(r, g, b);
        }
      });
      return this;
    };

    El.prototype.removeBorder = function() {
      var _this = this;

      return this._do(function() {
        return _this.setBorder();
      });
    };

    return El;

  })();
  _ref = LightMatrix.prototype;
  _fn = function() {
    var _key;

    _key = key;
    El.prototype[_key] = function() {
      this._transform[_key].apply(this._transform, arguments);
      return this.updateTransform();
    };
    return this;
  };
  for (key in _ref) {
    fn = _ref[key];
    if (key[0] === '_' || key === 'temporarily' || key === 'commit' || key === 'rollBack' || key === 'toCss' || key === 'toArray' || key === 'toMatrix') {
      continue;
    }
    _fn();
  }
  _ref1 = CSSFilter.prototype;
  _fn1 = function() {
    var _key;

    _key = key;
    El.prototype[_key] = function() {
      this._cssFilter[_key].apply(this._cssFilter, arguments);
      return this.updateCssFilter();
    };
    return this;
  };
  for (key in _ref1) {
    fn = _ref1[key];
    if (key[0] === '_' || key === 'toCss') {
      continue;
    }
    _fn1();
  }
  return El;
});
