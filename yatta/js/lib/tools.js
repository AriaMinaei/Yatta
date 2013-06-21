define(function() {
  var needsTextStroke, nextTick, onFrame, tools;

  needsTextStroke = null;
  nextTick = (function() {
    var doIt, list, to;

    list = [];
    to = null;
    doIt = function() {
      var fn, _i, _len;

      for (_i = 0, _len = list.length; _i < _len; _i++) {
        fn = list[_i];
        fn();
      }
      list.length = 0;
      to = null;
      return null;
    };
    return function(fn) {
      list.push(fn);
      to = setTimeout(doIt, 50);
      return null;
    };
  })();
  onFrame = (function() {
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
  return tools = {
    nextTick: nextTick,
    onFrame: onFrame,
    needsTextStroke: function() {
      if (needsTextStroke === null) {
        if (navigator.appVersion.indexOf('Chrome') !== -1 && navigator.appVersion.indexOf('Windows') !== -1) {
          needsTextStroke = true;
        } else {
          needsTextStroke = false;
        }
      }
      return needsTextStroke;
    },
    rgb: function(r, g, b) {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    },
    setBgColor: function(el, r, g, b) {
      return el.style.backgroundColor = tools.rgb(r, g, b);
    },
    wait: function(ms, fn) {
      setTimeout(function() {
        return fn();
      }, ms);
      return null;
    },
    count: function(from, to, fn) {
      for (var i = from; i <= to; i++) {
				fn(i);
			};      return null;
    },
    centerX: function() {
      return window.innerWidth / 2;
    },
    centerY: function() {
      return window.innerHeight / 2;
    }
  };
});
