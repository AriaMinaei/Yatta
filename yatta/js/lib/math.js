define(['./utility/generals'], function() {
  var math;

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
  math._floor = acceptAndReturnLazily(math.floor);
  math._ceil = acceptAndReturnLazily(math.ceil);
  math._round = acceptAndReturnLazily(math.round);
  math._abs = acceptAndReturnLazily(math.abs);
  math._cos = acceptAndReturnLazily(math.cos);
  math._acos = acceptAndReturnLazily(math.acos);
  math._sin = acceptAndReturnLazily(math.sin);
  math._asin = acceptAndReturnLazily(math.asin);
  math._tan = acceptAndReturnLazily(math.tan);
  math._atan = acceptAndReturnLazily(math.atan);
  math._pow = acceptAndReturnLazily(math.pow);
  math._sqrt = acceptAndReturnLazily(math.sqrt);
  math._random = acceptAndReturnLazily(math.random);
  math._rand = acceptAndReturnLazily(math.rand);
  math._log = acceptAndReturnLazily(math.log);
  math._rad = acceptAndReturnLazily(math.rad);
  math._deg = acceptAndReturnLazily(math.deg);
  return math;
});
