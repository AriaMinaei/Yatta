var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(['./_common'], function(common) {
  return {
    _clone: common._cloneArray.bind(common),
    clone: function(what) {
      if (!Array.isArray(what)) {
        throw Error("`what` isn\'t an array.");
      }
      return this._clone.apply(this, arguments);
    },
    /*
    	Tries to turn anything into an array.
    */

    from: function(r) {
      return Array.prototype.slice.call(r);
    },
    /*
    	Clone of an array. Properties will be shallow copies.
    */

    simpleClone: function(a) {
      return a.slice(0);
    },
    pluck: function(a, i) {
      var index, value, _i, _len;

      for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
        value = a[index];
        if (index > i) {
          a[index - 1] = a[index];
        }
      }
      a.length = a.length - 1;
      return a;
    },
    pluckItem: function(a, item) {
      var i;

      i = a.indexOf(item);
      if (i !== -1) {
        this.pluck(a, i);
      }
      return a;
    },
    pluckMultiple: function(array, indexesToRemove) {
      var i, removedSoFar, _i, _len;

      removedSoFar = 0;
      indexesToRemove.sort();
      for (_i = 0, _len = indexesToRemove.length; _i < _len; _i++) {
        i = indexesToRemove[_i];
        this.pluck(array, i - removedSoFar);
        removedSoFar++;
      }
      return array;
    }
  };
});
