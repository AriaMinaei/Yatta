var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var hueRotate;

  return hueRotate = {
    toCss: function(angle) {
      return "hue-rotate(" + angle + "deg)";
    }
  };
});
