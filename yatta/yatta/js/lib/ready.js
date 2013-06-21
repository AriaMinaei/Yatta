define(['./display', './el/rectangle', './el/ellipse', './el/type', './el/image', './el/container', './math', './tools'], function(display, Rectangle, Ellipse, Type, Image, Container, math, tools) {
  var key;

  window.display = display;
  window.Rectangle = Rectangle;
  window.Ellipse = Ellipse;
  window.Container = Container;
  window.Type = Type;
  window.Image = Image;
  for (key in math) {
    window[key] = math[key];
  }
  window.wait = tools.wait;
  window.count = tools.count;
  window.onFrame = tools.onFrame;
  window.centerX = tools.centerX;
  return window.centerY = tools.centerY;
});
