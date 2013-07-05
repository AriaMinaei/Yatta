define(['../../../visuals/lightmatrix'], function(LightMatrix) {
  var Transforms_;

  return Transforms_ = (function() {
    function Transforms_() {}

    Transforms_.prototype.__initMixinTransforms = function() {
      this._transformTo = LightMatrix.emptyStack();
      this._transformFrom = LightMatrix.emptyStack();
      return this._currentMatrix = this.el._styleSetter._transformer._current;
    };

    Transforms_.prototype._updateMovement = function(progress) {
      this._styleSetter.setMovement(this._transformFrom.mX + ((this._transformTo.mX - this._transformFrom.mX) * progress), this._transformFrom.mY + ((this._transformTo.mY - this._transformFrom.mY) * progress), this._transformFrom.mZ + ((this._transformTo.mZ - this._transformFrom.mZ) * progress));
      return null;
    };

    Transforms_.prototype.resetMovement = function() {
      this._transformFrom.mX = this._currentMatrix.mX;
      this._transformFrom.mY = this._currentMatrix.mY;
      this._transformFrom.mZ = this._currentMatrix.mZ;
      this._addUpdater('_updateMovement');
      this._transformTo.mX = 0;
      this._transformTo.mY = 0;
      this._transformTo.mZ = 0;
      return this;
    };

    Transforms_.prototype.setMovement = function(x, y, z) {
      this._transformFrom.mX = this._currentMatrix.mX;
      this._transformFrom.mY = this._currentMatrix.mY;
      this._transformFrom.mZ = this._currentMatrix.mZ;
      this._addUpdater('_updateMovement');
      this._transformTo.mX = x;
      this._transformTo.mY = y;
      this._transformTo.mZ = z;
      return this;
    };

    Transforms_.prototype.setMovementX = function(x) {
      this._transformFrom.mX = this._currentMatrix.mX;
      this._transformFrom.mY = this._currentMatrix.mY;
      this._transformFrom.mZ = this._currentMatrix.mZ;
      this._addUpdater('_updateMovement');
      this._transformTo.mX = x;
      return this;
    };

    Transforms_.prototype.setMovementY = function(y) {
      this._transformFrom.mX = this._currentMatrix.mX;
      this._transformFrom.mY = this._currentMatrix.mY;
      this._transformFrom.mZ = this._currentMatrix.mZ;
      this._addUpdater('_updateMovement');
      this._transformTo.mY = y;
      return this;
    };

    Transforms_.prototype.setMovementZ = function(z) {
      this._transformFrom.mX = this._currentMatrix.mX;
      this._transformFrom.mY = this._currentMatrix.mY;
      this._transformFrom.mZ = this._currentMatrix.mZ;
      this._addUpdater('_updateMovement');
      this._transformTo.mZ = z;
      return this;
    };

    Transforms_.prototype.move = function(x, y, z) {
      this._transformFrom.mX = this._currentMatrix.mX;
      this._transformFrom.mY = this._currentMatrix.mY;
      this._transformFrom.mZ = this._currentMatrix.mZ;
      this._addUpdater('_updateMovement');
      this._transformTo.mX = this._currentMatrix.mX + x;
      this._transformTo.mY = this._currentMatrix.mY + y;
      this._transformTo.mZ = this._currentMatrix.mZ + z;
      return this;
    };

    Transforms_.prototype.moveX = function(x) {
      this._transformFrom.mX = this._currentMatrix.mX;
      this._transformFrom.mY = this._currentMatrix.mY;
      this._transformFrom.mZ = this._currentMatrix.mZ;
      this._addUpdater('_updateMovement');
      this._transformTo.mX = this._currentMatrix.mX + x;
      return this;
    };

    Transforms_.prototype.moveY = function(y) {
      this._transformFrom.mX = this._currentMatrix.mX;
      this._transformFrom.mY = this._currentMatrix.mY;
      this._transformFrom.mZ = this._currentMatrix.mZ;
      this._addUpdater('_updateMovement');
      this._transformTo.mY = this._currentMatrix.mY + y;
      return this;
    };

    Transforms_.prototype.moveZ = function(z) {
      this._transformFrom.mX = this._currentMatrix.mX;
      this._transformFrom.mY = this._currentMatrix.mY;
      this._transformFrom.mZ = this._currentMatrix.mZ;
      this._addUpdater('_updateMovement');
      this._transformTo.mZ = this._currentMatrix.mZ + z;
      return this;
    };

    /*
    		Scale
    */


    Transforms_.prototype.resetScale = function() {
      this._transformTo.sX = 1;
      this._transformTo.sY = 1;
      this._transformTo.sZ = 1;
      return this;
    };

    Transforms_.prototype.setScale = function(x, y, z) {
      this._transformTo.sX = x;
      this._transformTo.sY = y;
      this._transformTo.sZ = z;
      return this;
    };

    Transforms_.prototype.setScaleX = function(x) {
      this._transformTo.sX = x;
      return this;
    };

    Transforms_.prototype.setScaleY = function(y) {
      this._transformTo.sY = y;
      return this;
    };

    Transforms_.prototype.setScaleZ = function(z) {
      this._transformTo.sZ = z;
      return this;
    };

    Transforms_.prototype.scale = function(x, y, z) {
      this._transformTo.sX = this._currentMatrix.sX * x;
      this._transformTo.sY = this._currentMatrix.sY * y;
      this._transformTo.sZ = this._currentMatrix.sZ * z;
      return this;
    };

    Transforms_.prototype.setScaleAll = function(x) {
      this._transformTo.sX = this._transformTo.sY = this._transformTo.sZ = x;
      return this;
    };

    Transforms_.prototype.scaleX = function(x) {
      this._transformTo.sX = this._currentMatrix.sX * x;
      return this;
    };

    Transforms_.prototype.scaleY = function(y) {
      this._transformTo.sY = this._currentMatrix.sY * y;
      return this;
    };

    Transforms_.prototype.scaleZ = function(z) {
      this._transformTo.sZ = this._currentMatrix.sZ * z;
      return this;
    };

    /*
    		Perspective
    */


    Transforms_.prototype.resetPerspective = function() {
      this._transformTo.p = 0;
      return this;
    };

    Transforms_.prototype.setPerspective = function(d) {
      this._transformTo.p = d;
      return this;
    };

    /*
    		Rotation
    */


    Transforms_.prototype.resetRotation = function() {
      this._transformTo.rX = 0;
      this._transformTo.rY = 0;
      this._transformTo.rZ = 0;
      return this;
    };

    Transforms_.prototype.setRotation = function(x, y, z) {
      this._transformTo.rX = x;
      this._transformTo.rY = y;
      this._transformTo.rZ = z;
      return this;
    };

    Transforms_.prototype.setRotationX = function(x) {
      this._transformTo.rX = x;
      return this;
    };

    Transforms_.prototype.setRotationY = function(y) {
      this._transformTo.rY = y;
      return this;
    };

    Transforms_.prototype.setRotationZ = function(z) {
      this._transformTo.rZ = z;
      return this;
    };

    Transforms_.prototype.rotate = function(x, y, z) {
      this._transformTo.rX = this._currentMatrix.rX + x;
      this._transformTo.rY = this._currentMatrix.rY + y;
      this._transformTo.rZ = this._currentMatrix.rZ + z;
      return this;
    };

    Transforms_.prototype.rotateX = function(x) {
      this._transformTo.rX = this._currentMatrix.rX + x;
      return this;
    };

    Transforms_.prototype.rotateY = function(y) {
      this._transformTo.rY = this._currentMatrix.rY + y;
      return this;
    };

    Transforms_.prototype.rotateZ = function(z) {
      this._transformTo.rZ = this._currentMatrix.rZ + z;
      return this;
    };

    /*
    		Translation
    */


    Transforms_.prototype.resetTranslation = function() {
      this._transformTo.tX = 0;
      this._transformTo.tY = 0;
      this._transformTo.tZ = 0;
      return this;
    };

    Transforms_.prototype.setTranslation = function(x, y, z) {
      this._transformTo.tX = x;
      this._transformTo.tY = y;
      this._transformTo.tZ = z;
      return this;
    };

    Transforms_.prototype.setTranslationX = function(x) {
      this._transformTo.tX = x;
      return this;
    };

    Transforms_.prototype.setTranslationY = function(y) {
      this._transformTo.tY = y;
      return this;
    };

    Transforms_.prototype.setTranslationZ = function(z) {
      this._transformTo.tZ = z;
      return this;
    };

    Transforms_.prototype.translate = function(x, y, z) {
      this._transformTo.tX = this._currentMatrix.tX + x;
      this._transformTo.tY = this._currentMatrix.tY + y;
      this._transformTo.tZ = this._currentMatrix.tZ + z;
      return this;
    };

    Transforms_.prototype.translateX = function(x) {
      this._transformTo.tX = this._currentMatrix.tX + x;
      return this;
    };

    Transforms_.prototype.translateY = function(y) {
      this._transformTo.tY = this._currentMatrix.tY + y;
      return this;
    };

    Transforms_.prototype.translateZ = function(z) {
      this._transformTo.tZ = this._currentMatrix.tZ + z;
      return this;
    };

    return Transforms_;

  })();
});
