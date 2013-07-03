define(['./mixin/fill_', './mixin/transforms_', '../../../utility/object', '../../../visuals/animation/easing'], function(Fill_, Transforms_, object, easing) {
  var Transitioner;

  return mixing(Fill_, Transforms_, Transitioner = (function() {
    function Transitioner(el) {
      this.el = el;
      this._styleSetter = this.el._styleSetter;
      this._enabled = false;
      this._duration = 1000;
      this._startTime = new Int32Array(1);
      this._startTime[0] = 0;
      this.__initMixins();
      this._eachFrameCallback = this._getEachFrameCallback();
      this._framesEnabled = false;
      this._shouldFinish = false;
      this._needsUpdate = {
        transformMovement: false,
        transformRotation: false,
        transformScale: false,
        transformPerspective: false,
        transformTranslation: false,
        opacity: false
      };
      this.ease('cubic.easeIn');
    }

    Transitioner.prototype.ease = function(func) {
      var f, part, parts, _i, _len;

      if (func instanceof Function) {
        this._easing = func;
        return this;
      }
      if (typeof func !== 'string') {
        throw Error("func should either be a function or a string, like qubic.easeOut");
      }
      parts = func.split('.');
      f = easing;
      for (_i = 0, _len = parts.length; _i < _len; _i++) {
        part = parts[_i];
        f = f[part];
      }
      this._easing = f;
      return this;
    };

    Transitioner.prototype._getEachFrameCallback = function() {
      var _this = this;

      return function(t) {
        _this._updateForTime(t);
      };
    };

    Transitioner.prototype.clone = function(el) {
      var key, newObj;

      newObj = Object.create(this.constructor.prototype);
      newObj.el = el;
      newObj._startTime = new Int32Array(1);
      newObj._startTime[0] = 0;
      newObj._styleSetter = el._styleSetter;
      newObj._framesEnabled = false;
      newObj._shouldFinish = false;
      newObj._eachFrameCallback = newObj._getEachFrameCallback();
      newObj._needsUpdate = {
        transformMovement: false,
        transformRotation: false,
        transformScale: false,
        transformPerspective: false,
        transformTranslation: false,
        opacity: false
      };
      this.__applyCloners(newObj);
      for (key in this) {
        if (newObj[key] != null) {
          continue;
        }
        if (this.hasOwnProperty(key)) {
          newObj[key] = object.clone(this[key], true);
        }
      }
      return newObj;
    };

    Transitioner.prototype.enable = function(duration) {
      this._enabled = true;
      this._duration = duration;
      return this;
    };

    Transitioner.prototype.disable = function() {
      this._enabled = false;
      this._stop();
      return this;
    };

    Transitioner.prototype._ease = function(progress) {
      return Math.sin(progress * Math.PI / 2);
    };

    Transitioner.prototype._update = function() {
      if (this._startTime[0] === frames.time[0]) {
        return;
      }
      this._startOver();
    };

    Transitioner.prototype._adjustFromValues = function() {
      this._adjustFromValuesForTransforms();
      this._adjustFromValuesForFill();
      return this;
    };

    Transitioner.prototype._startOver = function() {
      this._startTime[0] = frames.time[0];
      this._adjustFromValues();
      this._shouldFinish = false;
      return this._startFrames();
    };

    Transitioner.prototype._startFrames = function() {
      if (!this._framesEnabled) {
        frames.onEachFrame(this._eachFrameCallback);
        this._framesEnabled = true;
      }
    };

    Transitioner.prototype._stop = function() {
      if (this._framesEnabled) {
        frames.cancelEachFrame(this._eachFrameCallback);
        this._framesEnabled = false;
      }
      this._shouldFinish = false;
      this._disableTransitionForTransforms();
      this._disableTransitionForFill();
    };

    Transitioner.prototype._updateForTime = function(t) {
      var ellapsed, progress;

      ellapsed = t - this._startTime[0];
      if (this._shouldFinish && ellapsed - this._duration > 1000) {
        this._stop();
        return;
      }
      if (this._shouldFinish) {
        return;
      }
      progress = ellapsed / this._duration;
      if (progress >= 1) {
        progress = 1;
        this._shouldFinish = true;
      }
      progress = this._ease(progress);
      this._updateByProgress(progress);
    };

    Transitioner.prototype._updateByProgress = function(progress) {
      this._updateTransitionForTransforms(progress);
      this._updateTransitionForFill(progress);
      return null;
    };

    return Transitioner;

  })());
});
