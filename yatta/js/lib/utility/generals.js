var define,
  __slice = [].slice;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var acceptAndReturnLazily, acceptLazyArgs, getLazyValue, getLazyValues, global, implementing, returnLazily;

  if (typeof window !== 'undefined') {
    global = window;
  }
  Function.prototype.define = function(prop, desc) {
    return Object.defineProperty(this.prototype, prop, desc);
  };
  Function.prototype.getter = function(prop, getter) {
    return this.prototype.__defineGetter__(prop, getter);
  };
  Function.prototype.setter = function(prop, setter) {
    return this.prototype.__defineSetter__(prop, setter);
  };
  global.implementing = implementing = function() {
    var classProto, classReference, desc, member, mixin, mixins, _i, _j, _len;

    mixins = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), classReference = arguments[_i++];
    for (_j = 0, _len = mixins.length; _j < _len; _j++) {
      mixin = mixins[_j];
      classProto = classReference.prototype;
      for (member in mixin.prototype) {
        if (!Object.getOwnPropertyDescriptor(classProto, member)) {
          desc = Object.getOwnPropertyDescriptor(mixin.prototype, member);
          Object.defineProperty(classProto, member, desc);
        }
      }
    }
    return classReference;
  };
  getLazyValue = function(val) {
    if ((val._isLazy != null) && val._isLazy) {
      return val();
    } else {
      return val;
    }
  };
  getLazyValues = function(ar) {
    var item, _i, _len, _results;

    _results = [];
    for (_i = 0, _len = ar.length; _i < _len; _i++) {
      item = ar[_i];
      _results.push(getLazyValue(item));
    }
    return _results;
  };
  global.returnLazily = returnLazily = function(fn) {
    return function() {
      var args, ret,
        _this = this;

      args = arguments;
      ret = function() {
        return fn.apply(_this, args);
      };
      ret._isLazy = true;
      return ret;
    };
  };
  global.acceptLazyArgs = acceptLazyArgs = function(fn) {
    return function() {
      var args;

      args = getLazyValues(arguments);
      return fn.apply(this, args);
    };
  };
  global.acceptAndReturnLazily = acceptAndReturnLazily = function(fn) {
    return returnLazily(acceptLazyArgs(fn));
  };
  return null;
});
