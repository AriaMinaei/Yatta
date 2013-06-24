define(['../../visuals/lightmatrix', '../css', '../../utility/generals'], function(LightMatrix, css) {
  var fn, key, __Transforms, _fn, _ref;

  __Transforms = (function() {
    function __Transforms() {}

    __Transforms.prototype._initTransforms = function() {
      return this._transform = new LightMatrix;
    };

    __Transforms.prototype._updateTransform = function(withAnim) {
      var _this = this;

      if (withAnim == null) {
        withAnim = false;
      }
      this._do(function() {
        return css.setTransform(_this.node, _this._transform.toPlainCss());
      });
      return this;
    };

    return __Transforms;

  })();
  _ref = LightMatrix.prototype;
  _fn = function() {
    var _key;

    _key = key;
    __Transforms.prototype[_key] = acceptLazyArgs(function() {
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
  return __Transforms;
});
