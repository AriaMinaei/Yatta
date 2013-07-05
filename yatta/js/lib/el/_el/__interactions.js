var __slice = [].slice;

define(['../../methodChain/methodChain', '../../utility/generals'], function(MethodChain) {
  var __Interactions;

  return __Interactions = (function() {
    function __Interactions() {}

    __Interactions.prototype._initInteractions = function() {
      return this._methodChain = null;
    };

    __Interactions.prototype._getMethodChain = function() {
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

    __Interactions.prototype._getNewInterface = function() {
      return this._getMethodChain().getInterface();
    };

    __Interactions.prototype.onClick = function() {
      var _this = this;

      return this._eventEnabledMethod(arguments, function(cb) {
        return _this.node.addEventListener('click', cb);
      });
    };

    __Interactions.prototype.wait = acceptLazyArgs(function() {
      var ms, rest,
        _this = this;

      ms = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this._eventEnabledMethod(rest, function(cb) {
        return setTimeout(cb.bind(_this), ms);
      });
    });

    __Interactions.prototype.then = function() {
      var rest,
        _this = this;

      rest = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this._eventEnabledMethod(rest, function(cb) {
        return setTimeout(cb.bind(_this), 0);
      });
    };

    __Interactions.prototype.every = acceptLazyArgs(function() {
      var ms, rest,
        _this = this;

      ms = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this._eventEnabledMethod(rest, function(cb) {
        return setInterval(cb.bind(_this), ms);
      });
    });

    __Interactions.prototype.each = function() {
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

    __Interactions.prototype._eventEnabledMethod = function(args, cb) {
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

    return __Interactions;

  })();
});
