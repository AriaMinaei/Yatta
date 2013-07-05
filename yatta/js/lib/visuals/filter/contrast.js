var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var contrast;

  return contrast = {
    toCss: function(amount) {
      return "contrast(" + amount + "%)";
    }
  };
});
