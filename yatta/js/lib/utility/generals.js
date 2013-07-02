var define,
  __slice = [].slice;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var global;

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
  global.implementing = function() {
    var classProto, classReference, desc, member, mixin, mixins, _i, _j, _len;

    mixins = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), classReference = arguments[_i++];
    classProto = classReference.prototype;
    for (_j = 0, _len = mixins.length; _j < _len; _j++) {
      mixin = mixins[_j];
      for (member in mixin.prototype) {
        if (!Object.getOwnPropertyDescriptor(classProto, member)) {
          desc = Object.getOwnPropertyDescriptor(mixin.prototype, member);
          Object.defineProperty(classProto, member, desc);
        }
      }
    }
    return classReference;
  };
  global.mixing = function() {
    var classProto, classReference, desc, member, mixin, mixins, _i, _j, _len;

    mixins = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), classReference = arguments[_i++];
    classProto = classReference.prototype;
    if (classProto.__cloners == null) {
      classProto.__cloners = [];
    }
    if (classProto.__applyCloners == null) {
      classProto.__applyCloners = function() {
        var cloner, _j, _len, _ref;

        _ref = this.__cloners;
        for (_j = 0, _len = _ref.length; _j < _len; _j++) {
          cloner = _ref[_j];
          this[cloner].apply(this, arguments);
        }
      };
    }
    if (classProto.__mixinInitializers == null) {
      classProto.__mixinInitializers = [];
    }
    if (classProto.__initMixins == null) {
      classProto.__initMixins = function() {
        var initializer, _j, _len, _ref;

        _ref = this.__mixinInitializers;
        for (_j = 0, _len = _ref.length; _j < _len; _j++) {
          initializer = _ref[_j];
          this[initializer]();
        }
      };
    }
    for (_j = 0, _len = mixins.length; _j < _len; _j++) {
      mixin = mixins[_j];
      for (member in mixin.prototype) {
        if (member.substr(0, 11) === '__initMixin') {
          classProto.__mixinInitializers.push(member);
        } else if (member.substr(0, 11) === '__clonerFor') {
          classProto.__cloners.push(member);
        }
        if (!Object.getOwnPropertyDescriptor(classProto, member)) {
          desc = Object.getOwnPropertyDescriptor(mixin.prototype, member);
          Object.defineProperty(classProto, member, desc);
        }
      }
    }
    return classReference;
  };
  global.getLazyValue = function(val) {
    if ((val._isLazy != null) && val._isLazy) {
      return val();
    } else {
      return val;
    }
  };
  global.getLazyValues = function(ar) {
    var item, _i, _len, _results;

    _results = [];
    for (_i = 0, _len = ar.length; _i < _len; _i++) {
      item = ar[_i];
      _results.push(getLazyValue(item));
    }
    return _results;
  };
  global.returnLazily = function(fn) {
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
  global.acceptLazyArgs = function(fn) {
    return function() {
      var args;

      args = getLazyValues(arguments);
      return fn.apply(this, args);
    };
  };
  global.acceptAndReturnLazily = function(fn) {
    return returnLazily(acceptLazyArgs(fn));
  };
  return null;
});
