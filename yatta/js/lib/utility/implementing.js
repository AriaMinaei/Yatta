var define, implementing,
  __slice = [].slice;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(implementing = function() {
  var classReference, key, mixin, mixins, value, _i, _j, _len, _ref;

  mixins = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), classReference = arguments[_i++];
  for (_j = 0, _len = mixins.length; _j < _len; _j++) {
    mixin = mixins[_j];
    _ref = mixin.prototype;
    for (key in _ref) {
      value = _ref[key];
      classReference.prototype[key] = value;
    }
  }
  return classReference;
});
