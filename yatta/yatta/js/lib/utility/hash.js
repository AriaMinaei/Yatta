var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(['./array'], function(array) {
  var Hash;

  return Hash = (function() {
    function Hash() {
      this._indexes = {};
      this._pairs = {};
      this.array = [];
      this._len = 0;
    }

    Hash.prototype.getIndexOf = function(name) {
      return this._indexes[name];
    };

    Hash.prototype.set = function(name, value) {
      var index;

      if (this._indexes[name] === void 0) {
        this._pairs[name] = value;
        this.array.push(value);
        index = this.array.length - 1;
        this._indexes[name] = index;
        this._len++;
      } else {
        this._pairs[name] = value;
        this.array[this._indexes[name]] = value;
      }
      return this;
    };

    Hash.prototype.get = function(name) {
      return this._pairs[name];
    };

    Hash.prototype.each = function(func, i, ascending) {
      if (i == null) {
        i = null;
      }
      if (ascending == null) {
        ascending = true;
      }
      if (ascending) {
        if (i == null) {
          i = 0;
        }
        while (true) {
          if (i >= this._len) {
            break;
          }
          func(this.array[i], i);
          i++;
        }
      } else {
        if (i == null) {
          i = this.array.length - 1;
        }
        while (true) {
          if (i < 0) {
            break;
          }
          func(this.array[i], i);
          i--;
        }
      }
      return null;
    };

    Hash.prototype.remove = function(name) {
      var index, value, _ref;

      if (this._indexes[name] === void 0) {
        return this;
      }
      this._len--;
      this._pairs[name] = void 0;
      index = this._indexes[name];
      array.pluck(this.array, index);
      this._indexes[name] = void 0;
      _ref = this._indexes;
      for (name in _ref) {
        value = _ref[name];
        if (value === void 0) {
          continue;
        }
        if (value > index) {
          this._indexes[name] = value - 1;
        }
      }
      return this;
    };

    return Hash;

  })();
});
