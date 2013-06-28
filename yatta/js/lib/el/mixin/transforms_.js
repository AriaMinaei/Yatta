define(['../../visuals/lightmatrix', '../tools/css'], function(LightMatrix, css) {
  var Transforms_, fn, key, _fn, _ref;

  Transforms_ = (function() {
    function Transforms_() {}

    Transforms_.prototype._initTransforms = function() {
      return this._transform = new LightMatrix;
    };

    Transforms_.prototype._updateTransform = function(withAnim) {
      var _this = this;

      if (withAnim == null) {
        withAnim = false;
      }
      this._do(function() {
        return css.setTransform(_this.node, _this._transform.toPlainCss());
      });
      return this;
    };

    Transforms_.getter('transform', function() {
      return this._transform._current;
    });

    return Transforms_;

  })();
  _ref = LightMatrix.prototype;
  _fn = function() {
    var _key;

    _key = key;
    Transforms_.prototype[_key] = acceptLazyArgs(function() {
      this._transform[_key].apply(this._transform, arguments);
      return this._updateTransform();
    });
    return this;
  };
  for (key in _ref) {
    fn = _ref[key];
    if (key[0] === '_' || key === 'temporarily' || key === 'commit' || key === 'rollBack' || key === 'toCss' || key === 'toPlainCss' || key === 'toArray' || key === 'toMatrix') {
      continue;
    }
    _fn();
  }
  return Transforms_;
});
