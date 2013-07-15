var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['../el'], function(El) {
  var _Letter;

  return mixing(_Letter = (function(_super) {
    __extends(_Letter, _super);

    function _Letter(letter) {
      var node;

      if (letter == null) {
        letter = '';
      }
      this._shouldCloneInnerHTML = true;
      node = document.createElement('span');
      node.classList.add('yatta-letter');
      _Letter.__super__.constructor.call(this, node, false);
      this.setLetter(letter);
      _Letter.__initMixinsFor(this);
    }

    _Letter.prototype.setLetter = function(letter) {
      this._letter = String(letter);
      return this._applyLetter();
    };

    _Letter.prototype._applyLetter = function() {
      if (this._letter === ' ') {
        return this.node.innerHTML = '&nbsp';
      } else {
        return this.node.innerHTML = this._letter;
      }
    };

    return _Letter;

  })(El));
});
