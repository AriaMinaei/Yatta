var define,
  __slice = [].slice;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var global, implementing;

  Function.prototype.define = function(prop, desc) {
    return Object.defineProperty(this.prototype, prop, desc);
  };
  Function.prototype.getter = function(prop, getter) {
    return this.prototype.__defineGetter__(prop, getter);
  };
  Function.prototype.setter = function(prop, setter) {
    return this.prototype.__defineSetter__(prop, setter);
  };
  implementing = function() {
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
  if (typeof window !== 'undefined') {
    global = window;
  }
  return global.implementing = implementing;
});
