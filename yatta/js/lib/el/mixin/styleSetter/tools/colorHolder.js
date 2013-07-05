define(['../../../tools/css/color'], function(CSSColor) {
  var ClassPrototype, ColorHolder, method, methodName, _fn, _ref;

  ColorHolder = (function() {
    function ColorHolder(_callback) {
      this._callback = _callback;
      this._color = new CSSColor;
    }

    ColorHolder.prototype.withRgb = function(r, g, b) {
      this._color.fromRgb(r, g, b);
      this._callback();
      return this;
    };

    ColorHolder.prototype.withHsl = function(h, s, l) {
      this._color.fromHsl(h, s, l);
      this._callback();
      return this;
    };

    ColorHolder.prototype.clone = function(callback) {
      var newObj;

      newObj = Object.create(this.constructor.prototype);
      newObj._color = this._color.clone();
      newObj._callback = callback;
      return newObj;
    };

    return ColorHolder;

  })();
  ClassPrototype = ColorHolder.prototype;
  _ref = CSSColor.prototype;
  _fn = function() {
    var _methodName;

    _methodName = methodName;
    if (method.length === 0) {
      return ClassPrototype[_methodName] = function() {
        this._color[_methodName]();
        this._callback();
        return this;
      };
    } else if (method.length === 1) {
      return ClassPrototype[_methodName] = function(arg0) {
        this._color[_methodName](arg0);
        this._callback();
        return this;
      };
    } else if (method.length === 2) {
      return ClassPrototype[_methodName] = function(arg0, arg1) {
        this._color[_methodName](arg0, arg1);
        this._callback();
        return this;
      };
    } else if (method.length === 3) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2) {
        this._color[_methodName](arg0, arg1, arg2);
        this._callback();
        return this;
      };
    } else if (method.length === 4) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3) {
        this._color[_methodName](arg0, arg1, arg2, arg3);
        this._callback();
        return this;
      };
    } else if (method.length === 5) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3, arg4) {
        this._color[_methodName](arg0, arg1, arg2, arg3, arg4);
        this._callback();
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
    if (methodName.substr(0, 2) === 'to') {
      continue;
    }
    _fn();
  }
  return ColorHolder;
});
