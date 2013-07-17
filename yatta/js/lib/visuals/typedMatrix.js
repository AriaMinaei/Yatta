var define;

if (typeof define !== 'function') {
  define = require('amdefine')(module);
}

define(['./typedMatrix/base', './typedMatrix/translation', './typedMatrix/scale', './typedMatrix/perspective', './typedMatrix/rotation'], function(Base, Translation, Scale, Perspective, Rotation) {
  var TypedMatrix, copyStack, emptyStack;

  emptyStack = function() {
    var a;

    a = new Float64Array(16);
    a[0] = 0;
    a[1] = 0;
    a[2] = 0;
    a[3] = 1;
    a[4] = 1;
    a[5] = 1;
    a[6] = 10000;
    a[7] = 0;
    a[8] = 0;
    a[9] = 0;
    a[10] = 0;
    a[11] = 0;
    a[12] = 0;
    a[13] = 0;
    a[14] = 0;
    a[15] = 0;
    return a;
  };
  copyStack = function(from, to) {
    to[0] = from[0];
    to[1] = from[1];
    to[2] = from[2];
    to[3] = from[3];
    to[4] = from[4];
    to[5] = from[5];
    to[6] = from[6];
    to[7] = from[7];
    to[8] = from[8];
    to[9] = from[9];
    to[10] = from[10];
    to[11] = from[11];
    to[12] = from[12];
    to[13] = from[13];
    to[14] = from[14];
    to[15] = from[15];
  };
  return TypedMatrix = (function() {
    TypedMatrix._emptyStack = emptyStack;

    function TypedMatrix() {
      this._main = emptyStack();
      this._temp = emptyStack();
      this._current = this._main;
      this._has = {
        movement: false,
        perspective: false,
        rotation: false,
        scale: false,
        localMovement: false,
        localRotation: false
      };
      this._identityMatrix = Base.identity();
      this._tempMode = false;
    }

    TypedMatrix.prototype.temporarily = function() {
      copyStack(this._main, this._temp);
      this._current = this._temp;
      this._tempMode = true;
      return this;
    };

    TypedMatrix.prototype.commit = function() {
      if (this._tempMode) {
        copyStack(this._temp, this._main);
        this._current = this._main;
        this._tempMode = false;
      }
      return this;
    };

    TypedMatrix.prototype.rollBack = function() {
      if (this._tempMode) {
        this._current = this._main;
        this._tempMode = false;
      }
      return this;
    };

    TypedMatrix.prototype.toCss = function() {
      return Base.toCss(this.toMatrix());
    };

    TypedMatrix.prototype.toPlainCss = function() {
      var css;

      if (this._has.movement) {
        css = Translation.toPlainCss(this._current[0], this._current[1], this._current[2]);
      } else {
        css = '';
      }
      if (this._has.scale) {
        css += Scale.toPlainCss(this._current[3], this._current[4], this._current[5]);
      }
      if (this._has.perspective) {
        css += Perspective.toPlainCss(this._current[6]);
      }
      if (this._has.rotation) {
        css += Rotation.toPlainCss(this._current[7], this._current[8], this._current[9]);
      }
      if (this._has.localMovement) {
        css += Translation.toPlainCss(this._current[10], this._current[11], this._current[12]);
      }
      if (this._has.localRotation) {
        css += Rotation.toPlainCss(this._current[13], this._current[14], this._current[15]);
      }
      return css;
    };

    TypedMatrix.prototype.toStupidCss = function() {
      return "translate3d(" + this._current[0] + "px, " + this._current[1] + "px, " + this._current[2] + "px) scale3d(" + this._current[3] + ", " + this._current[4] + ", " + this._current[5] + ") perspective(" + this._current[6] + ") rotateX(" + this._current[7] + ") rotateY(" + this._current[8] + ") rotateZ(" + this._current[9] + ") translate3d(" + this._current[10] + "px, " + this._current[11] + "px, " + this._current[12] + "px) rotateX(" + this._current[13] + ") rotateY(" + this._current[14] + ") rotateZ(" + this._current[15] + ")";
    };

    TypedMatrix.prototype.toArray = function() {
      return Base.toArray(this.toMatrix());
    };

    TypedMatrix.prototype.toMatrix = function() {
      var soFar;

      soFar = this._getIdentityMatrix();
      if (this._has.movement) {
        soFar = Translation.setTo(soFar, this._current[0], this._current[1], this._current[2]);
      }
      if (this._has.scale) {
        Scale.applyTo(soFar, this._current[3], this._current[4], this._current[5]);
      }
      if (this._has.perspective) {
        Perspective.applyTo(soFar, this._current[6]);
      }
      if (this._has.rotation) {
        Rotation.applyTo(soFar, this._current[7], this._current[8], this._current[9]);
      }
      if (this._has.localMovement) {
        Translation.applyTo(soFar, this._current[10], this._current[11], this._current[12]);
      }
      if (this._has.localRotation) {
        Rotation.applyTo(soFar, this._current[13], this._current[14], this._current[15]);
      }
      return soFar;
    };

    TypedMatrix.prototype._getIdentityMatrix = function() {
      Base.setIdentity(this._identityMatrix);
      return this._identityMatrix;
    };

    /*
    		Movement
    */


    TypedMatrix.prototype.resetMovement = function() {
      this._has.movement = false;
      this._current[0] = 0;
      this._current[1] = 0;
      this._current[2] = 0;
      return this;
    };

    TypedMatrix.prototype.movement = function() {
      return {
        x: this._current[0],
        y: this._current[1],
        z: this._current[2]
      };
    };

    TypedMatrix.prototype.moveTo = function(x, y, z) {
      this._has.movement = true;
      this._current[0] = x;
      this._current[1] = y;
      this._current[2] = z;
      return this;
    };

    TypedMatrix.prototype.moveXTo = function(x) {
      this._has.movement = true;
      this._current[0] = x;
      return this;
    };

    TypedMatrix.prototype.moveYTo = function(y) {
      this._has.movement = true;
      this._current[1] = y;
      return this;
    };

    TypedMatrix.prototype.moveZTo = function(z) {
      this._has.movement = true;
      this._current[2] = z;
      return this;
    };

    TypedMatrix.prototype.move = function(x, y, z) {
      this._has.movement = true;
      this._current[0] += x;
      this._current[1] += y;
      this._current[2] += z;
      return this;
    };

    TypedMatrix.prototype.moveX = function(x) {
      this._has.movement = true;
      this._current[0] += x;
      return this;
    };

    TypedMatrix.prototype.moveY = function(y) {
      this._has.movement = true;
      this._current[1] += y;
      return this;
    };

    TypedMatrix.prototype.moveZ = function(z) {
      this._has.movement = true;
      this._current[2] += z;
      return this;
    };

    /*
    		Scale
    */


    TypedMatrix.prototype.resetScale = function() {
      this._has.scale = false;
      this._current[3] = 1;
      this._current[4] = 1;
      this._current[5] = 1;
      return this;
    };

    TypedMatrix.prototype.getScale = function() {
      return {
        x: this._current[3],
        y: this._current[4],
        z: this._current[5]
      };
    };

    TypedMatrix.prototype.scaleTo = function(x, y, z) {
      this._has.scale = true;
      this._current[3] = x;
      this._current[4] = y;
      this._current[5] = z;
      return this;
    };

    TypedMatrix.prototype.scaleXTo = function(x) {
      this._has.scale = true;
      this._current[3] = x;
      return this;
    };

    TypedMatrix.prototype.scaleYTo = function(y) {
      this._has.scale = true;
      this._current[4] = y;
      return this;
    };

    TypedMatrix.prototype.scaleZTo = function(z) {
      this._has.scale = true;
      this._current[5] = z;
      return this;
    };

    TypedMatrix.prototype.scale = function(x, y, z) {
      this._has.scale = true;
      this._current[3] *= x;
      this._current[4] *= y;
      this._current[5] *= z;
      return this;
    };

    TypedMatrix.prototype.scaleAllTo = function(x) {
      if (x === 1) {
        this._has.scale = false;
      } else {
        this._has.scale = true;
      }
      this._current[3] = this._current[4] = this._current[5] = x;
      return this;
    };

    TypedMatrix.prototype.scaleX = function(x) {
      this._has.scale = true;
      this._current[3] *= x;
      return this;
    };

    TypedMatrix.prototype.scaleY = function(y) {
      this._has.scale = true;
      this._current[4] *= y;
      return this;
    };

    TypedMatrix.prototype.scaleZ = function(z) {
      this._has.scale = true;
      this._current[5] *= z;
      return this;
    };

    /*
    		Perspective
    */


    TypedMatrix.prototype.reperspective = function() {
      this._current[6] = 0;
      this._has.perspective = false;
      return this;
    };

    TypedMatrix.prototype.perspective = function(d) {
      this._current[6] = d;
      if (d) {
        this._has.perspective = true;
      }
      return this;
    };

    /*
    		Rotation
    */


    TypedMatrix.prototype.resetRotation = function() {
      this._has.rotation = false;
      this._current[7] = 0;
      this._current[8] = 0;
      this._current[9] = 0;
      return this;
    };

    TypedMatrix.prototype.rotation = function() {
      return {
        x: this._current[7],
        y: this._current[8],
        z: this._current[9]
      };
    };

    TypedMatrix.prototype.rotateTo = function(x, y, z) {
      this._has.rotation = true;
      this._current[7] = x;
      this._current[8] = y;
      this._current[9] = z;
      return this;
    };

    TypedMatrix.prototype.rotateXTo = function(x) {
      this._has.rotation = true;
      this._current[7] = x;
      return this;
    };

    TypedMatrix.prototype.rotateYTo = function(y) {
      this._has.rotation = true;
      this._current[8] = y;
      return this;
    };

    TypedMatrix.prototype.rotateZTo = function(z) {
      this._has.rotation = true;
      this._current[9] = z;
      return this;
    };

    TypedMatrix.prototype.rotate = function(x, y, z) {
      this._has.rotation = true;
      this._current[7] += x;
      this._current[8] += y;
      this._current[9] += z;
      return this;
    };

    TypedMatrix.prototype.rotateX = function(x) {
      this._has.rotation = true;
      this._current[7] += x;
      return this;
    };

    TypedMatrix.prototype.rotateY = function(y) {
      this._has.rotation = true;
      this._current[8] += y;
      return this;
    };

    TypedMatrix.prototype.rotateZ = function(z) {
      this._has.rotation = true;
      this._current[9] += z;
      return this;
    };

    /*
    		Local Movement
    */


    TypedMatrix.prototype.resetLocalMovement = function() {
      this._has.localMovement = false;
      this._current[10] = 0;
      this._current[11] = 0;
      this._current[12] = 0;
      return this;
    };

    TypedMatrix.prototype.localMovement = function() {
      return {
        x: this._current[10],
        y: this._current[11],
        z: this._current[12]
      };
    };

    TypedMatrix.prototype.localMoveTo = function(x, y, z) {
      this._has.localMovement = true;
      this._current[10] = x;
      this._current[11] = y;
      this._current[12] = z;
      return this;
    };

    TypedMatrix.prototype.localMoveXTo = function(x) {
      this._has.localMovement = true;
      this._current[10] = x;
      return this;
    };

    TypedMatrix.prototype.localMoveYTo = function(y) {
      this._has.localMovement = true;
      this._current[11] = y;
      return this;
    };

    TypedMatrix.prototype.localMoveZTo = function(z) {
      this._has.localMovement = true;
      this._current[12] = z;
      return this;
    };

    TypedMatrix.prototype.localMove = function(x, y, z) {
      this._has.localMovement = true;
      this._current[10] += x;
      this._current[11] += y;
      this._current[12] += z;
      return this;
    };

    TypedMatrix.prototype.localMoveX = function(x) {
      this._has.localMovement = true;
      this._current[10] += x;
      return this;
    };

    TypedMatrix.prototype.localMoveY = function(y) {
      this._has.localMovement = true;
      this._current[11] += y;
      return this;
    };

    TypedMatrix.prototype.localMoveZ = function(z) {
      this._has.localMovement = true;
      this._current[12] += z;
      return this;
    };

    /*
    		Local Rotation
    */


    TypedMatrix.prototype.resetLocalRotation = function() {
      this._has.localRotation = false;
      this._current[13] = 0;
      this._current[14] = 0;
      this._current[15] = 0;
      return this;
    };

    TypedMatrix.prototype.localRotation = function() {
      return {
        x: this._current[13],
        y: this._current[14],
        z: this._current[15]
      };
    };

    TypedMatrix.prototype.localRotateTo = function(x, y, z) {
      this._has.localRotation = true;
      this._current[13] = x;
      this._current[14] = y;
      this._current[15] = z;
      return this;
    };

    TypedMatrix.prototype.localRotateXTo = function(x) {
      this._has.localRotation = true;
      this._current[13] = x;
      return this;
    };

    TypedMatrix.prototype.localRotateYTo = function(y) {
      this._has.localRotation = true;
      this._current[14] = y;
      return this;
    };

    TypedMatrix.prototype.localRotateZTo = function(z) {
      this._has.localRotation = true;
      this._current[15] = z;
      return this;
    };

    TypedMatrix.prototype.localRotate = function(x, y, z) {
      this._has.localRotation = true;
      this._current[13] += x;
      this._current[14] += y;
      this._current[15] += z;
      return this;
    };

    TypedMatrix.prototype.localRotateX = function(x) {
      this._has.localRotation = true;
      this._current[13] += x;
      return this;
    };

    TypedMatrix.prototype.localRotateY = function(y) {
      this._has.localRotation = true;
      this._current[14] += y;
      return this;
    };

    TypedMatrix.prototype.localRotateZ = function(z) {
      this._has.localRotation = true;
      this._current[15] += z;
      return this;
    };

    return TypedMatrix;

  })();
});
