define(['../../../../visuals/typedMatrix', '../../../tools/css'], function(TypedMatrix, css) {
  var ClassPrototype, Transforms_, method, methodName, _fn, _ref;

  Transforms_ = (function() {
    function Transforms_() {}

    Transforms_.prototype.__initMixinTransforms = function() {
      this._transformer = new TypedMatrix;
      this._shouldUpdateTransforms = false;
    };

    Transforms_.prototype.__clonerForTransforms = function(newStyleSetter) {
      newStyleSetter._shouldUpdateTransforms = false;
    };

    Transforms_.prototype._updateTransforms = function() {
      if (!this._shouldUpdateTransforms) {
        return;
      }
      this._shouldUpdateTransforms = false;
      return this._actuallyUpdateTransforms();
    };

    Transforms_.prototype._scheduleTransformsUpdate = function() {
      this._shouldUpdateTransforms = true;
      return this._scheduleUpdate();
    };

    Transforms_.prototype._actuallyUpdateTransforms = function() {
      css.setTransform(this.node, this._transformer.toPlainCss());
      return this;
    };

    Transforms_.prototype.go3d = function() {
      css.setTransformStyle(this.node, 'preserve-3d');
      return this;
    };

    return Transforms_;

  })();
  ClassPrototype = Transforms_.prototype;
  _ref = TypedMatrix.prototype;
  _fn = function() {
    var _methodName;

    _methodName = methodName;
    if (method.length === 0) {
      return ClassPrototype[_methodName] = function() {
        this._transformer[_methodName]();
        this._scheduleTransformsUpdate();
        return this;
      };
    } else if (method.length === 1) {
      return ClassPrototype[_methodName] = function(arg0) {
        this._transformer[_methodName](arg0);
        this._scheduleTransformsUpdate();
        return this;
      };
    } else if (method.length === 2) {
      return ClassPrototype[_methodName] = function(arg0, arg1) {
        this._transformer[_methodName](arg0, arg1);
        this._scheduleTransformsUpdate();
        return this;
      };
    } else if (method.length === 3) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2) {
        this._transformer[_methodName](arg0, arg1, arg2);
        this._scheduleTransformsUpdate();
        return this;
      };
    } else if (method.length === 4) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3) {
        this._transformer[_methodName](arg0, arg1, arg2, arg3);
        this._scheduleTransformsUpdate();
        return this;
      };
    } else if (method.length === 5) {
      return ClassPrototype[_methodName] = function(arg0, arg1, arg2, arg3, arg4) {
        this._transformer[_methodName](arg0, arg1, arg2, arg3, arg4);
        this._scheduleTransformsUpdate();
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
    if (methodName === 'temporarily' || methodName === 'commit' || methodName === 'rollBack' || methodName === 'toCss' || methodName === 'toPlainCss' || methodName === 'toArray' || methodName === 'toMatrix') {
      continue;
    }
    _fn();
  }
  return Transforms_;
});
