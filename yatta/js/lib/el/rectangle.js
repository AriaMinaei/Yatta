var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el'], function(El) {
  var Rectangle;

  return Rectangle = (function(_super) {
    __extends(Rectangle, _super);

    function Rectangle(x, y) {
      var node;

      this.x = parseFloat(x);
      if (y == null) {
        this.y = this.x;
      } else {
        this.y = parseFloat(y);
      }
      node = document.createElement('div');
      node.classList.add('yatta-rectangle');
      Rectangle.__super__.constructor.call(this, node);
      this.setWidth(this.x);
      this.setHeight(this.y);
    }

    return Rectangle;

  })(El);
});
