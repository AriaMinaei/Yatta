var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el'], function(El) {
  var Display;

  return Display = (function(_super) {
    __extends(Display, _super);

    function Display(node) {
      if (node == null) {
        node = document.body;
      }
      Display.__super__.constructor.call(this, node);
      this._displayCoords = {
        centerX: 0,
        centerY: 0,
        width: 0,
        height: 0
      };
      this._displayCoordsInitialized = false;
    }

    Display.prototype._getDisplayCoords = function() {
      if (!this._displayCoordsInitialized) {
        this._displayCoords.width = window.innerWidth;
        this._displayCoords.height = window.innerHeight;
        this._displayCoords.centerX = parseInt(this._displayCoords.width / 2);
        this._displayCoords.centerY = parseInt(this._displayCoords.height / 2);
        this._displayCoordsInitialized = true;
      }
      return this._displayCoords;
    };

    Display.getter('centerX', function() {
      return this._getDisplayCoords().centerX;
    });

    Display.getter('centerY', function() {
      return this._getDisplayCoords().centerY;
    });

    Display.getter('width', function() {
      return this._getDisplayCoords().width;
    });

    Display.getter('height', function() {
      return this._getDisplayCoords().height;
    });

    return Display;

  })(El);
});
