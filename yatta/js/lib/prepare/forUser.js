define(['../userTools/math', '../userTools/param', '../userTools/loading'], function(math, Param, loading) {
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
  window.every = frames.every;
  window.wait = frames.wait;
  window.load = loading.load;
  window.loadWithIndicator = loading.loadWithIndicator;
  return null;
});
