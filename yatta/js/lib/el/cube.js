var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el'], function(El) {
  var Cube;

  return Cube = (function(_super) {
    __extends(Cube, _super);

    function Cube(width, height, depth) {
      var node;

      node = document.createElement('div');
      node.classList.add('cube');
      Cube.__super__.constructor.call(this, node);
    }

    return Cube;

  })(El);
});
