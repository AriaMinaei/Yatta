define(['../css', '../../tools', '../../utility/generals'], function(css, tools) {
  var __General;

  return __General = (function() {
    function __General() {}

    __General.prototype.setWidth = acceptLazyArgs(function(d) {
      var _this = this;

      this._do(function() {
        return _this.node.style.width = d + 'px';
      });
      return this;
    });

    __General.prototype.setHeight = acceptLazyArgs(function(d) {
      var _this = this;

      this._do(function() {
        return _this.node.style.height = d + 'px';
      });
      return this;
    });

    __General.prototype.go3d = function() {
      css.setTransformStyle(this.node, 'preserve-3d');
      return this;
    };

    __General.prototype.setOrigin = acceptLazyArgs(function(origin) {
      var _this = this;

      this._do(function() {
        return css.setTransformOrigin(_this.node, origin);
      });
      return this;
    });

    __General.prototype.fillWith = acceptLazyArgs(function(r, g, b) {
      var args,
        _this = this;

      args = arguments;
      this._do(function() {
        var color;

        if (args.length === 0) {
          color = 'transparent';
        } else if (args.length === 1) {
          color = r;
        } else {
          color = tools.rgb(r, g, b);
        }
        return _this.node.style.background = color;
      });
      return this;
    });

    __General.prototype.makeHollow = function() {
      var _this = this;

      this._do(function() {
        return _this.fillWith();
      });
      return this;
    };

    __General.prototype.setBorder = acceptLazyArgs(function(thickness, r, g, b) {
      var args,
        _this = this;

      args = arguments;
      this._do(function() {
        if (args.length === 0) {
          return _this.node.style.border = 'none';
        } else if (args.length !== 4) {
          throw Error("setBorders() requires either 0 or 4 arguments: thickness, r, g, b");
        } else {
          return _this.node.style.border = thickness + 'px solid ' + tools.rgb(r, g, b);
        }
      });
      return this;
    });

    __General.prototype.removeBorder = function() {
      var _this = this;

      return this._do(function() {
        return _this.setBorder();
      });
    };

    return __General;

  })();
});
