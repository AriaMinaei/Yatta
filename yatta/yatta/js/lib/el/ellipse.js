var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el', '../tools'], function(El, tools) {
  var Ellipse;

  return Ellipse = (function(_super) {
    __extends(Ellipse, _super);

    function Ellipse(x, y) {
      var node;

      this.x = parseFloat(x);
      if (y == null) {
        this.y = this.x;
      } else {
        this.y = parseFloat(y);
      }
      node = document.createElement('div');
      node.classList.add('ellipse');
      Ellipse.__super__.constructor.call(this, node);
      this.setWidth(this.x);
      this.setHeight(this.y);
    }

    return Ellipse;

  })(El);
});
