define(['../../../../visuals/lightmatrix'], function(LightMatrix) {
  var Transforms_;

  return Transforms_ = (function() {
    function Transforms_() {}

    Transforms_.prototype.__initMixinTransforms = function() {
      this._toMatrix = LightMatrix._emptyStack();
      this._fromMatrix = LightMatrix._emptyStack();
      return this._currentMatrix = this.el._styleSetter._transformer._current;
    };

    Transforms_.prototype.__clonerForTransforms = function(newObj) {
      newObj._currentMatrix = newObj.el._styleSetter._transformer._current;
    };

    Transforms_.prototype._adjustTransformsForTimeJump = function() {
      this._fromMatrix.mX = this._currentMatrix.mX;
      this._fromMatrix.mY = this._currentMatrix.mY;
      this._fromMatrix.mZ = this._currentMatrix.mZ;
      this._fromMatrix.sX = this._currentMatrix.sX;
      this._fromMatrix.sY = this._currentMatrix.sY;
      this._fromMatrix.sZ = this._currentMatrix.sZ;
      this._fromMatrix.rX = this._currentMatrix.rX;
      this._fromMatrix.rY = this._currentMatrix.rY;
      this._fromMatrix.rZ = this._currentMatrix.rZ;
      this._fromMatrix.tX = this._currentMatrix.tX;
      this._fromMatrix.tY = this._currentMatrix.tY;
      this._fromMatrix.tZ = this._currentMatrix.tZ;
      this._fromMatrix.p = this._currentMatrix.p;
      return this;
    };

    Transforms_.prototype._updateMovement = function(progress) {
      if (progress === 1) {
        this._needsUpdate.transformMovement = false;
      }
      this._styleSetter.setMovement(this._fromMatrix.mX + ((this._toMatrix.mX - this._fromMatrix.mX) * progress), this._fromMatrix.mY + ((this._toMatrix.mY - this._fromMatrix.mY) * progress), this._fromMatrix.mZ + ((this._toMatrix.mZ - this._fromMatrix.mZ) * progress));
      return null;
    };

    Transforms_.prototype.resetMovement = function() {
      this._fromMatrix.mX = this._currentMatrix.mX;
      this._fromMatrix.mY = this._currentMatrix.mY;
      this._fromMatrix.mZ = this._currentMatrix.mZ;
      this._toMatrix.mX = 0;
      this._toMatrix.mY = 0;
      this._toMatrix.mZ = 0;
      this._needsUpdate.transformMovement = true;
      this._update();
      return this;
    };

    Transforms_.prototype.setMovement = function(x, y, z) {
      this._fromMatrix.mX = this._currentMatrix.mX;
      this._fromMatrix.mY = this._currentMatrix.mY;
      this._fromMatrix.mZ = this._currentMatrix.mZ;
      this._toMatrix.mX = x;
      this._toMatrix.mY = y;
      this._toMatrix.mZ = z;
      this._needsUpdate.transformMovement = true;
      this._update();
      return this;
    };

    Transforms_.prototype.setMovementX = function(x) {
      this._fromMatrix.mX = this._currentMatrix.mX;
      this._fromMatrix.mY = this._currentMatrix.mY;
      this._fromMatrix.mZ = this._currentMatrix.mZ;
      this._toMatrix.mX = x;
      this._needsUpdate.transformMovement = true;
      this._update();
      return this;
    };

    Transforms_.prototype.setMovementY = function(y) {
      this._fromMatrix.mX = this._currentMatrix.mX;
      this._fromMatrix.mY = this._currentMatrix.mY;
      this._fromMatrix.mZ = this._currentMatrix.mZ;
      this._toMatrix.mY = y;
      this._needsUpdate.transformMovement = true;
      this._update();
      return this;
    };

    Transforms_.prototype.setMovementZ = function(z) {
      this._fromMatrix.mX = this._currentMatrix.mX;
      this._fromMatrix.mY = this._currentMatrix.mY;
      this._fromMatrix.mZ = this._currentMatrix.mZ;
      this._toMatrix.mZ = z;
      this._needsUpdate.transformMovement = true;
      this._update();
      return this;
    };

    Transforms_.prototype.move = function(x, y, z) {
      this._fromMatrix.mX = this._currentMatrix.mX;
      this._fromMatrix.mY = this._currentMatrix.mY;
      this._fromMatrix.mZ = this._currentMatrix.mZ;
      this._toMatrix.mX = this._currentMatrix.mX + x;
      this._toMatrix.mY = this._currentMatrix.mY + y;
      this._toMatrix.mZ = this._currentMatrix.mZ + z;
      this._needsUpdate.transformMovement = true;
      this._update();
      return this;
    };

    Transforms_.prototype.moveX = function(x) {
      this._fromMatrix.mX = this._currentMatrix.mX;
      this._fromMatrix.mY = this._currentMatrix.mY;
      this._fromMatrix.mZ = this._currentMatrix.mZ;
      this._toMatrix.mX = this._currentMatrix.mX + x;
      this._needsUpdate.transformMovement = true;
      this._update();
      return this;
    };

    Transforms_.prototype.moveY = function(y) {
      this._fromMatrix.mX = this._currentMatrix.mX;
      this._fromMatrix.mY = this._currentMatrix.mY;
      this._fromMatrix.mZ = this._currentMatrix.mZ;
      this._toMatrix.mY = this._currentMatrix.mY + y;
      this._needsUpdate.transformMovement = true;
      this._update();
      return this;
    };

    Transforms_.prototype.moveZ = function(z) {
      this._fromMatrix.mX = this._currentMatrix.mX;
      this._fromMatrix.mY = this._currentMatrix.mY;
      this._fromMatrix.mZ = this._currentMatrix.mZ;
      this._toMatrix.mZ = this._currentMatrix.mZ + z;
      this._needsUpdate.transformMovement = true;
      this._update();
      return this;
    };

    /*
    		Scale
    */


    Transforms_.prototype._updateScale = function(progress) {
      if (progress === 1) {
        this._needsUpdate.transformScale = false;
      }
      this._styleSetter.setScale(this._fromMatrix.sX + ((this._toMatrix.sX - this._fromMatrix.sX) * progress), this._fromMatrix.sY + ((this._toMatrix.sY - this._fromMatrix.sY) * progress), this._fromMatrix.sZ + ((this._toMatrix.sZ - this._fromMatrix.sZ) * progress));
      null;
      this._styleSetter.setScaleZ(this._fromMatrix.sZ + ((this._toMatrix.sZ - this._fromMatrix.sZ) * progress));
      return null;
    };

    Transforms_.prototype.resetScale = function() {
      this._fromMatrix.sX = this._currentMatrix.sX;
      this._fromMatrix.sY = this._currentMatrix.sY;
      this._fromMatrix.sZ = this._currentMatrix.sZ;
      this._needsUpdate.transformScale = true;
      this._update();
      this._toMatrix.sX = 1;
      this._toMatrix.sY = 1;
      this._toMatrix.sZ = 1;
      return this;
    };

    Transforms_.prototype.setScale = function(x, y, z) {
      this._fromMatrix.sX = this._currentMatrix.sX;
      this._fromMatrix.sY = this._currentMatrix.sY;
      this._fromMatrix.sZ = this._currentMatrix.sZ;
      this._needsUpdate.transformScale = true;
      this._update();
      this._toMatrix.sX = x;
      this._toMatrix.sY = y;
      this._toMatrix.sZ = z;
      return this;
    };

    Transforms_.prototype.setScaleX = function(x) {
      this._fromMatrix.sX = this._currentMatrix.sX;
      this._fromMatrix.sY = this._currentMatrix.sY;
      this._fromMatrix.sZ = this._currentMatrix.sZ;
      this._needsUpdate.transformScale = true;
      this._update();
      this._toMatrix.sX = x;
      return this;
    };

    Transforms_.prototype.setScaleY = function(y) {
      this._fromMatrix.sX = this._currentMatrix.sX;
      this._fromMatrix.sY = this._currentMatrix.sY;
      this._fromMatrix.sZ = this._currentMatrix.sZ;
      this._needsUpdate.transformScale = true;
      this._update();
      this._toMatrix.sY = y;
      return this;
    };

    Transforms_.prototype.setScaleZ = function(z) {
      this._fromMatrix.sX = this._currentMatrix.sX;
      this._fromMatrix.sY = this._currentMatrix.sY;
      this._fromMatrix.sZ = this._currentMatrix.sZ;
      this._needsUpdate.transformScale = true;
      this._update();
      this._toMatrix.sZ = z;
      return this;
    };

    Transforms_.prototype.scale = function(x, y, z) {
      this._fromMatrix.sX = this._currentMatrix.sX;
      this._fromMatrix.sY = this._currentMatrix.sY;
      this._fromMatrix.sZ = this._currentMatrix.sZ;
      this._needsUpdate.transformScale = true;
      this._update();
      this._toMatrix.sX = this._currentMatrix.sX * x;
      this._toMatrix.sY = this._currentMatrix.sY * y;
      this._toMatrix.sZ = this._currentMatrix.sZ * z;
      return this;
    };

    Transforms_.prototype.setScaleAll = function(x) {
      this._fromMatrix.sX = this._currentMatrix.sX;
      this._fromMatrix.sY = this._currentMatrix.sY;
      this._fromMatrix.sZ = this._currentMatrix.sZ;
      this._needsUpdate.transformScale = true;
      this._update();
      this._toMatrix.sX = this._toMatrix.sY = this._toMatrix.sZ = x;
      return this;
    };

    Transforms_.prototype.scaleX = function(x) {
      this._fromMatrix.sX = this._currentMatrix.sX;
      this._fromMatrix.sY = this._currentMatrix.sY;
      this._fromMatrix.sZ = this._currentMatrix.sZ;
      this._needsUpdate.transformScale = true;
      this._update();
      this._toMatrix.sX = this._currentMatrix.sX * x;
      return this;
    };

    Transforms_.prototype.scaleY = function(y) {
      this._fromMatrix.sX = this._currentMatrix.sX;
      this._fromMatrix.sY = this._currentMatrix.sY;
      this._fromMatrix.sZ = this._currentMatrix.sZ;
      this._needsUpdate.transformScale = true;
      this._update();
      this._toMatrix.sY = this._currentMatrix.sY * y;
      return this;
    };

    Transforms_.prototype.scaleZ = function(z) {
      this._fromMatrix.sX = this._currentMatrix.sX;
      this._fromMatrix.sY = this._currentMatrix.sY;
      this._fromMatrix.sZ = this._currentMatrix.sZ;
      this._needsUpdate.transformScale = true;
      this._update();
      this._toMatrix.sZ = this._currentMatrix.sZ * z;
      return this;
    };

    /*
    		Perspective
    */


    Transforms_.prototype._updatePerspective = function(progress) {
      if (progress === 1) {
        this._needsUpdate.transformPerspective = false;
      }
      this._styleSetter.setPerspective(this._fromMatrix.p + ((this._toMatrix.p - this._fromMatrix.p) * progress));
      return null;
    };

    Transforms_.prototype.resetPerspective = function() {
      this._fromMatrix.p = this._currentMatrix.p;
      this._needsUpdate.transformPerspective = true;
      this._update();
      this._toMatrix.p = 0;
      return this;
    };

    Transforms_.prototype.setPerspective = function(d) {
      this._fromMatrix.p = this._currentMatrix.p;
      this._needsUpdate.transformPerspective = true;
      this._update();
      this._toMatrix.p = d;
      return this;
    };

    /*
    		Rotation
    */


    Transforms_.prototype._updateRotation = function(progress) {
      if (progress === 1) {
        this._needsUpdate.transformRotation = false;
      }
      this._styleSetter.setRotation(this._fromMatrix.rX + ((this._toMatrix.rX - this._fromMatrix.rX) * progress), this._fromMatrix.rY + ((this._toMatrix.rY - this._fromMatrix.rY) * progress), this._fromMatrix.rZ + ((this._toMatrix.rZ - this._fromMatrix.rZ) * progress));
      null;
      this._styleSetter.setRotationZ(this._fromMatrix.rZ + ((this._toMatrix.rZ - this._fromMatrix.rZ) * progress));
      return null;
    };

    Transforms_.prototype.resetRotation = function() {
      this._fromMatrix.rX = this._currentMatrix.rX;
      this._fromMatrix.rY = this._currentMatrix.rY;
      this._fromMatrix.rZ = this._currentMatrix.rZ;
      this._needsUpdate.transformRotation = true;
      this._update();
      this._toMatrix.rX = 0;
      this._toMatrix.rY = 0;
      this._toMatrix.rZ = 0;
      return this;
    };

    Transforms_.prototype.setRotation = function(x, y, z) {
      this._fromMatrix.rX = this._currentMatrix.rX;
      this._fromMatrix.rY = this._currentMatrix.rY;
      this._fromMatrix.rZ = this._currentMatrix.rZ;
      this._needsUpdate.transformRotation = true;
      this._update();
      this._toMatrix.rX = x;
      this._toMatrix.rY = y;
      this._toMatrix.rZ = z;
      return this;
    };

    Transforms_.prototype.setRotationX = function(x) {
      this._fromMatrix.rX = this._currentMatrix.rX;
      this._fromMatrix.rY = this._currentMatrix.rY;
      this._fromMatrix.rZ = this._currentMatrix.rZ;
      this._needsUpdate.transformRotation = true;
      this._update();
      this._toMatrix.rX = x;
      return this;
    };

    Transforms_.prototype.setRotationY = function(y) {
      this._fromMatrix.rX = this._currentMatrix.rX;
      this._fromMatrix.rY = this._currentMatrix.rY;
      this._fromMatrix.rZ = this._currentMatrix.rZ;
      this._needsUpdate.transformRotation = true;
      this._update();
      this._toMatrix.rY = y;
      return this;
    };

    Transforms_.prototype.setRotationZ = function(z) {
      this._fromMatrix.rX = this._currentMatrix.rX;
      this._fromMatrix.rY = this._currentMatrix.rY;
      this._fromMatrix.rZ = this._currentMatrix.rZ;
      this._needsUpdate.transformRotation = true;
      this._update();
      this._toMatrix.rZ = z;
      return this;
    };

    Transforms_.prototype.rotate = function(x, y, z) {
      this._fromMatrix.rX = this._currentMatrix.rX;
      this._fromMatrix.rY = this._currentMatrix.rY;
      this._fromMatrix.rZ = this._currentMatrix.rZ;
      this._needsUpdate.transformRotation = true;
      this._update();
      this._toMatrix.rX = this._currentMatrix.rX + x;
      this._toMatrix.rY = this._currentMatrix.rY + y;
      this._toMatrix.rZ = this._currentMatrix.rZ + z;
      return this;
    };

    Transforms_.prototype.rotateX = function(x) {
      this._fromMatrix.rX = this._currentMatrix.rX;
      this._fromMatrix.rY = this._currentMatrix.rY;
      this._fromMatrix.rZ = this._currentMatrix.rZ;
      this._needsUpdate.transformRotation = true;
      this._update();
      this._toMatrix.rX = this._currentMatrix.rX + x;
      return this;
    };

    Transforms_.prototype.rotateY = function(y) {
      this._fromMatrix.rX = this._currentMatrix.rX;
      this._fromMatrix.rY = this._currentMatrix.rY;
      this._fromMatrix.rZ = this._currentMatrix.rZ;
      this._needsUpdate.transformRotation = true;
      this._update();
      this._toMatrix.rY = this._currentMatrix.rY + y;
      return this;
    };

    Transforms_.prototype.rotateZ = function(z) {
      this._fromMatrix.rX = this._currentMatrix.rX;
      this._fromMatrix.rY = this._currentMatrix.rY;
      this._fromMatrix.rZ = this._currentMatrix.rZ;
      this._needsUpdate.transformRotation = true;
      this._update();
      this._toMatrix.rZ = this._currentMatrix.rZ + z;
      return this;
    };

    /*
    		Translation
    */


    Transforms_.prototype._updateTranslation = function(progress) {
      if (progress === 1) {
        this._needsUpdate.transformTranslation = false;
      }
      this._styleSetter.setRotation(this._fromMatrix.tX + ((this._toMatrix.tX - this._fromMatrix.tX) * progress), this._fromMatrix.tY + ((this._toMatrix.tY - this._fromMatrix.tY) * progress), this._fromMatrix.tZ + ((this._toMatrix.tZ - this._fromMatrix.tZ) * progress));
      null;
      this._styleSetter.setTranslationZ(this._fromMatrix.tZ + ((this._toMatrix.tZ - this._fromMatrix.tZ) * progress));
      return null;
    };

    Transforms_.prototype.resetTranslation = function() {
      this._fromMatrix.tX = this._currentMatrix.tX;
      this._fromMatrix.tY = this._currentMatrix.tY;
      this._fromMatrix.tZ = this._currentMatrix.tZ;
      this._needsUpdate.transformTranslation = true;
      this._update();
      this._toMatrix.tX = 0;
      this._toMatrix.tY = 0;
      this._toMatrix.tZ = 0;
      return this;
    };

    Transforms_.prototype.setTranslation = function(x, y, z) {
      this._fromMatrix.tX = this._currentMatrix.tX;
      this._fromMatrix.tY = this._currentMatrix.tY;
      this._fromMatrix.tZ = this._currentMatrix.tZ;
      this._needsUpdate.transformTranslation = true;
      this._update();
      this._toMatrix.tX = x;
      this._toMatrix.tY = y;
      this._toMatrix.tZ = z;
      return this;
    };

    Transforms_.prototype.setTranslationX = function(x) {
      this._fromMatrix.tX = this._currentMatrix.tX;
      this._fromMatrix.tY = this._currentMatrix.tY;
      this._fromMatrix.tZ = this._currentMatrix.tZ;
      this._needsUpdate.transformTranslation = true;
      this._update();
      this._toMatrix.tX = x;
      return this;
    };

    Transforms_.prototype.setTranslationY = function(y) {
      this._fromMatrix.tX = this._currentMatrix.tX;
      this._fromMatrix.tY = this._currentMatrix.tY;
      this._fromMatrix.tZ = this._currentMatrix.tZ;
      this._needsUpdate.transformTranslation = true;
      this._update();
      this._toMatrix.tY = y;
      return this;
    };

    Transforms_.prototype.setTranslationZ = function(z) {
      this._fromMatrix.tX = this._currentMatrix.tX;
      this._fromMatrix.tY = this._currentMatrix.tY;
      this._fromMatrix.tZ = this._currentMatrix.tZ;
      this._needsUpdate.transformTranslation = true;
      this._update();
      this._toMatrix.tZ = z;
      return this;
    };

    Transforms_.prototype.translate = function(x, y, z) {
      this._fromMatrix.tX = this._currentMatrix.tX;
      this._fromMatrix.tY = this._currentMatrix.tY;
      this._fromMatrix.tZ = this._currentMatrix.tZ;
      this._needsUpdate.transformTranslation = true;
      this._update();
      this._toMatrix.tX = this._currentMatrix.tX + x;
      this._toMatrix.tY = this._currentMatrix.tY + y;
      this._toMatrix.tZ = this._currentMatrix.tZ + z;
      return this;
    };

    Transforms_.prototype.translateX = function(x) {
      this._fromMatrix.tX = this._currentMatrix.tX;
      this._fromMatrix.tY = this._currentMatrix.tY;
      this._fromMatrix.tZ = this._currentMatrix.tZ;
      this._needsUpdate.transformTranslation = true;
      this._update();
      this._toMatrix.tX = this._currentMatrix.tX + x;
      return this;
    };

    Transforms_.prototype.translateY = function(y) {
      this._fromMatrix.tX = this._currentMatrix.tX;
      this._fromMatrix.tY = this._currentMatrix.tY;
      this._fromMatrix.tZ = this._currentMatrix.tZ;
      this._needsUpdate.transformTranslation = true;
      this._update();
      this._toMatrix.tY = this._currentMatrix.tY + y;
      return this;
    };

    Transforms_.prototype.translateZ = function(z) {
      this._fromMatrix.tX = this._currentMatrix.tX;
      this._fromMatrix.tY = this._currentMatrix.tY;
      this._fromMatrix.tZ = this._currentMatrix.tZ;
      this._needsUpdate.transformTranslation = true;
      this._update();
      this._toMatrix.tZ = this._currentMatrix.tZ + z;
      return this;
    };

    return Transforms_;

  })();
});
