var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el', './rectangle'], function(El, Rectangle) {
  var Cube;

  return Cube = (function(_super) {
    __extends(Cube, _super);

    function Cube(width, height, depth, _initialHue, _initialSaturation) {
      var node;

      this.width = width;
      this.height = height;
      this.depth = depth;
      this._initialHue = _initialHue != null ? _initialHue : 0;
      this._initialSaturation = _initialSaturation != null ? _initialSaturation : 0;
      node = document.createElement('div');
      node.classList.add('yatta-cube');
      Cube.__super__.constructor.call(this, node);
      this.go3d();
      this._createSurfaces(this.width, this.height, this.depth);
    }

    Cube.prototype._createSurfaces = function(width, height, depth) {
      var child, _i, _len, _ref;

      this.topSurface = new Rectangle(width, depth);
      this.topSurface.rotateX(PI / 2).putIn(this);
      this.bottomSurface = new Rectangle(width, depth);
      this.bottomSurface.rotateX(-PI / 2).moveZTo(depth).moveYTo(height).putIn(this);
      this.frontSurface = new Rectangle(width, height);
      this.frontSurface.putIn(this);
      this.backSurface = new Rectangle(width, height);
      this.backSurface.moveZTo(depth).putIn(this);
      this.leftSurface = new Rectangle(depth, height);
      this.leftSurface.rotateY(PI / 2).moveZTo(depth).putIn(this);
      this.rightSurface = new Rectangle(depth, height);
      this.rightSurface.rotateY(PI / 2).moveZTo(depth).moveXTo(width).putIn(this);
      this.originToCenter();
      _ref = this._children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        child.fill.withHsl(this._initialHue, this._initialSaturation, rand(50, 90));
        child.setOrigin(0, 0, 0);
      }
      return this;
    };

    Cube.prototype.originToCenter = function() {
      this.setOrigin(this.width / 2, this.height / 2, this.depth / 2);
      return this;
    };

    Cube.prototype.originToBottom = function() {
      this.setOrigin(this.width / 2, this.height, this.depth / 2);
      return this;
    };

    Cube.prototype.originToTop = function() {
      this.setOrigin(this.width / 2, 0, this.depth / 2);
      return this;
    };

    Cube.prototype.clone = function() {
      var newEl;

      newEl = Object.create(this.constructor.prototype);
      newEl.topSurface = null;
      newEl.bottomSurface = null;
      newEl.frontSurface = null;
      newEl.backSurface = null;
      newEl.leftSurface = null;
      newEl.rightSurface = null;
      Cube.__super__.clone.call(this, newEl);
      newEl.topSurface = newEl._children[0];
      newEl.bottomSurface = newEl._children[1];
      newEl.frontSurface = newEl._children[2];
      newEl.backSurface = newEl._children[3];
      newEl.leftSurface = newEl._children[4];
      newEl.rightSurface = newEl._children[5];
      return newEl;
    };

    return Cube;

  })(El);
});
