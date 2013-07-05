var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define({
  throttle: function(func, time) {
    var lastCalled;

    if (time == null) {
      time = 1000;
    }
    lastCalled = 0;
    return function() {
      var now;

      now = Date.now();
      if (now - lastCalled < time) {
        return;
      }
      lastCalled = now;
      return func.apply(null, arguments);
    };
  }
});
