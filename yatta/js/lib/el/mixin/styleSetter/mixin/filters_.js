define(['../../../../visuals/filter', '../../../tools/css'], function(CSSFilter, css) {
  var ClassPrototype, Filters_, method, methodName, _fn, _ref;

  Filters_ = (function() {
    function Filters_() {}

    Filters_.prototype.__initMixinFilters = function() {
      this._cssFilter = new CSSFilter;
      this._shouldUpdateFilters = false;
      this._lastTimeUpdatedFilters = 0;
      this._filtersUpdateCallbackAttached = false;
      return this._updateFiltersCallback = this._getFiltersCallback();
    };

    Filters_.prototype._getFiltersCallback = function() {
      var _this = this;

      return function(t) {
        if (!_this._shouldUpdateFilters) {
          if (t - _this._lastTimeUpdatedFilters > 2000) {
            frames.cancelAfterEachFrame(_this._updateFiltersCallback);
            _this._filtersUpdateCallbackAttached = false;
          }
          return;
        }
        _this._actuallyUpdateFilters();
        _this._lastTimeUpdatedFilters = t;
        _this._shouldUpdateFilters = false;
      };
    };

    Filters_.prototype.__clonerForFilters = function(newStyleSetter) {
      newStyleSetter._shouldUpdateFilters = false;
      newStyleSetter._lastTimeUpdatedFilters = 0;
      newStyleSetter._filtersUpdateCallbackAttached = false;
      newStyleSetter._updateFiltersCallback = newStyleSetter._getFiltersCallback();
    };

    Filters_.prototype._updateFilters = function() {
      if (this._shouldUpdateFilters) {
        return this;
      }
      if (!this._filtersUpdateCallbackAttached) {
        frames.afterEachFrame(this._updateFiltersCallback);
        this._filtersUpdateCallbackAttached = true;
      }
      this._shouldUpdateFilters = true;
      return this;
    };

    Filters_.prototype._actuallyUpdateFilters = function() {
      css.setCssFilter(this.node, this._cssFilter.toCss());
      return this;
    };

    return Filters_;

  })();
  ClassPrototype = Filters_.prototype;
  _ref = CSSFilter.prototype;
  _fn = function() {
    var _methodName;

    _methodName = methodName;
    if (method.length === 0) {
      return ClassPrototype[_methodName] = function() {
        this._cssFilter[_methodName]();
        this._updateFilters();
        return this;
      };
    } else if (method.length === 1) {
      return ClassPrototype[_methodName] = function(arg0) {
        this._cssFilter[_methodName](arg0);
        this._updateFilters();
        return this;
      };
    } else if (method.length === 2) {
      return ClassPrototype[_methodName] = function(arg0, arg1) {
        this._cssFilter[_methodName](arg0, arg1);
        this._updateFilters();
        return this;
      };
    } else if (method.length === 3) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2) {
        this._cssFilter[_methodName](arg0, arg1, arg2);
        this._updateFilters();
        return this;
      };
    } else if (method.length === 4) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3) {
        this._cssFilter[_methodName](arg0, arg1, arg2, arg3);
        this._updateFilters();
        return this;
      };
    } else if (method.length === 5) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3, arg4) {
        this._cssFilter[_methodName](arg0, arg1, arg2, arg3, arg4);
        this._updateFilters();
        return this;
      };
    } else {
      throw Error("Methods with more than 5 args are not supported.");
    }
  };
  for (methodName in _ref) {
    method = _ref[methodName];
    if (!(method instanceof Function)) {
      continue;
    }
    if (ClassPrototype[methodName] != null) {
      continue;
    }
    if (methodName[0] === '_') {
      continue;
    }
    if (methodName === 'toCss') {
      continue;
    }
    _fn();
  }
  return Filters_;
});
