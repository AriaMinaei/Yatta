var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el', './type/_letter', './tools/css', './type/_tools'], function(El, _Letter, css, _tools) {
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
      this._letters = [];
      this.setText(text);
      this.setSize();
      this.setColor();
      this.setFace();
    }

    Type.prototype.setText = acceptLazyArgs(function(text) {
      this._text = text;
      this._applyText();
      return this;
    });

    Type.prototype._applyText = function() {
      var i, l, letter, lettersToApply, newLetter, _i, _len;

      lettersToApply = this._text.split('');
      for (i = _i = 0, _len = lettersToApply.length; _i < _len; i = ++_i) {
        l = lettersToApply[i];
        if (this._letters[i] != null) {
          this._letters[i].setLetter(l);
        } else {
          newLetter = new _Letter(l);
          newLetter.putIn(this);
          this._letters.push(newLetter);
        }
      }
      while (true) {
        if (this._letters.length <= i) {
          break;
        }
        letter = this._letters.pop();
        letter.remove();
      }
      return this;
    };

    Type.prototype.setFace = acceptLazyArgs(function(face) {
      if (!face) {
        this._face = Type.defaultFace;
      } else {
        this._face = face;
      }
      this._applyFace();
      return this;
    });

    Type.prototype._applyFace = function() {
      this.node.style.fontFamily = this._face;
      return this;
    };

    Type.prototype.setSize = acceptLazyArgs(function(size) {
      if (!size) {
        this._size = Type.defaultSize;
      } else {
        this._size = size;
      }
      this._applySize();
      return this;
    });

    Type.prototype._applySize = function() {
      this.node.style.fontSize = this._size + 'px';
      return this;
    };

    Type.prototype.setColor = acceptLazyArgs(function(r, g, b) {
      if (arguments.length === 0) {
        this._color = Type.defaultColor;
      } else {
        this._color = css.rgb(r, g, b);
      }
      this._applyColor();
      return this;
    });

    Type.prototype._applyColor = function() {
      this.node.style.color = this._color;
      this._applyStroke();
      return this;
    };

    Type.prototype._applyStroke = function() {
      if (_tools.needsTextStroke()) {
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

    Type.defaultColor = css.rgb(255, 255, 255);

    Type.setDefaultColor = function(r, g, b) {
      if (arguments.length === 0) {
        this.defaultColor = css.rgb(255, 255, 255);
      }
      return this.defaultColor = css.rgb(r, g, b);
    };

    return Type;

  })(El);
});
