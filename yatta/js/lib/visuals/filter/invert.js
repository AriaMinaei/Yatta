var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var invert;

  return invert = {
    toCss: function(amount) {
      return "invert(" + amount + "%)";
    }
  };
});
