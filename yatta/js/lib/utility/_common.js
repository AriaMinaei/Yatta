var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(function() {
  var common;

  return common = {
    /*
    	Checks to see if o is an object, and it isn't an instance
    	of some class.
    */

    isBareObject: function(o) {
      if ((o != null) && o.constructor === Object) {
        return true;
      }
      return false;
    },
    /*
    	Returns type of an object, including:
    	undefined, null, string, number, array,
    	arguments, element, textnode, whitespace, and object
    */

    typeOf: function(item) {
      var _ref;

      if (item === null) {
        return 'null';
      }
      if (typeof item !== 'object') {
        return typeof item;
      }
      if (Array.isArray(item)) {
        return 'array';
      }
      if (item.nodeName) {
        if (item.nodeType === 1) {
          return 'element';
        }
        if (item.nodeType === 3) {
          return (_ref = /\S/.test(item.nodeValue)) != null ? _ref : {
            'textnode': 'whitespace'
          };
        }
      } else if (typeof item.length === 'number') {
        if (item.callee) {
          return 'arguments';
        }
      }
      return typeof item;
    },
    clone: function(item, includePrototype) {
      if (includePrototype == null) {
        includePrototype = false;
      }
      switch (common.typeOf(item)) {
        case 'array':
          return common._cloneArray(item, includePrototype);
        case 'object':
          return common._cloneObject(item, includePrototype);
        default:
          return item;
      }
    },
    /*
    	Deep clone of an object.
    	From MooTools
    */

    _cloneObject: function(o, includePrototype) {
      var clone, key;

      if (includePrototype == null) {
        includePrototype = false;
      }
      if (common.isBareObject(o)) {
        clone = {};
        for (key in o) {
          clone[key] = common.clone(o[key], includePrototype);
        }
        return clone;
      } else {
        if (!includePrototype) {
          return o;
        }
        if (o instanceof Function) {
          return o;
        }
        clone = Object.create(o.constructor.prototype);
        for (key in o) {
          if (o.hasOwnProperty(key)) {
            clone[key] = common.clone(o[key], includePrototype);
          }
        }
        return clone;
      }
    },
    /*
    	Deep clone of an array.
    	From MooTools
    */

    _cloneArray: function(a, includePrototype) {
      var clone, i;

      if (includePrototype == null) {
        includePrototype = false;
      }
      i = a.length;
      clone = new Array(i);
      while (i--) {
        clone[i] = common.clone(a[i], includePrototype);
      }
      return clone;
    }
  };
});
