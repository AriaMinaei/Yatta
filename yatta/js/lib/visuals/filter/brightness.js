var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var brightness;

  return brightness = {
    toCss: function(amount) {
      return "brightness(" + amount + ")";
    }
  };
});
