var __slice = [].slice;

define(['../../methodChain/methodChain'], function(MethodChain) {
  var Interactions_;

  return Interactions_ = (function() {
    function Interactions_() {}

    Interactions_.prototype._initInteractions = function() {
      return this._methodChain = null;
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

    Interactions_.prototype.wait = acceptLazyArgs(function() {
      var ms, rest,
        _this = this;

      ms = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this._eventEnabledMethod(rest, function(cb) {
        return setTimeout(cb.bind(_this), ms);
      });
    });

    Interactions_.prototype.then = function() {
      var rest,
        _this = this;

      rest = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._eventEnabledMethod(rest, function(cb) {
        return setTimeout(cb.bind(_this), 0);
      });
    };

    Interactions_.prototype.every = acceptLazyArgs(function() {
      var ms, rest,
        _this = this;

      ms = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this._eventEnabledMethod(rest, function(cb) {
        return setInterval(cb.bind(_this), ms);
      });
    });

    Interactions_.prototype.each = function() {
      var els, _interface,
        _this = this;

      _interface = this._getNewInterface();
      els = this._children;
      if (els.length !== 0) {
        setTimeout(function() {
          var el, _i, _len;

          for (_i = 0, _len = els.length; _i < _len; _i++) {
            el = els[_i];
            _this._getMethodChain().run(_interface, el);
          }
          return null;
        }, 0);
      }
      return _interface;
    };

    Interactions_.prototype._eventEnabledMethod = function(args, cb) {
      var fn, _interface, _ref,
        _this = this;

      fn = (_ref = args[0]) != null ? _ref : null;
      if (fn) {
        cb(function(e) {
          return fn.apply(_this, [e]);
        });
        return this;
      } else {
        _interface = this._getNewInterface();
        cb(function() {
          return _this._getMethodChain().run(_interface, _this);
        });
        return _interface;
      }
    };

    return Interactions_;

  })();
});
