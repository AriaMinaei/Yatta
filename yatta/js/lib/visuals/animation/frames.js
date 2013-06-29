define(['../../utility/array', './frames/_timeoutPool', './frames/_intervalPool'], function(array, _timeoutPool, _intervalPool) {
  var frames, getTime, _nextFrame;

  getTime = (function() {
    if ((typeof performance !== "undefined" && performance !== null) && (performance.now != null)) {
      return function() {
        return performance.now();
      };
    } else {
      return Date.now;
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
    return function(fn) {
      return setTimeout(fn, 16);
    };
  })();
  return frames = {
    getTime: getTime,
    _currentT: 0,
    _currentTInMs: 0,
    _toCallLaterInThisFrame: [],
    _toCallOnNextTick: [],
    _nextTickTimeout: null,
    nextTick: function(fn) {
      var _this = this;

      this._toCallOnNextTick.push(fn);
      if (!this._nextTickTimeout) {
        this._nextTickTimeout = setTimeout(function() {
          return _this._callTick();
        }, 0);
      }
      return this;
    },
    _callTick: function() {
      var fn, toCallNow, _i, _len;

      this._nextTickTimeout = null;
      toCallNow = this._toCallOnNextTick;
      this._toCallOnNextTick = [];
      for (_i = 0, _len = toCallNow.length; _i < _len; _i++) {
        fn = toCallNow[_i];
        fn();
      }
      return null;
    },
    laterInThisFrame: function(fn) {
      this._toCallLaterInThisFrame.push(fn);
      return null;
    },
    _callFramesScheduledForLaterInThisFrame: function(t) {
      var fn, len, toCall, _i, _len;

      while (true) {
        len = this._toCallLaterInThisFrame.length;
        if (len < 1) {
          break;
        }
        toCall = this._toCallLaterInThisFrame;
        this._toCallLaterInThisFrame = [];
        for (_i = 0, _len = toCall.length; _i < _len; _i++) {
          fn = toCall[_i];
          fn(t);
        }
      }
      return null;
    },
    _toCallOnNextFrame: [],
    onNextFrame: function(fn) {
      this._toCallOnNextFrame.push(fn);
      return null;
    },
    cancelOnNextFrame: function(fn) {
      array.pluckOneItem(this._toCallOnNextFrame, fn);
      return null;
    },
    _callFramesScheduledForThisFrame: function(t) {
      var fn, toCallNow, _i, _len;

      toCallNow = this._toCallOnNextFrame;
      this._toCallOnNextFrame = [];
      for (_i = 0, _len = toCallNow.length; _i < _len; _i++) {
        fn = toCallNow[_i];
        fn(t);
      }
      return null;
    },
    _toCallOnEachFrame: [],
    _toCancelFromCallingOnEachFrame: [],
    onEachFrame: function(fn) {
      this._toCallOnEachFrame.push(fn);
      return null;
    },
    cancelEachFrame: function(fn) {
      this._toCancelFromCallingOnEachFrame.push(fn);
      return null;
    },
    _callFramesScheduledForEachFrame: function(t) {
      var fn, toCancel, _i, _j, _len, _len1, _ref, _ref1;

      _ref = this._toCancelFromCallingOnEachFrame;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        toCancel = _ref[_i];
        array.pluckOneItem(this._toCallOnEachFrame, toCancel);
      }
      this._toCancelFromCallingOnEachFrame.length = 0;
      _ref1 = this._toCallOnEachFrame;
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

      callTime = this._currentTInMs + ms + 8;
      item = _timeoutPool.give(callTime, fn);
      array.injectByCallback(this._waitCallbacks, item, this.__shouldInjectCallItem);
      return null;
    },
    _callWaiters: function(t) {
      var item;

      while (true) {
        if (this._waitCallbacks.length < 1) {
          return;
        }
        item = this._waitCallbacks[0];
        if (item.time > this._currentTInMs) {
          return;
        }
        _timeoutPool.take(item);
        this._waitCallbacks.shift();
        item.fn(t);
      }
      return null;
    },
    _intervals: [],
    _removeFromIntervals: [],
    every: function(ms, fn) {
      this._intervals.push(_intervalPool.give(ms, this._currentTInMs, 0, fn));
      return null;
    },
    cancelEvery: function(fn) {
      this._removeFromIntervals.push(fn);
      return null;
    },
    _callIntervals: function() {
      var fnToRemove, item, properTimeToCall, t, _i, _j, _len, _len1, _ref, _ref1;

      t = this._currentTInMs;
      _ref = this._removeFromIntervals;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fnToRemove = _ref[_i];
        array.pluckByCallback(this._intervals, function(item) {
          if (item.fn === fnToRemove) {
            return true;
          }
          return false;
        });
      }
      _ref1 = this._intervals;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        item = _ref1[_j];
        properTimeToCall = item.from + (item.timesCalled * item.every) + item.every;
        if (properTimeToCall <= t) {
          item.fn(t);
          item.timesCalled++;
        }
      }
      return null;
    },
    _theLoop: function(t) {
      _nextFrame(frames._theLoop);
      frames._currentT = t;
      frames._currentTInMs = parseInt(t);
      frames._callFramesScheduledForThisFrame(t);
      frames._callFramesScheduledForEachFrame(t);
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
