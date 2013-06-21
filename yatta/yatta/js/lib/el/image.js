var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el'], function(El) {
  var Image;

  return Image = (function(_super) {
    __extends(Image, _super);

    function Image(filename) {
      var node;

      this.filename = filename;
      node = document.createElement('img');
      node.src = "./images/" + this.filename;
      Image.__super__.constructor.call(this, node);
    }

    return Image;

  })(El);
});
