define(['./el/el', './el/rectangle', './el/ellipse', './el/type', './el/image', './el/container', './math', './tools', './tools/param'], function(El, Rectangle, Ellipse, Type, Image, Container, math, tools, Param) {
  var key, p;

  window.display = new El(document.body);
  window.Rectangle = Rectangle;
  window.Ellipse = Ellipse;
  window.Container = Container;
  window.Type = Type;
  window.Image = Image;
  for (key in math) {
    window[key] = math[key];
  }
  window.wait = tools.wait;
  window.every = tools.every;
  window.count = tools.count;
  window.onFrame = tools.onFrame;
  window.centerX = tools.centerX;
  window.centerY = tools.centerY;
  p = new Param;
  window.param = function() {
    return p.param.apply(p, arguments);
  };
  return window._param = returnLazily(function() {
    return p.param.apply(p, arguments);
  });
});
