define(['../../../../visuals/typedMatrix'], function(TypedMatrix) {
  var Transforms_;

  return Transforms_ = (function() {
    function Transforms_() {}

    Transforms_.prototype.__initMixinTransforms = function() {
      this._toMatrix = TypedMatrix._emptyStack();
      this._fromMatrix = TypedMatrix._emptyStack();
      return this._currentMatrix = this.el._styleSetter._transformer._current;
    };

    Transforms_.prototype.__clonerForTransforms = function(newTransitioner) {
      newTransitioner._currentMatrix = newTransitioner.el._styleSetter._transformer._current;
    };

    Transforms_.prototype._adjustFromValuesForTransforms = function() {
      this._fromMatrix[0] = this._currentMatrix[0];
      this._fromMatrix[1] = this._currentMatrix[1];
      this._fromMatrix[2] = this._currentMatrix[2];
      this._fromMatrix[3] = this._currentMatrix[3];
      this._fromMatrix[4] = this._currentMatrix[4];
      this._fromMatrix[5] = this._currentMatrix[5];
      this._fromMatrix[6] = this._currentMatrix[6];
      this._fromMatrix[7] = this._currentMatrix[7];
      this._fromMatrix[8] = this._currentMatrix[8];
      this._fromMatrix[9] = this._currentMatrix[9];
      this._fromMatrix[10] = this._currentMatrix[10];
      this._fromMatrix[11] = this._currentMatrix[11];
      this._fromMatrix[12] = this._currentMatrix[12];
      return this;
    };

    Transforms_.prototype._disableTransitionForTransforms = function() {
      this._needsUpdate.transformMovement = false;
      this._toMatrix[0] = this._currentMatrix[0];
      this._toMatrix[1] = this._currentMatrix[1];
      this._toMatrix[2] = this._currentMatrix[2];
      this._needsUpdate.transformScale = false;
      this._toMatrix[3] = this._currentMatrix[3];
      this._toMatrix[4] = this._currentMatrix[4];
      this._toMatrix[5] = this._currentMatrix[5];
      this._needsUpdate.transformPerspective = false;
      this._toMatrix[6] = this._currentMatrix[6];
      this._needsUpdate.transformRotation = false;
      this._toMatrix[7] = this._currentMatrix[7];
      this._toMatrix[8] = this._currentMatrix[8];
      this._toMatrix[9] = this._currentMatrix[9];
      this._needsUpdate.transformTranslation = false;
      this._toMatrix[10] = this._currentMatrix[10];
      this._toMatrix[11] = this._currentMatrix[11];
      this._toMatrix[12] = this._currentMatrix[12];
      return this;
    };

    Transforms_.prototype._updateTransitionForTransforms = function(progress) {
      if (this._needsUpdate.transformMovement) {
        this._updateMovement(progress);
      }
      if (this._needsUpdate.transformRotation) {
        this._updateRotation(progress);
      }
      if (this._needsUpdate.transformScale) {
        this._updateScale(progress);
      }
      if (this._needsUpdate.transformPerspective) {
        this._updatePerspective(progress);
      }
      if (this._needsUpdate.transformTranslation) {
        this._updateTranslation(progress);
      }
    };

    Transforms_.prototype._updateMovement = function(progress) {
      this._styleSetter.setMovement(this._fromMatrix[0] + ((this._toMatrix[0] - this._fromMatrix[0]) * progress), this._fromMatrix[1] + ((this._toMatrix[1] - this._fromMatrix[1]) * progress), this._fromMatrix[2] + ((this._toMatrix[2] - this._fromMatrix[2]) * progress));
      return null;
    };

    Transforms_.prototype._reportUpdateForMove = function() {
      if (this._needsUpdate.transformMovement) {
        return;
      }
      this._needsUpdate.transformMovement = true;
      this._toMatrix[0] = this._currentMatrix[0];
      this._toMatrix[1] = this._currentMatrix[1];
      this._toMatrix[2] = this._currentMatrix[2];
    };

    Transforms_.prototype.resetMovement = function() {
      this._reportUpdateForMove();
      this._toMatrix[0] = 0;
      this._toMatrix[1] = 0;
      this._toMatrix[2] = 0;
      this._update();
      return this;
    };

    Transforms_.prototype.setMovement = function(x, y, z) {
      this._reportUpdateForMove();
      this._toMatrix[0] = x;
      this._toMatrix[1] = y;
      this._toMatrix[2] = z;
      this._update();
      return this;
    };

    Transforms_.prototype.setMovementX = function(x) {
      this._reportUpdateForMove();
      this._toMatrix[0] = x;
      this._update();
      return this;
    };

    Transforms_.prototype.setMovementY = function(y) {
      this._reportUpdateForMove();
      this._toMatrix[1] = y;
      this._update();
      return this;
    };

    Transforms_.prototype.setMovementZ = function(z) {
      this._reportUpdateForMove();
      this._toMatrix[2] = z;
      this._update();
      return this;
    };

    Transforms_.prototype.move = function(x, y, z) {
      this._reportUpdateForMove();
      this._toMatrix[0] = this._currentMatrix[0] + x;
      this._toMatrix[1] = this._currentMatrix[1] + y;
      this._toMatrix[2] = this._currentMatrix[2] + z;
      this._update();
      return this;
    };

    Transforms_.prototype.moveX = function(x) {
      this._reportUpdateForMove();
      this._toMatrix[0] = this._currentMatrix[0] + x;
      this._update();
      return this;
    };

    Transforms_.prototype.moveY = function(y) {
      this._reportUpdateForMove();
      this._toMatrix[1] = this._currentMatrix[1] + y;
      this._update();
      return this;
    };

    Transforms_.prototype.moveZ = function(z) {
      this._reportUpdateForMove();
      this._toMatrix[2] = this._currentMatrix[2] + z;
      this._update();
      return this;
    };

    /*
    		Scale
    */


    Transforms_.prototype._updateScale = function(progress) {
      this._styleSetter.setScale(this._fromMatrix[3] + ((this._toMatrix[3] - this._fromMatrix[3]) * progress), this._fromMatrix[4] + ((this._toMatrix[4] - this._fromMatrix[4]) * progress), this._fromMatrix[5] + ((this._toMatrix[5] - this._fromMatrix[5]) * progress));
      return null;
    };

    Transforms_.prototype._reportUpdateForScale = function() {
      if (this._needsUpdate.transformScale) {
        return;
      }
      this._needsUpdate.transformScale = true;
      this._toMatrix[3] = this._currentMatrix[3];
      this._toMatrix[4] = this._currentMatrix[4];
      this._toMatrix[5] = this._currentMatrix[5];
    };

    Transforms_.prototype.resetScale = function() {
      this._reportUpdateForScale();
      this._toMatrix[3] = 1;
      this._toMatrix[4] = 1;
      this._toMatrix[5] = 1;
      this._update();
      return this;
    };

    Transforms_.prototype.setScale = function(x, y, z) {
      this._reportUpdateForScale();
      this._toMatrix[3] = x;
      this._toMatrix[4] = y;
      this._toMatrix[5] = z;
      this._update();
      return this;
    };

    Transforms_.prototype.setScaleX = function(x) {
      this._reportUpdateForScale();
      this._toMatrix[3] = x;
      this._update();
      return this;
    };

    Transforms_.prototype.setScaleY = function(y) {
      this._reportUpdateForScale();
      this._toMatrix[4] = y;
      this._update();
      return this;
    };

    Transforms_.prototype.setScaleZ = function(z) {
      this._reportUpdateForScale();
      this._toMatrix[5] = z;
      this._update();
      return this;
    };

    Transforms_.prototype.scale = function(x, y, z) {
      this._reportUpdateForScale();
      this._toMatrix[3] = this._currentMatrix[3] * x;
      this._toMatrix[4] = this._currentMatrix[4] * y;
      this._toMatrix[5] = this._currentMatrix[5] * z;
      this._update();
      return this;
    };

    Transforms_.prototype.setScaleAll = function(x) {
      this._reportUpdateForScale();
      this._toMatrix[3] = this._toMatrix[4] = this._toMatrix[5] = x;
      this._update();
      return this;
    };

    Transforms_.prototype.scaleX = function(x) {
      this._reportUpdateForScale();
      this._toMatrix[3] = this._currentMatrix[3] * x;
      this._update();
      return this;
    };

    Transforms_.prototype.scaleY = function(y) {
      this._reportUpdateForScale();
      this._toMatrix[4] = this._currentMatrix[4] * y;
      this._update();
      return this;
    };

    Transforms_.prototype.scaleZ = function(z) {
      this._reportUpdateForScale();
      this._toMatrix[5] = this._currentMatrix[5] * z;
      this._update();
      return this;
    };

    Transforms_.prototype._reportUpdateForPerspective = function() {
      if (this._needsUpdate.transformPerspective) {
        return;
      }
      this._needsUpdate.transformPerspective = true;
      this._toMatrix[6] = this._currentMatrix[6];
    };

    /*
    		Perspective
    */


    Transforms_.prototype._updatePerspective = function(progress) {
      this._styleSetter.setPerspective(this._fromMatrix[6] + ((this._toMatrix[6] - this._fromMatrix[6]) * progress));
      return null;
    };

    Transforms_.prototype.resetPerspective = function() {
      this._reportUpdateForPerspective();
      this._toMatrix[6] = 0;
      this._update();
      return this;
    };

    Transforms_.prototype.setPerspective = function(d) {
      this._reportUpdateForPerspective();
      this._toMatrix[6] = d;
      this._update();
      return this;
    };

    /*
    		Rotation
    */


    Transforms_.prototype._updateRotation = function(progress) {
      this._styleSetter.setRotation(this._fromMatrix[7] + ((this._toMatrix[7] - this._fromMatrix[7]) * progress), this._fromMatrix[8] + ((this._toMatrix[8] - this._fromMatrix[8]) * progress), this._fromMatrix[9] + ((this._toMatrix[9] - this._fromMatrix[9]) * progress));
      return null;
    };

    Transforms_.prototype._reportUpdateForRotation = function() {
      if (this._needsUpdate.transformRotation) {
        return;
      }
      this._needsUpdate.transformRotation = true;
      this._toMatrix[7] = this._currentMatrix[7];
      this._toMatrix[8] = this._currentMatrix[8];
      this._toMatrix[9] = this._currentMatrix[9];
    };

    Transforms_.prototype.resetRotation = function() {
      this._reportUpdateForRotation();
      this._toMatrix[7] = 0;
      this._toMatrix[8] = 0;
      this._toMatrix[9] = 0;
      this._update();
      return this;
    };

    Transforms_.prototype.setRotation = function(x, y, z) {
      this._reportUpdateForRotation();
      this._toMatrix[7] = x;
      this._toMatrix[8] = y;
      this._toMatrix[9] = z;
      this._update();
      return this;
    };

    Transforms_.prototype.setRotationX = function(x) {
      this._reportUpdateForRotation();
      this._toMatrix[7] = x;
      this._update();
      return this;
    };

    Transforms_.prototype.setRotationY = function(y) {
      this._reportUpdateForRotation();
      this._toMatrix[8] = y;
      this._update();
      return this;
    };

    Transforms_.prototype.setRotationZ = function(z) {
      this._reportUpdateForRotation();
      this._toMatrix[9] = z;
      this._update();
      return this;
    };

    Transforms_.prototype.rotate = function(x, y, z) {
      this._reportUpdateForRotation();
      this._toMatrix[7] = this._currentMatrix[7] + x;
      this._toMatrix[8] = this._currentMatrix[8] + y;
      this._toMatrix[9] = this._currentMatrix[9] + z;
      this._update();
      return this;
    };

    Transforms_.prototype.rotateX = function(x) {
      this._reportUpdateForRotation();
      this._toMatrix[7] = this._currentMatrix[7] + x;
      this._update();
      return this;
    };

    Transforms_.prototype.rotateY = function(y) {
      this._reportUpdateForRotation();
      this._toMatrix[8] = this._currentMatrix[8] + y;
      this._update();
      return this;
    };

    Transforms_.prototype.rotateZ = function(z) {
      this._reportUpdateForRotation();
      this._toMatrix[9] = this._currentMatrix[9] + z;
      this._update();
      return this;
    };

    /*
    		Translation
    */


    Transforms_.prototype._updateTranslation = function(progress) {
      this._styleSetter.setTranslation(this._fromMatrix[10] + ((this._toMatrix[10] - this._fromMatrix[10]) * progress), this._fromMatrix[11] + ((this._toMatrix[11] - this._fromMatrix[11]) * progress), this._fromMatrix[12] + ((this._toMatrix[12] - this._fromMatrix[12]) * progress));
      return null;
    };

    Transforms_.prototype._reportUpdateForTranslation = function() {
      if (this._needsUpdate.transformTranslation) {
        return;
      }
      this._needsUpdate.transformTranslation = true;
      this._toMatrix[10] = this._currentMatrix[10];
      this._toMatrix[11] = this._currentMatrix[11];
      this._toMatrix[12] = this._currentMatrix[12];
    };

    Transforms_.prototype.resetTranslation = function() {
      this._reportUpdateForTranslation();
      this._toMatrix[10] = 0;
      this._toMatrix[11] = 0;
      this._toMatrix[12] = 0;
      this._update();
      return this;
    };

    Transforms_.prototype.setTranslation = function(x, y, z) {
      this._reportUpdateForTranslation();
      this._toMatrix[10] = x;
      this._toMatrix[11] = y;
      this._toMatrix[12] = z;
      this._update();
      return this;
    };

    Transforms_.prototype.setTranslationX = function(x) {
      this._reportUpdateForTranslation();
      this._toMatrix[10] = x;
      this._update();
      return this;
    };

    Transforms_.prototype.setTranslationY = function(y) {
      this._reportUpdateForTranslation();
      this._toMatrix[11] = y;
      this._update();
      return this;
    };

    Transforms_.prototype.setTranslationZ = function(z) {
      this._reportUpdateForTranslation();
      this._toMatrix[12] = z;
      this._update();
      return this;
    };

    Transforms_.prototype.translate = function(x, y, z) {
      this._reportUpdateForTranslation();
      this._toMatrix[10] = this._currentMatrix[10] + x;
      this._toMatrix[11] = this._currentMatrix[11] + y;
      this._toMatrix[12] = this._currentMatrix[12] + z;
      this._update();
      return this;
    };

    Transforms_.prototype.translateX = function(x) {
      this._reportUpdateForTranslation();
      this._toMatrix[10] = this._currentMatrix[10] + x;
      this._update();
      return this;
    };

    Transforms_.prototype.translateY = function(y) {
      this._reportUpdateForTranslation();
      this._toMatrix[11] = this._currentMatrix[11] + y;
      this._update();
      return this;
    };

    Transforms_.prototype.translateZ = function(z) {
      this._reportUpdateForTranslation();
      this._toMatrix[12] = this._currentMatrix[12] + z;
      this._update();
      return this;
    };

    return Transforms_;

  })();
});
