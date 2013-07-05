var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define({
  isInt: function(n) {
    return typeof n === 'number' && parseFloat(n) === parseInt(n, 10) && !isNaN(n);
  }
});
