define(['../el/el', '../el/rectangle', '../el/ellipse', '../el/type', '../el/image', '../el/container', '../el/display'], function(El, Rectangle, Ellipse, Type, Image, Container, Display) {
  var display;

  display = new Display(document.body);
  window.Rectangle = Rectangle;
  window.Ellipse = Ellipse;
  window.Container = Container;
  window.Type = Type;
  window.Image = Image;
  return window.display = display;
});
