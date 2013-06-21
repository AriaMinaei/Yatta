var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var opacity;

  return opacity = {
    toCss: function(amount) {
      return "opacity(" + amount + "%)";
    }
  };
});
