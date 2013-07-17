define(['../el/el', '../el/rectangle', '../el/ellipse', '../el/type', '../el/image', '../el/container', '../el/cube', '../el/display', '../el/camera', '../el/_axis'], function(El, Rectangle, Ellipse, Type, Image, Container, Cube, Display, Camera, _Axis) {
  var display;

  display = new Display(document.body);
  window.Rectangle = Rectangle;
  window.Ellipse = Ellipse;
  window.Type = Type;
  window.Image = Image;
  window.Container = Container;
  window.Cube = Cube;
  window._Axis = _Axis;
  window.display = display;
  return window.Camera = Camera;
});
