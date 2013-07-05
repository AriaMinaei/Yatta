define(function() {
  var tools;

  tools = {};
  tools.needsTextStroke = (function() {
    var _needsTextStroke;

    _needsTextStroke = null;
    return function() {
      if (_needsTextStroke === null) {
        if (navigator.appVersion.indexOf('Chrome') !== -1 && navigator.appVersion.indexOf('Windows') !== -1) {
          _needsTextStroke = true;
        } else {
          _needsTextStroke = false;
        }
      }
      return _needsTextStroke;
    };
  })();
  return tools;
});
