define(['./styleSetter/styleSetter', './transitioner/transitioner'], function(StyleSetter, Transitioner) {
  var ClassPrototype, HasStyles_, method, methodName, _fn, _fn1, _ref, _ref1;

  HasStyles_ = (function() {
    function HasStyles_() {}

    HasStyles_.prototype.__initMixinHasStyles = function() {
      this._styleSetter = new StyleSetter(this);
      this._transitioner = new Transitioner(this);
      this._styleInterface = this._styleSetter;
    };

    HasStyles_.prototype.__clonerForHasStyles = function(newEl) {
      newEl._styleSetter = this._styleSetter.clone(newEl);
      newEl._transitioner = this._transitioner.clone(newEl);
      if (this._styleInterface === this._styleSetter) {
        newEl._styleInterface = newEl._styleSetter;
      } else {
        newEl._styleInterface = newEl._transitioner;
      }
    };

    HasStyles_.prototype.enableTransition = function(duration) {
      this._styleInterface = this._transitioner;
      this._transitioner.enable(duration);
      return this;
    };

    HasStyles_.prototype.disableTransition = function() {
      this._styleInterface = this._styleSetter;
      this._transitioner.disable();
      return this;
    };

    return HasStyles_;

  })();
  ClassPrototype = HasStyles_.prototype;
  _ref = Transitioner.prototype;
  _fn = function() {
    var _methodName;

    _methodName = methodName;
    if (method.length === 0) {
      return ClassPrototype[_methodName] = function() {
        this._styleInterface[_methodName]();
        return this;
      };
    } else if (method.length === 1) {
      return ClassPrototype[_methodName] = function(arg0) {
        this._styleInterface[_methodName](arg0);
        return this;
      };
    } else if (method.length === 2) {
      return ClassPrototype[_methodName] = function(arg0, arg1) {
        this._styleInterface[_methodName](arg0, arg1);
        return this;
      };
    } else if (method.length === 3) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2) {
        this._styleInterface[_methodName](arg0, arg1, arg2);
        return this;
      };
    } else if (method.length === 4) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3) {
        this._styleInterface[_methodName](arg0, arg1, arg2, arg3);
        return this;
      };
    } else if (method.length === 5) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3, arg4) {
        this._styleInterface[_methodName](arg0, arg1, arg2, arg3, arg4);
        return this;
      };
    } else {
      throw Error("Methods with more than 5 args are not supported.");
    }
  };
  for (methodName in _ref) {
    method = _ref[methodName];
    if (!(method instanceof Function)) {
      continue;
    }
    if (ClassPrototype[methodName] != null) {
      continue;
    }
    if (methodName[0] === '_') {
      continue;
    }
    if (methodName.substr(0, 3) === 'get') {
      continue;
    }
    _fn();
  }
  _ref1 = StyleSetter.prototype;
  _fn1 = function() {
    var _methodName;

    _methodName = methodName;
    if (method.length === 0) {
      return ClassPrototype[_methodName] = function() {
        this._styleSetter[_methodName]();
        return this;
      };
    } else if (method.length === 1) {
      return ClassPrototype[_methodName] = function(arg0) {
        this._styleSetter[_methodName](arg0);
        return this;
      };
    } else if (method.length === 2) {
      return ClassPrototype[_methodName] = function(arg0, arg1) {
        this._styleSetter[_methodName](arg0, arg1);
        return this;
      };
    } else if (method.length === 3) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2) {
        this._styleSetter[_methodName](arg0, arg1, arg2);
        return this;
      };
    } else if (method.length === 4) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3) {
        this._styleSetter[_methodName](arg0, arg1, arg2, arg3);
        return this;
      };
    } else if (method.length === 5) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3, arg4) {
        this._styleSetter[_methodName](arg0, arg1, arg2, arg3, arg4);
        return this;
      };
    } else {
      throw Error("Methods with more than 5 args are not supported.");
    }
  };
  for (methodName in _ref1) {
    method = _ref1[methodName];
    if (!(method instanceof Function)) {
      continue;
    }
    if (ClassPrototype[methodName] != null) {
      continue;
    }
    if (methodName[0] === '_') {
      continue;
    }
    if (methodName.substr(0, 3) === 'get') {
      continue;
    }
    _fn1();
  }
  return HasStyles_;
});
