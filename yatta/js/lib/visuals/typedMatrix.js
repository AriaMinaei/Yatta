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
        translation: false
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

      if (this._has.m) {
        css = Translation.toPlainCss(this._current[0], this._current[1], this._current[2]);
      } else {
        css = '';
      }
      if (this._has.s) {
        css += Scale.toPlainCss(this._current[3], this._current[4], this._current[5]);
      }
      if (this._has.p) {
        css += Perspective.toPlainCss(this._current[6]);
      }
      if (this._has.r) {
        css += Rotation.toPlainCss(this._current[7], this._current[8], this._current[9]);
      }
      if (this._has.t) {
        css += Translation.toPlainCss(this._current[10], this._current[11], this._current[12]);
      }
      return css;
    };

    TypedMatrix.prototype.toStupidCss = function() {
      return "translate3d(" + this._current[0] + "px, " + this._current[1] + "px, " + this._current[2] + "px) scale3d(" + this._current[3] + ", " + this._current[4] + ", " + this._current[5] + ") perspective(" + this._current[6] + ") rotateX(" + this._current[7] + ") rotateY(" + this._current[8] + ") rotateZ(" + this._current[9] + ") translate3d(" + this._current[10] + "px, " + this._current[11] + "px, " + this._current[12] + "px)";
    };

    TypedMatrix.prototype.toArray = function() {
      return Base.toArray(this.toMatrix());
    };

    TypedMatrix.prototype.toMatrix = function() {
      var soFar;

      soFar = this._getIdentityMatrix();
      if (this._has.m) {
        soFar = Translation.setTo(soFar, this._current[0], this._current[1], this._current[2]);
      }
      if (this._has.s) {
        Scale.applyTo(soFar, this._current[3], this._current[4], this._current[5]);
      }
      if (this._has.p) {
        Perspective.applyTo(soFar, this._current[6]);
      }
      if (this._has.r) {
        Rotation.applyTo(soFar, this._current[7], this._current[8], this._current[9]);
      }
      if (this._has.t) {
        Translation.applyTo(soFar, this._current[10], this._current[11], this._current[12]);
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
      this._has.m = false;
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

    TypedMatrix.prototype.setMovement = function(x, y, z) {
      this._has.m = true;
      this._current[0] = x;
      this._current[1] = y;
      this._current[2] = z;
      return this;
    };

    TypedMatrix.prototype.setMovementX = function(x) {
      this._has.m = true;
      this._current[0] = x;
      return this;
    };

    TypedMatrix.prototype.setMovementY = function(y) {
      this._has.m = true;
      this._current[1] = y;
      return this;
    };

    TypedMatrix.prototype.setMovementZ = function(z) {
      this._has.m = true;
      this._current[2] = z;
      return this;
    };

    TypedMatrix.prototype.move = function(x, y, z) {
      this._has.m = true;
      this._current[0] += x;
      this._current[1] += y;
      this._current[2] += z;
      return this;
    };

    TypedMatrix.prototype.moveX = function(x) {
      this._has.m = true;
      this._current[0] += x;
      return this;
    };

    TypedMatrix.prototype.moveY = function(y) {
      this._has.m = true;
      this._current[1] += y;
      return this;
    };

    TypedMatrix.prototype.moveZ = function(z) {
      this._has.m = true;
      this._current[2] += z;
      return this;
    };

    /*
    		Scale
    */


    TypedMatrix.prototype.resetScale = function() {
      this._has.s = false;
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

    TypedMatrix.prototype.setScale = function(x, y, z) {
      this._has.s = true;
      this._current[3] = x;
      this._current[4] = y;
      this._current[5] = z;
      return this;
    };

    TypedMatrix.prototype.setScaleX = function(x) {
      this._has.s = true;
      this._current[3] = x;
      return this;
    };

    TypedMatrix.prototype.setScaleY = function(y) {
      this._has.s = true;
      this._current[4] = y;
      return this;
    };

    TypedMatrix.prototype.setScaleZ = function(z) {
      this._has.s = true;
      this._current[5] = z;
      return this;
    };

    TypedMatrix.prototype.scale = function(x, y, z) {
      this._has.s = true;
      this._current[3] *= x;
      this._current[4] *= y;
      this._current[5] *= z;
      return this;
    };

    TypedMatrix.prototype.setScaleAll = function(x) {
      if (x === 1) {
        this._has.s = false;
      } else {
        this._has.s = true;
      }
      this._current[3] = this._current[4] = this._current[5] = x;
      return this;
    };

    TypedMatrix.prototype.scaleX = function(x) {
      this._has.s = true;
      this._current[3] *= x;
      return this;
    };

    TypedMatrix.prototype.scaleY = function(y) {
      this._has.s = true;
      this._current[4] *= y;
      return this;
    };

    TypedMatrix.prototype.scaleZ = function(z) {
      this._has.s = true;
      this._current[5] *= z;
      return this;
    };

    /*
    		Perspective
    */


    TypedMatrix.prototype.resetPerspective = function() {
      this._current[6] = 0;
      this._has.p = false;
      return this;
    };

    TypedMatrix.prototype.setPerspective = function(d) {
      this._current[6] = d;
      if (d) {
        this._has.p = true;
      }
      return this;
    };

    /*
    		Rotation
    */


    TypedMatrix.prototype.resetRotation = function() {
      this._has.r = false;
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

    TypedMatrix.prototype.setRotation = function(x, y, z) {
      this._has.r = true;
      this._current[7] = x;
      this._current[8] = y;
      this._current[9] = z;
      return this;
    };

    TypedMatrix.prototype.setRotationX = function(x) {
      this._has.r = true;
      this._current[7] = x;
      return this;
    };

    TypedMatrix.prototype.setRotationY = function(y) {
      this._has.r = true;
      this._current[8] = y;
      return this;
    };

    TypedMatrix.prototype.setRotationZ = function(z) {
      this._has.r = true;
      this._current[9] = z;
      return this;
    };

    TypedMatrix.prototype.rotate = function(x, y, z) {
      this._has.r = true;
      this._current[7] += x;
      this._current[8] += y;
      this._current[9] += z;
      return this;
    };

    TypedMatrix.prototype.rotateX = function(x) {
      this._has.r = true;
      this._current[7] += x;
      return this;
    };

    TypedMatrix.prototype.rotateY = function(y) {
      this._has.r = true;
      this._current[8] += y;
      return this;
    };

    TypedMatrix.prototype.rotateZ = function(z) {
      this._has.r = true;
      this._current[9] += z;
      return this;
    };

    /*
    		Translation
    */


    TypedMatrix.prototype.resetTranslation = function() {
      this._has.t = false;
      this._current[10] = 0;
      this._current[11] = 0;
      this._current[12] = 0;
      return this;
    };

    TypedMatrix.prototype.translation = function() {
      return {
        x: this._current[10],
        y: this._current[11],
        z: this._current[12]
      };
    };

    TypedMatrix.prototype.setTranslation = function(x, y, z) {
      if (!x && !y && !z) {
        this._has.t = false;
      }
      this._current[10] = x;
      this._current[11] = y;
      this._current[12] = z;
      return this;
    };

    TypedMatrix.prototype.setTranslationX = function(x) {
      this._has.t = true;
      this._current[10] = x;
      return this;
    };

    TypedMatrix.prototype.setTranslationY = function(y) {
      this._has.t = true;
      this._current[11] = y;
      return this;
    };

    TypedMatrix.prototype.setTranslationZ = function(z) {
      this._has.t = true;
      this._current[12] = z;
      return this;
    };

    TypedMatrix.prototype.translate = function(x, y, z) {
      this._has.t = true;
      this._current[10] += x;
      this._current[11] += y;
      this._current[12] += z;
      return this;
    };

    TypedMatrix.prototype.translateX = function(x) {
      this._has.t = true;
      this._current[10] += x;
      return this;
    };

    TypedMatrix.prototype.translateY = function(y) {
      this._has.t = true;
      this._current[11] += y;
      return this;
    };

    TypedMatrix.prototype.translateZ = function(z) {
      this._has.t = true;
      this._current[12] += z;
      return this;
    };

    return TypedMatrix;

  })();
});
