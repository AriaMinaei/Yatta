define(['../../../../visuals/filter', '../../../tools/css'], function(CSSFilter, css) {
  var ClassPrototype, Filters_, method, methodName, _fn, _ref;

  Filters_ = (function() {
    function Filters_() {}

    Filters_.prototype.__initMixinFilters = function() {
      this._cssFilter = new CSSFilter;
      return this._shouldUpdateFilters = false;
    };

    Filters_.prototype.__clonerForFilters = function(newStyleSetter) {
      newStyleSetter._shouldUpdateFilters = false;
    };

    Filters_.prototype._updateFilters = function() {
      if (!this._shouldUpdateFilters) {
        return;
      }
      this._shouldUpdateFilters = false;
      return this._actuallyUpdateFilters();
    };

    Filters_.prototype._scheduleFiltersUpdate = function() {
      this._shouldUpdateFilters = true;
      return this._scheduleUpdate();
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
        this._scheduleFiltersUpdate();
        return this;
      };
    } else if (method.length === 1) {
      return ClassPrototype[_methodName] = function(arg0) {
        this._cssFilter[_methodName](arg0);
        this._scheduleFiltersUpdate();
        return this;
      };
    } else if (method.length === 2) {
      return ClassPrototype[_methodName] = function(arg0, arg1) {
        this._cssFilter[_methodName](arg0, arg1);
        this._scheduleFiltersUpdate();
        return this;
      };
    } else if (method.length === 3) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2) {
        this._cssFilter[_methodName](arg0, arg1, arg2);
        this._scheduleFiltersUpdate();
        return this;
      };
    } else if (method.length === 4) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3) {
        this._cssFilter[_methodName](arg0, arg1, arg2, arg3);
        this._scheduleFiltersUpdate();
        return this;
      };
    } else if (method.length === 5) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3, arg4) {
        this._cssFilter[_methodName](arg0, arg1, arg2, arg3, arg4);
        this._scheduleFiltersUpdate();
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
