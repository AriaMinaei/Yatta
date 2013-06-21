var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var grayscale;

  return grayscale = {
    toCss: function(amount) {
      return "grayscale(" + amount + "%)";
    }
  };
});
