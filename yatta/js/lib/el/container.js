var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el'], function(El) {
  var Container;

  return Container = (function(_super) {
    __extends(Container, _super);

    function Container() {
      var node;

      node = document.createElement('div');
      node.classList.add('yatta-container');
      Container.__super__.constructor.call(this, node);
    }

    return Container;

  })(El);
});
