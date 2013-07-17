var __slice = [].slice;

define(['../../methodChain/methodChain', '../../utility/array'], function(MethodChain, array) {
  var Interactions_;

  return Interactions_ = (function() {
    function Interactions_() {}

    Interactions_.__methodChain = null;

    Interactions_.prototype.__initMixinInteractions = function() {
      this._quittersForInteractions = [];
      return null;
    };

    Interactions_.prototype.__clonerForInteractions = function(newEl) {
      return newEl._quittersForInteractions = [];
    };

    Interactions_.prototype.__quitterForInteractions = function() {
      while (true) {
        if (this._quittersForInteractions.length < 1) {
          return;
        }
        this._quittersForInteractions.pop()();
      }
    };

    Interactions_.prototype._getMethodChain = function() {
      var fn, key;

      if (Interactions_.__methodChain == null) {
        Interactions_.__methodChain = new MethodChain;
        for (key in this) {
          fn = this[key];
          if (key[0] === '_' || key === 'constructor') {
            continue;
          }
          if (!(fn instanceof Function)) {
            continue;
          }
          Interactions_.__methodChain.addMethod(key);
        }
      }
      return Interactions_.__methodChain;
    };

    Interactions_.prototype._getNewInterface = function() {
      return this._getMethodChain().getInterface();
    };

    Interactions_.prototype.onClick = function() {
      var _this = this;

      return this._eventEnabledMethod(arguments, function(cb) {
        return _this.node.addEventListener('click', function(e) {
          e.stopPropagation();
          e.preventDefault();
          return cb.call(_this);
        });
      });
    };

    Interactions_.prototype.onMouseOver = function() {
      var _this = this;

      return this._eventEnabledMethod(arguments, function(cb) {
        return _this.node.addEventListener('mouseover', function(e) {
          e.stopPropagation();
          e.preventDefault();
          return cb.call(_this);
        });
      });
    };

    Interactions_.prototype.onMouseOut = function() {
      var _this = this;

      return this._eventEnabledMethod(arguments, function(cb) {
        return _this.node.addEventListener('mouseout', function(e) {
          e.stopPropagation();
          e.preventDefault();
          return cb.call(_this);
        });
      });
    };

    Interactions_.prototype.wait = function() {
      var ms, rest,
        _this = this;

      ms = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this._eventEnabledMethod(rest, function(cb) {
        return frames.wait(ms, function() {
          return cb.call(_this);
        });
      });
    };

    Interactions_.prototype.immediately = function() {
      var _this = this;

      return this._eventEnabledMethod(arguments, function(cb) {
        return frames.laterInThisFrame(function() {
          return cb.call(_this);
        });
      });
    };

    Interactions_.prototype.eachFrame = function() {
      var _this = this;

      return this._eventEnabledMethod(arguments, function(cb) {
        var canceled, canceler, startTime, theCallback;

        startTime = new Int32Array(1);
        startTime[0] = -1;
        canceled = false;
        canceler = function() {
          if (canceled) {
            return;
          }
          frames.cancelEachFrame(theCallback);
          array.pluckOneItem(_this._quittersForInteractions, canceler);
          return canceled = true;
        };
        _this._quittersForInteractions.push(canceler);
        theCallback = function(t) {
          var elapsedTime;

          if (startTime[0] < 0) {
            startTime[0] = t;
            elapsedTime = 0;
          } else {
            elapsedTime = t - startTime[0];
          }
          cb.call(_this, elapsedTime, canceler);
          return null;
        };
        return frames.onEachFrame(theCallback);
      });
    };

    Interactions_.prototype.run = function() {
      var _this = this;

      this._eventEnabledMethod(arguments, function(cb) {
        return cb.call(_this);
      });
      return this;
    };

    Interactions_.prototype.every = function() {
      var args, ms,
        _this = this;

      ms = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this._eventEnabledMethod(args, function(cb) {
        var canceled, canceler, theCallback;

        canceled = false;
        canceler = function() {
          if (canceled) {
            return;
          }
          frames.cancelEvery(theCallback);
          array.pluckOneItem(_this._quittersForInteractions, canceler);
          return canceled = true;
        };
        _this._quittersForInteractions.push(canceler);
        theCallback = function() {
          return cb.call(_this, canceler);
        };
        return frames.every(ms, theCallback);
      });
    };

    Interactions_.prototype.each = function(cb) {
      var child, counter, els, i, _interface,
        _this = this;

      if (cb == null) {
        cb = null;
      }
      if (cb instanceof Function) {
        i = 0;
        child = null;
        counter = -1;
        while (true) {
          counter++;
          if (child === this._children[i]) {
            i++;
          }
          child = this._children[i];
          if (child == null) {
            break;
          }
          cb.call(this, child, counter);
        }
        return this;
      }
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
