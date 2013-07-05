define(function() {
  var key, math, val;

  math = {
    PI: Math.PI,
    floor: Math.floor,
    ceil: Math.ceil,
    round: Math.round,
    abs: Math.abs,
    cos: Math.cos,
    acos: Math.acos,
    sin: Math.sin,
    asin: Math.asin,
    tan: Math.tan,
    atan: Math.atan,
    pow: Math.pow,
    sqrt: Math.sqrt,
    random: Math.random,
    rand: function(from, to, inte) {
      var l, n, r;

      if (inte == null) {
        inte = true;
      }
      r = Math.random();
      l = to - from;
      n = l * r + from;
      if (inte) {
        return Math.round(n);
      } else {
        return n;
      }
    },
    log: Math.log,
    rad: function(deg) {
      return deg * Math.PI / 180;
    },
    deg: function(rad) {
      return 180 * rad / Math.PI;
    }
  };
  for (key in math) {
    val = math[key];
    if (!(val instanceof Function)) {
      continue;
    }
    math['_' + key] = acceptAndReturnLazily(math[key]);
  }
  return math;
});
