define(['../userTools/math', '../userTools/param'], function(math, Param) {
  var key;

  for (key in math) {
    window[key] = math[key];
  }
  null;
  (function() {
    var p;

    p = new Param;
    window.param = function() {
      return p.param.apply(p, arguments);
    };
    return window._param = returnLazily(function() {
      return p.param.apply(p, arguments);
    });
  })();
  window.centerX = function() {
    return window.innerWidth / 2;
  };
  window.centerY = function() {
    return window.innerHeight / 2;
  };
  return null;
});
