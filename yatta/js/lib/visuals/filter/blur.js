var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var blur;

  return blur = {
    toCss: function(radius) {
      return "blur(" + radius + "px)";
    }
  };
});
