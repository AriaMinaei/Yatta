define(['./tools'], function(tools) {
  var body, display;

  body = document.body;
  return display = {
    setBgColor: function(r, g, b) {
      return tools.setBgColor(body, r, g, b);
    }
  };
});
