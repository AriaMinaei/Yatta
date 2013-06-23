define(function() {
  var fn, key, __Filters, _fn, _ref;

  __Filters = (function() {
    function __Filters() {}

    __Filters.prototype._initFilters = function() {
      return this._cssFilter = new CSSFilter;
    };

    return __Filters;

  })();
  _ref = CSSFilter.prototype;
  _fn = function() {
    var _key;

    _key = key;
    __Filters.prototype[_key] = function() {
      this._cssFilter[_key].apply(this._cssFilter, arguments);
      return this.updateCssFilter();
    };
    return this;
  };
  for (key in _ref) {
    fn = _ref[key];
    if (key[0] === '_' || key === 'toCss') {
      continue;
    }
    _fn();
  }
  return __Filters;
});
