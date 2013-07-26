define(['./bezier'], function(Bezier) {
  var Easing;

  Easing = {
    linear: function(p) {
      return p;
    },
    define: function(name, func) {
      var _func, _name;

      if (typeof name === 'object') {
        for (_name in name) {
          _func = name[_name];
          Easing.define(_name, _func);
        }
        return;
      }
      return Easing[name] = {
        easeIn: func,
        easeOut: function(p) {
          return 1 - func(1 - p);
        },
        easeInOut: function(p) {
          if (p <= 0.5) {
            return 0.5 * func(p * 2);
          } else {
            return 0.5 * (2 - func(2 * (1 - p)));
          }
        }
      };
    },
    get: function(func) {
      var b, f, part, parts, _i, _len;

      if (func instanceof Function) {
        return func;
      } else if ((arguments[1] != null) && (arguments[2] != null) && (arguments[3] != null)) {
        b = new Bezier(arguments[0], arguments[1], arguments[2], arguments[3]);
        return function(p) {
          return b.solve(p, Bezier.epsilon);
        };
      }
      if (typeof func !== 'string') {
        throw Error("func should either be a function or a string, like cubic.easeOut");
      }
      parts = func.split('.');
      f = Easing;
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        f = f[part];
      }
      if (typeof f === 'undefined') {
        throw Error("Cannot find easing function `" + func + "`");
      }
      return f;
    }
  };
  Easing.define({
    quad: function(p) {
      return Math.pow(p, 2);
    },
    cubic: function(p) {
      return Math.pow(p, 3);
    },
    quart: function(p) {
      return Math.pow(p, 4);
    },
    quint: function(p) {
      return Math.pow(p, 5);
    },
    expo: function(p) {
      return Math.pow(2, 8 * (p - 1));
    },
    circ: function(p) {
      return 1 - Math.sin(Math.cos(p));
    },
    sine: function(p) {
      return 1 - Math.cos(p * Math.PI / 2);
    }
  });
  return Easing;
});
