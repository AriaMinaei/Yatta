var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var sepia;

  return sepia = {
    toCss: function(amount) {
      return "sepia(" + amount + "%)";
    }
  };
});
