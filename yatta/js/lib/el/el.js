define(['./mixin/hasStyles_', './mixin/interactions_', '../utility/object', '../utility/array'], function(HasStyles_, Interactions_, object, array) {
  var El;

  mixing(HasStyles_, Interactions_, El = (function() {
    function El(node) {
      var _this = this;

      this.node = node;
      if (this._shouldCloneInnerHTML == null) {
        this._shouldCloneInnerHTML = false;
      }
      this.__initMixins();
      this._beenAppended = false;
      this._parent = null;
      this._children = [];
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

    El.prototype.clone = function() {
      var child, key, newEl, newNode, parent, _i, _len, _ref, _ref1, _ref2,
        _this = this;

      newEl = Object.create(this.constructor.prototype);
      newNode = this.node.cloneNode();
      newEl.node = newNode;
      newEl._children = [];
      if (this._shouldCloneInnerHTML) {
        newEl.node.innerHTML = this.node.innerHTML;
      } else {
        _ref = this._children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
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
      this.__applyCloners(newEl);
      for (key in this) {
        if (newEl[key] != null) {
          continue;
        }
        if (this.hasOwnProperty(key)) {
          newEl[key] = object.clone(this[key], true);
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
