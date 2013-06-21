var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el', '../tools'], function(El, tools) {
  var Type;

  return Type = (function(_super) {
    __extends(Type, _super);

    function Type(text) {
      var node;

      if (text == null) {
        text = '';
      }
      node = document.createElement('div');
      node.classList.add('type');
      Type.__super__.constructor.call(this, node);
      this.setText(text);
      this.setSize();
      this.setColor();
      this.setFace();
    }

    Type.prototype.setText = function(text) {
      this._text = text;
      this._applyText();
      return this;
    };

    Type.prototype._applyText = function() {
      this.node.innerHTML = this._text;
      return this;
    };

    Type.prototype.setFace = function(face) {
      if (!face) {
        this._face = Type.defaultFace;
      } else {
        this._face = face;
      }
      this._applyFace();
      return this;
    };

    Type.prototype._applyFace = function() {
      this.node.style.fontFamily = this._face;
      return this;
    };

    Type.prototype.setSize = function(size) {
      if (!size) {
        this._size = Type.defaultSize;
      } else {
        this._size = size;
      }
      this._applySize();
      return this;
    };

    Type.prototype._applySize = function() {
      this.node.style.fontSize = this._size + 'px';
      return this;
    };

    Type.prototype.setColor = function(r, g, b) {
      if (arguments.length === 0) {
        this._color = Type.defaultColor;
      } else {
        this._color = tools.rgb(r, g, b);
      }
      this._applyColor();
      return this;
    };

    Type.prototype._applyColor = function() {
      this.node.style.color = this._color;
      this._applyStroke();
      return this;
    };

    Type.prototype._applyStroke = function() {
      if (tools.needsTextStroke()) {
        this.node.style.webkitTextStroke = '1.5 ' + this._color;
      }
      return this;
    };

    Type.defaultFace = '"HelveticaNeueLT Std Thin"';

    Type.setDefaultFace = function(face) {
      if (face == null) {
        face = "HelveticaNeueLT Std Thin";
      }
      return this.defaultFace = face;
    };

    Type.defaultSize = 36;

    Type.setDefaultSize = function(size) {
      if (size == null) {
        size = 36;
      }
      return this.defaultSize = size;
    };

    Type.defaultColor = tools.rgb(255, 255, 255);

    Type.setDefaultColor = function(r, g, b) {
      if (arguments.length === 0) {
        this.defaultColor = tools.rgb(255, 255, 255);
      }
      return this.defaultColor = tools.rgb(r, g, b);
    };

    return Type;

  })(El);
});
