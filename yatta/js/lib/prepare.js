define(['require', './env/setup'], function(require) {
  var callThem, ready, toCallWhenReady;

  toCallWhenReady = [];
  ready = false;
  callThem = function() {
    var fn, _i, _len;

    if (!ready) {
      return;
    }
    for (_i = 0, _len = toCallWhenReady.length; _i < _len; _i++) {
      fn = toCallWhenReady[_i];
      fn();
    }
    toCallWhenReady.length = 0;
    return null;
  };
  require(['./prepare/elements', './prepare/forUser'], function(prepareElements, prepareForUser) {
    ready = true;
    return callThem();
  });
  return function(fn) {
    toCallWhenReady.push(fn);
    return null;
  };
});
