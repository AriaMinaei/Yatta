var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var saturate;

  return saturate = {
    toCss: function(amount) {
      return "saturate(" + amount + "%)";
    }
  };
});
