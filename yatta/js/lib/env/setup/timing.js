define(function() {
  var timing;

  timing = {};
  timing.nextPulse = (function() {
    var doIt, list, timeout;

    list = [];
    timeout = null;
    doIt = function() {
      var fn, _i, _len;

      for (_i = 0, _len = list.length; _i < _len; _i++) {
        fn = list[_i];
        fn();
      }
      list.length = 0;
      timeout = null;
      return null;
    };
    return function(fn) {
      list.push(fn);
      timeout = setTimeout(doIt, 66);
      return null;
    };
  })();
  timing.nextFrame = (function() {
    if (window.requestAnimationFrame) {
      return window.requestAnimationFrame;
    }
    if (window.mozRequestAnimationFrame) {
      return window.mozRequestAnimationFrame;
    }
    if (window.webkitRequestAnimationFrame) {
      return window.webkitRequestAnimationFrame;
    }
    return function(fn) {
      return setTimeout(fn, 16);
    };
  })();
  timing.wait = function(ms, fn) {
    setTimeout(function() {
      return fn();
    }, ms);
    return null;
  };
  timing.every = function(ms, fn) {
    setInterval(function() {
      return fn();
    }, ms);
    return null;
  };
  return timing;
});
