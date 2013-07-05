define(['../../visuals/lightmatrix'], function(LightMatrix) {
  var fn, key, __Transforms, _fn, _ref;

  __Transforms = (function() {
    function __Transforms() {}

    __Transforms.prototype._initTransform = function() {
      return this._transform = new LightMatrix;
    };

    return __Transforms;

  })();
  _ref = LightMatrix.prototype;
  _fn = function() {
    var _key;

    _key = key;
    __Transforms.prototype[_key] = function() {
      this._transform[_key].apply(this._transform, arguments);
      return this.updateTransform();
    };
    return this;
  };
  for (key in _ref) {
    fn = _ref[key];
    if (key[0] === '_' || key === 'temporarily' || key === 'commit' || key === 'rollBack' || key === 'toCss' || key === 'toArray' || key === 'toMatrix') {
      continue;
    }
    _fn();
  }
  return __Transforms;
});
