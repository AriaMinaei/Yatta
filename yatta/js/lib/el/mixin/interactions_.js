var __slice = [].slice;

define(['../../methodChain/methodChain'], function(MethodChain) {
  var Interactions_;

  return Interactions_ = (function() {
    function Interactions_() {}

    Interactions_._nextThenCallback = function(cb) {
      return frames.laterInThisFrame(cb);
    };

    Interactions_.prototype.__initMixinInteractions = function() {
      this._methodChain = null;
      this._resetNextThenCallback();
      return null;
    };

    Interactions_.prototype._resetNextThenCallback = function() {
      return this._nextThenCallback = Interactions_._nextThenCallback;
    };

    Interactions_.prototype._getMethodChain = function() {
      var fn, key;

      if (this._methodChain == null) {
        this._methodChain = new MethodChain;
        for (key in this) {
          fn = this[key];
          if (key[0] === '_' || key === 'constructor') {
            continue;
          }
          if (!(fn instanceof Function)) {
            continue;
          }
          this._methodChain.addMethod(key);
        }
      }
      return this._methodChain;
    };

    Interactions_.prototype._getNewInterface = function() {
      return this._getMethodChain().getInterface();
    };

    Interactions_.prototype.onClick = function() {
      var _this = this;

      return this._eventEnabledMethod(arguments, function(cb) {
        return _this.node.addEventListener('click', cb);
      });
    };

    Interactions_.prototype.wait = function() {
      var ms, rest,
        _this = this;

      ms = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this._eventEnabledMethod(rest, function(cb) {
        return frames.wait(ms, cb.bind(_this));
      });
    };

    Interactions_.prototype.eachFrame = function() {
      var _this = this;

      return this._eventEnabledMethod(arguments, function(cb) {
        var cancel, frameCallback, startTime;

        startTime = new Int32Array(1);
        startTime[0] = -1;
        cancel = function() {
          return frames.cancelEachFrame(frameCallback);
        };
        frameCallback = function(t) {
          var elapsedTime;

          if (startTime[0] < 0) {
            startTime[0] = t;
            elapsedTime = 0;
          } else {
            elapsedTime = t - startTime[0];
          }
          cb(_this, elapsedTime, cancel);
          return null;
        };
        return frames.onEachFrame(frameCallback);
      });
    };

    Interactions_.prototype.then = function() {
      var rest,
        _this = this;

      rest = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._eventEnabledMethod(rest, function(cb) {
        return _this._nextThenCallback(cb.bind(_this));
      });
    };

    Interactions_.prototype.every = function() {
      var args, ms,
        _this = this;

      ms = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this._eventEnabledMethod(args, function(cb) {
        return frames.every(ms, cb.bind(_this));
      });
    };

    Interactions_.prototype.each = function() {
      var els, _interface,
        _this = this;

      _interface = this._getNewInterface();
      els = this._children;
      if (els.length !== 0) {
        frames.laterInThisFrame(function() {
          var el, _i, _len;

          for (_i = 0, _len = els.length; _i < _len; _i++) {
            el = els[_i];
            _this._getMethodChain().run(_interface, el);
          }
          return null;
        });
      }
      return _interface;
    };

    Interactions_.prototype._eventEnabledMethod = function(args, runCallback) {
      var fn, _interface, _ref,
        _this = this;

      fn = (_ref = args[0]) != null ? _ref : null;
      if (fn) {
        runCallback(function() {
          return fn.apply(_this, arguments);
        });
        return this;
      } else {
        _interface = this._getNewInterface();
        runCallback(function() {
          return _this._getMethodChain().run(_interface, _this);
        });
        return _interface;
      }
    };

    return Interactions_;

  })();
});
