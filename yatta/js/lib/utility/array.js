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
      var index, removed, value, _i, _len;

      removed = 0;
      for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
        value = a[index];
        if (value === item) {
          removed++;
          continue;
        }
        if (removed !== 0) {
          a[index - removed] = a[index];
        }
      }
      a.length = a.length - removed;
      return a;
    },
    pluckOneItem: function(a, item) {
      var index, reached, value, _i, _len;

      reached = false;
      for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
        value = a[index];
        if (!reached) {
          if (value === item) {
            reached = true;
            continue;
          }
        } else {
          a[index - 1] = a[index];
        }
      }
      a.length = a.length - 1;
      return a;
    },
    pluckByCallback: function(a, cb) {
      var index, removed, value, _i, _len;

      removed = 0;
      for (index = _i = 0, _len = a.length; _i < _len; index = ++_i) {
        value = a[index];
        if (cb(value, index)) {
          removed++;
          continue;
        }
        if (removed !== 0) {
          a[index - removed] = a[index];
        }
      }
      a.length = a.length - removed;
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
    },
    injectByCallback: function(a, toInject, shouldInject) {
      var i, len, val, valA, valB, _i, _len;

      valA = null;
      valB = null;
      len = a.length;
      if (len < 1) {
        a.push(toInject);
        return a;
      }
      for (i = _i = 0, _len = a.length; _i < _len; i = ++_i) {
        val = a[i];
        valA = valB;
        valB = val;
        if (shouldInject(valA, valB, toInject)) {
          return a.splice(i, 0, toInject);
        }
      }
      a.push(toInject);
      return a;
    },
    injectInIndex: function(a, index, toInject) {
      var i, len, toPut, toPutNext;

      len = a.length;
      i = index;
      if (len < 1) {
        a.push(toInject);
        return a;
      }
      toPut = toInject;
      toPutNext = null;
      for(; i <= len; i++){

			toPutNext = a[i];

			a[i] = toPut;

			toPut = toPutNext;

		};
      return null;
    }
  };
});
