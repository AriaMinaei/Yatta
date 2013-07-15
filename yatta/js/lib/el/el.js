define(['./mixin/hasStyles_', './mixin/interactions_', '../utility/object', '../utility/array'], function(HasStyles_, Interactions_, object, array) {
  var El;

  return mixing(HasStyles_, Interactions_, El = (function() {
    function El(node, addYattaClass) {
      var _this = this;

      this.node = node;
      if (addYattaClass == null) {
        addYattaClass = true;
      }
      if (this._shouldCloneInnerHTML == null) {
        this._shouldCloneInnerHTML = false;
      }
      El.__initMixinsFor(this);
      if (addYattaClass) {
        this.node.classList.add('yatta-el');
      }
      this._beenAppended = false;
      this._parent = null;
      this._children = [];
      this._group = null;
      this._axis = null;
      frames.nextTick(function() {
        if (!_this._beenAppended) {
          if ((_this.node.parentElement == null) && _this.node.tagName !== 'BODY') {
            return _this.putIn(display);
          } else {
            return _this._beenAppended = true;
          }
        }
      });
    }

    El.prototype.clone = function(newEl) {
      var child, key, newNode, parent, val, _i, _len, _ref, _ref1, _ref2,
        _this = this;

      if (newEl == null) {
        newEl = Object.create(this.constructor.prototype);
      }
      this._doUpdate();
      newNode = this.node.cloneNode();
      newEl.node = newNode;
      newEl._children = [];
      if (this._axis != null) {
        newEl.enableAxis();
      }
      if (this._shouldCloneInnerHTML) {
        newEl.node.innerHTML = this.node.innerHTML;
      } else {
        _ref = this._children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (child === this._axis) {
            continue;
          }
          child.clone().putIn(newEl);
        }
      }
      newEl._parent = null;
      parent = (_ref1 = (_ref2 = this.node._parent) != null ? _ref2 : this.node.parentElement) != null ? _ref1 : null;
      newEl._beenAppended = false;
      frames.laterInThisFrame(function() {
        if (!newEl._beenAppended) {
          newEl.putIn(parent);
        }
      });
      El.__applyClonersFor(this, [newEl]);
      for (key in this) {
        val = this[key];
        if (newEl[key] !== void 0) {
          continue;
        }
        if (this.hasOwnProperty(key)) {
          newEl[key] = object.clone(val, true);
        }
      }
      return newEl;
    };

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

    El.prototype.takeOutOfParent = function() {
      if (this._parent != null) {
        this._parent._notYourChildAnymore(this);
      }
      this._parent = null;
      this._beenAppended = false;
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

    El.prototype.quit = function() {
      var child, p, _i, _len, _ref;

      p = this.node.parentNode;
      if (p != null) {
        p.removeChild(this.node);
      }
      this.disableAxis();
      _ref = this._children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        child.quit();
      }
      El.__applyQuittersFor(this);
    };

    El.prototype.enableAxis = function() {
      this._axis = _Axis.give();
      this._axis.putIn(this);
      this._updateAxis();
      return this;
    };

    El.prototype.disableAxis = function() {
      if (this._axis == null) {
        return this;
      }
      this._axis.takeOutOfParent();
      _Axis.take(this._axis);
      this._axis = null;
      return this;
    };

    El.prototype._updateAxis = function() {
      var dims, origin;

      if (this._axis == null) {
        return;
      }
      origin = this._styleSetter._origin;
      dims = this._styleSetter._dims;
      if (origin.x != null) {
        this._axis.setMovement(origin.x, origin.y, origin.z);
      } else if (dims.width != null) {
        this._axis.setMovement(dims.width / 2, dims.height / 2, 0);
      } else {
        this._axis.setMovement(0, 0, 0);
      }
      return this;
    };

    return El;

  })());
});
