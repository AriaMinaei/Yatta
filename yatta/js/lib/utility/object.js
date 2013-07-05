var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(['./_common'], function(common) {
  var object;

  return object = {
    isBareObject: common.isBareObject.bind(common),
    /*
    	if 'what' is an object, but an instance of some class,
    	like: what = new Question
    	object.isInstance what # yes
    */

    isInstance: function(what) {
      return !this.isBareObject(what);
    },
    /*
    	Alias to common.typeOf
    */

    typeOf: common.typeOf.bind(common),
    /*
    	Alias to common.clone
    */

    clone: common.clone.bind(common),
    /*
    	Empties an object of its properties.
    */

    empty: function(o) {
      var prop;

      for (prop in o) {
        if (o.hasOwnProperty(prop)) {
          delete o[prop];
        }
      }
      return o;
    },
    /*
    	Empties an o. Doesn't check for hasOwnProperty, so it's a tiny
    	bit faster. Use it for plain objects.
    */

    fastEmpty: function(o) {
      var property;

      for (property in o) {
        delete o[property];
      }
      return o;
    },
    /*
    	if 'from' holds a set of default values,
    	the values in 'to' will be overriden onto them, as long as
    	they're not undefined.
    */

    overrideOnto: function(onto, toOverride) {
      var key, newVal, oldVal;

      if (!this.isBareObject(toOverride) || !this.isBareObject(onto)) {
        return onto;
      }
      for (key in onto) {
        oldVal = onto[key];
        newVal = toOverride[key];
        if (newVal === void 0) {
          continue;
        }
        if (typeof newVal !== 'object' || this.isInstance(newVal)) {
          onto[key] = this.clone(newVal);
        } else {
          if (typeof oldVal !== 'object' || this.isInstance(oldVal)) {
            onto[key] = this.clone(newVal);
          } else {
            this.overrideOnto(oldVal, newVal);
          }
        }
      }
      return onto;
    },
    /*
    	Takes a clone of 'from' and runs #overrideOnto on it
    */

    override: function(onto, toOverride) {
      return this.overrideOnto(this.clone(onto), toOverride);
    },
    append: function(onto, toAppend) {
      return this.appendOnto(this.clone(onto), toAppend);
    },
    appendOnto: function(onto, toAppend) {
      var key, newVal, oldVal, _results;

      if (!this.isBareObject(toAppend) || !this.isBareObject(onto)) {
        return onto;
      }
      _results = [];
      for (key in toAppend) {
        newVal = toAppend[key];
        if (!(newVal !== void 0 && toAppend.hasOwnProperty(key))) {
          continue;
        }
        if (typeof newVal !== 'object' || this.isInstance(newVal)) {
          _results.push(onto[key] = newVal);
        } else {
          oldVal = onto[key];
          if (typeof oldVal !== 'object' || this.isInstance(oldVal)) {
            _results.push(onto[key] = this.clone(newVal));
          } else {
            _results.push(this.appendOnto(oldVal, newVal));
          }
        }
      }
      return _results;
    }
  };
});
