define(['../../utility/array', './frames/_timeoutPool', './frames/_intervalPool'], function(array, _timeoutPool, _intervalPool) {
  var frames, getTime, _nextFrame;

  getTime = (function() {
    if ((typeof performance !== "undefined" && performance !== null) && (performance.now != null)) {
      return function() {
        return performance.now();
      };
    } else {
      return Date.now() - 1372763687107;
    }
  })();
  _nextFrame = (function() {
    if (window.requestAnimationFrame) {
      return window.requestAnimationFrame;
    }
    if (window.mozRequestAnimationFrame) {
      return window.mozRequestAnimationFrame;
    }
    if (window.webkitRequestAnimationFrame) {
      return window.webkitRequestAnimationFrame;
    }
  })();
  return frames = {
    getTime: getTime,
    time: new Float64Array(1),
    timeInMs: new Int32Array(1),
    speed: 1,
    _toCallLaterInThisFrame: [],
    _toCallOnNextTick: [],
    _nextTickTimeout: null,
    nextTick: function(fn) {
      var _this = this;

      frames._toCallOnNextTick.push(fn);
      if (!frames._nextTickTimeout) {
        frames._nextTickTimeout = setTimeout(function() {
          return frames._callTick();
        }, 0);
      }
      return null;
    },
    _callTick: function() {
      var fn, toCallNow, _i, _len;

      if (frames._toCallOnNextTick.length < 1) {
        return;
      }
      frames._nextTickTimeout = null;
      toCallNow = frames._toCallOnNextTick;
      frames._toCallOnNextTick = [];
      for (_i = 0, _len = toCallNow.length; _i < _len; _i++) {
        fn = toCallNow[_i];
        fn();
      }
      return null;
    },
    laterInThisFrame: function(fn) {
      frames._toCallLaterInThisFrame.push(fn);
      return null;
    },
    _callFramesScheduledForLaterInThisFrame: function(t) {
      var fn, toCall, _i, _len;

      if (frames._toCallLaterInThisFrame.length < 1) {
        return;
      }
      while (true) {
        if (frames._toCallLaterInThisFrame.length < 1) {
          return;
        }
        toCall = frames._toCallLaterInThisFrame;
        frames._toCallLaterInThisFrame = [];
        for (_i = 0, _len = toCall.length; _i < _len; _i++) {
          fn = toCall[_i];
          fn(t);
        }
      }
      return null;
    },
    _toCallOnNextFrame: [],
    onNextFrame: function(fn) {
      frames._toCallOnNextFrame.push(fn);
      return null;
    },
    cancelOnNextFrame: function(fn) {
      array.pluckOneItem(frames._toCallOnNextFrame, fn);
      return null;
    },
    _callFramesScheduledForThisFrame: function(t) {
      var fn, toCallNow, _i, _len;

      if (frames._toCallOnNextFrame.length < 1) {
        return;
      }
      toCallNow = frames._toCallOnNextFrame;
      frames._toCallOnNextFrame = [];
      for (_i = 0, _len = toCallNow.length; _i < _len; _i++) {
        fn = toCallNow[_i];
        fn(t);
      }
      return null;
    },
    _toCallOnEachFrame: [],
    _toCancelFromCallingOnEachFrame: [],
    onEachFrame: function(fn) {
      frames._toCallOnEachFrame.push(fn);
      return null;
    },
    cancelEachFrame: function(fn) {
      frames._toCancelFromCallingOnEachFrame.push(fn);
      return null;
    },
    _callFramesScheduledForEachFrame: function(t) {
      var fn, toCancel, _i, _j, _len, _len1, _ref, _ref1;

      if (frames._toCallOnEachFrame.length < 1) {
        return;
      }
      _ref = frames._toCancelFromCallingOnEachFrame;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        toCancel = _ref[_i];
        array.pluckOneItem(frames._toCallOnEachFrame, toCancel);
      }
      frames._toCancelFromCallingOnEachFrame.length = 0;
      _ref1 = frames._toCallOnEachFrame;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        fn = _ref1[_j];
        fn(t);
      }
    },
    _toCallAfterEachFrame: [],
    _toCancelFromCallingAfterEachFrame: [],
    afterEachFrame: function(fn) {
      frames._toCallAfterEachFrame.push(fn);
      return null;
    },
    cancelAfterEachFrame: function(fn) {
      frames._toCancelFromCallingAfterEachFrame.push(fn);
      return null;
    },
    _callFramesScheduledForAfterEachFrame: function(t) {
      var fn, toCancel, _i, _j, _len, _len1, _ref, _ref1;

      if (frames._toCallAfterEachFrame.length < 1) {
        return;
      }
      _ref = frames._toCancelFromCallingAfterEachFrame;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        toCancel = _ref[_i];
        array.pluckOneItem(frames._toCallAfterEachFrame, toCancel);
      }
      frames._toCancelFromCallingAfterEachFrame.length = 0;
      _ref1 = frames._toCallAfterEachFrame;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        fn = _ref1[_j];
        fn(t);
      }
      return null;
    },
    __shouldInjectCallItem: function(itemA, itemB, itemToInject) {
      var _ref;

      if (itemA == null) {
        if (itemToInject.time <= itemB.time) {
          return true;
        }
        return false;
      }
      if (itemB == null) {
        if (itemA.time <= itemToInject.time) {
          return true;
        }
        return false;
      }
      if ((itemA.time <= (_ref = itemToInject.time) && _ref <= itemB.time)) {
        return true;
      }
      return false;
    },
    _waitCallbacks: [],
    wait: function(ms, fn) {
      var callTime, item;

      callTime = frames.timeInMs[0] + ms + 8;
      item = _timeoutPool.give(callTime, fn);
      array.injectByCallback(frames._waitCallbacks, item, frames.__shouldInjectCallItem);
      return null;
    },
    _callWaiters: function(t) {
      var item;

      if (frames._waitCallbacks.length < 1) {
        return;
      }
      while (true) {
        if (frames._waitCallbacks.length < 1) {
          return;
        }
        item = frames._waitCallbacks[0];
        if (item.time > frames.timeInMs[0]) {
          return;
        }
        _timeoutPool.take(item);
        frames._waitCallbacks.shift();
        item.fn(t);
      }
      return null;
    },
    _intervals: [],
    _toRemoveFromIntervals: [],
    every: function(ms, fn) {
      frames._intervals.push(_intervalPool.give(ms, frames.timeInMs[0], 0, fn));
      return null;
    },
    cancelEvery: function(fn) {
      frames._toRemoveFromIntervals.push(fn);
      return null;
    },
    _callIntervals: function() {
      var fnToRemove, item, properTimeToCall, t, _i, _j, _len, _len1, _ref, _ref1;

      if (frames._intervals.length < 1) {
        return;
      }
      t = frames.timeInMs[0];
      _ref = frames._toRemoveFromIntervals;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fnToRemove = _ref[_i];
        array.pluckByCallback(frames._intervals, function(item) {
          if (item.fn === fnToRemove) {
            return true;
          }
          return false;
        });
      }
      _ref1 = frames._intervals;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        item = _ref1[_j];
        properTimeToCall = item.from + (item.timesCalled * item.every) + item.every;
        if (properTimeToCall <= t) {
          item.fn(t);
          item.timesCalled++;
        }
      }
    },
    _theLoop: function(t) {
      t = t * frames.speed;
      _nextFrame(frames._theLoop);
      frames.time[0] = t;
      t = parseInt(t);
      frames.timeInMs[0] = t;
      frames._callFramesScheduledForThisFrame(t);
      frames._callFramesScheduledForEachFrame(t);
      frames._callFramesScheduledForAfterEachFrame(t);
      frames._callFramesScheduledForLaterInThisFrame(t);
      frames._callWaiters(t);
      frames._callIntervals(t);
      return null;
    },
    start: function() {
      _nextFrame(frames._theLoop);
      return null;
    }
  };
});
