var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el'], function(El) {
  var Container;

  return Container = (function(_super) {
    __extends(Container, _super);

    function Container() {
      var node;

      node = document.createElement('div');
      node.classList.add('container');
      Container.__super__.constructor.call(this, node);
    }

    Container.prototype.autoOrigin = function() {
      var _this = this;

      wait(0, function() {
        var actual, el, elR, original, xCenter, yCenter, _i, _len, _ref;

        original = _this.node.getBoundingClientRect();
        actual = {
          left: 10000,
          right: -10000,
          top: 10000,
          bottom: -10000
        };
        _ref = _this.node.childNodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          el = _ref[_i];
          elR = el.getBoundingClientRect();
          if (elR.left < actual.left) {
            actual.left = elR.left;
          }
          if (elR.right > actual.right) {
            actual.right = elR.right;
          }
          if (elR.top < actual.top) {
            actual.top = elR.top;
          }
          if (elR.bottom > actual.bottom) {
            actual.bottom = elR.bottom;
          }
        }
        xCenter = (actual.right - actual.left) / 2;
        yCenter = (actual.bottom - actual.top) / 2;
        return _this.setOrigin('-3000px 100px');
      });
      return this;
    };

    return Container;

  })(El);
});
