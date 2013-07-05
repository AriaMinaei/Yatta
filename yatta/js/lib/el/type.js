var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['./el', './type/typography_', './type/_letter'], function(El, Typography_, _Letter) {
  var Type;

  return mixing(Typography_, Type = (function(_super) {
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
      Type.__initMixinsFor(this);
      this._initTypography();
    }

    Type.prototype.setText = function(text) {
      this._text = text;
      this._applyText();
      return this;
    };

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

    return Type;

  })(El));
});
