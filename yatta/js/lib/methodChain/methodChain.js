var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./_interface', '../utility/generals'], function(_Interface) {
  var MethodChain;

  return MethodChain = (function() {
    function MethodChain() {
      var I, _ref;

      this._methods = {};
      this._Interface = I = (function(_super) {
        __extends(I, _super);

        function I() {
          _ref = I.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        return I;

      })(_Interface);
    }

    MethodChain.prototype.addMethod = function(name) {
      this._Interface.prototype[name] = function() {
        this._queue.push({
          method: name,
          args: Array.prototype.slice.call(arguments)
        });
        return this;
      };
      return this;
    };

    MethodChain.prototype.getInterface = function() {
      return new this._Interface;
    };

    MethodChain.prototype.run = function(_interface, context) {
      var item, _i, _len, _ref;

      _ref = _interface._queue;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        context = context[item.method].apply(context, item.args);
      }
      return context;
    };

    return MethodChain;

  })();
});
