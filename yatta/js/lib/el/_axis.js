var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el', './cube', './type'], function(El, Cube, Type) {
  var _Axis;

  return _Axis = (function(_super) {
    __extends(_Axis, _super);

    _Axis._pool = [];

    _Axis.give = function() {
      if (this._pool.length > 0) {
        return this._pool.pop();
      } else {
        return new _Axis;
      }
    };

    _Axis.take = function(axis) {
      this._pool.push(axis);
    };

    function _Axis(_sizeMultiplier, _lengthToDepth) {
      var node;

      this._sizeMultiplier = _sizeMultiplier != null ? _sizeMultiplier : 1;
      this._lengthToDepth = _lengthToDepth != null ? _lengthToDepth : 30;
      node = document.createElement('div');
      node.classList.add('axis');
      _Axis.__super__.constructor.call(this, node);
      this.go3d();
      this._createAxis();
    }

    _Axis.prototype._createAxis = function() {
      var child, _i, _len, _ref;

      this.xAxis = new Cube(this._sizeMultiplier * this._lengthToDepth * 5, this._sizeMultiplier * 5, this._sizeMultiplier * 5, 0, 70);
      this.xAxis.moveX(this._sizeMultiplier * 5);
      this.xAxis.putIn(this);
      this.yAxis = new Cube(this._sizeMultiplier * 5, this._sizeMultiplier * this._lengthToDepth * 5, this._sizeMultiplier * 5, 210, 70);
      this.yAxis.moveY(this._sizeMultiplier * 5);
      this.yAxis.putIn(this);
      this.zAxis = new Cube(this._sizeMultiplier * 5, this._sizeMultiplier * 5, this._sizeMultiplier * this._lengthToDepth * 5, 64, 70);
      this.zAxis.moveZ(this._sizeMultiplier * 5);
      this.zAxis.putIn(this);
      this._root = new Cube(this._sizeMultiplier * 5, this._sizeMultiplier * 5, this._sizeMultiplier * 5);
      this._root.each(function(side) {
        return side.fill.withRgb(0, 0, 0);
      });
      this._root.putIn(this);
      _ref = this._children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        child.moveX(-this._sizeMultiplier * 5 / 2).moveY(-this._sizeMultiplier * 5 / 2).moveZ(-this._sizeMultiplier * 5 / 2);
      }
      return this;
    };

    _Axis.prototype.clone = function() {
      var newEl;

      newEl = Object.create(this.constructor.prototype);
      return _Axis.__super__.clone.call(this, newEl);
    };

    return _Axis;

  })(El);
});
