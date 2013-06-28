define(['../../visuals/filter', '../tools/css'], function(CSSFilter, css) {
  var Filters_, fn, key, _fn, _ref;

  Filters_ = (function() {
    function Filters_() {}

    Filters_.prototype._initFilters = function() {
      return this._cssFilter = new CSSFilter;
    };

    Filters_.prototype.updateCssFilter = function(withAnim) {
      var _this = this;

      if (withAnim == null) {
        withAnim = false;
      }
      this._do(function() {
        return css.setCssFilter(_this.node, _this._cssFilter.toCss());
      });
      return this;
    };

    return Filters_;

  })();
  _ref = CSSFilter.prototype;
  _fn = function() {
    var _key;

    _key = key;
    Filters_.prototype[_key] = acceptLazyArgs(function() {
      this._cssFilter[_key].apply(this._cssFilter, arguments);
      return this.updateCssFilter();
    });
    return this;
  };
  for (key in _ref) {
    fn = _ref[key];
    if (key[0] === '_' || key === 'toCss') {
      continue;
    }
    _fn();
  }
  return Filters_;
});
