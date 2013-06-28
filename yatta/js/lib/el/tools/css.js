define(function() {
  var css, cssPropertySetter, getCSSProp, getPossiblePropsFor;

  getCSSProp = (function() {
    var el, p;

    p = null;
    el = document.createElement('div');
    return function(possibleProps) {
      var prop, _i, _len;

      for (_i = 0, _len = possibleProps.length; _i < _len; _i++) {
        prop = possibleProps[_i];
        if (el.style[prop] !== void 0) {
          return prop;
        }
      }
      return false;
    };
  })();
  cssPropertySetter = function(prop) {
    var actualProp;

    actualProp = getCSSProp(getPossiblePropsFor(prop));
    if (!actualProp) {
      return (function() {});
    }
    return function(el, v) {
      return el.style[actualProp] = v;
    };
  };
  getPossiblePropsFor = function(prop) {
    return ['webkit' + prop[0].toUpperCase() + prop.substr(1, prop.length), 'moz' + prop[0].toUpperCase() + prop.substr(1, prop.length), prop];
  };
  return css = {
    setTransform: cssPropertySetter('transform'),
    setTransformStyle: cssPropertySetter('transformStyle'),
    setTransformOrigin: cssPropertySetter('transformOrigin'),
    setCssFilter: cssPropertySetter('filter'),
    setTransitionDuration: cssPropertySetter('transitionDuration'),
    setTransitionTimingFunction: cssPropertySetter('transitionTimingFunction'),
    rgb: function(r, g, b) {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
  };
});
