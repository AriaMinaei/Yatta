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
      Transitioner.__initMixinsFor(this);
      this._needsUpdate = {
        transformMovement: false,
        transformRotation: false,
        transformScale: false,
        transformPerspective: false,
        transformTranslation: false,
        opacity: false
      };
      this._shouldUpdate = false;
      this.ease('cubic.easeOut');
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
      if (typeof f === 'undefined') {
        throw Error("Cannot find easing function `" + func + "`");
      }
      this._easing = f;
      return this;
    };

    Transitioner.prototype.clone = function(el) {
      var key, newObj;

      newObj = Object.create(this.constructor.prototype);
      newObj.el = el;
      newObj._startTime = new Int32Array(1);
      newObj._startTime[0] = 0;
      newObj._styleSetter = el._styleSetter;
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
          console.log;
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

    Transitioner.prototype._stop = function() {
      this._shouldUpdate = false;
      this._disableTransitionForTransforms();
      this._disableTransitionForFill();
    };

    Transitioner.prototype._update = function() {
      if (this._startTime[0] === frames.timeInMs[0]) {
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
      this._startTime[0] = frames.timeInMs[0];
      this._adjustFromValues();
      this._shouldUpdate = true;
      return this._scheduleUpdate();
    };

    Transitioner.prototype._scheduleUpdate = function() {
      return this.el._scheduleUpdate();
    };

    Transitioner.prototype._updateTransition = function() {
      if (!this._enabled || !this._shouldUpdate) {
        return;
      }
      return this._updateForTime(frames.timeInMs[0]);
    };

    Transitioner.prototype._updateForTime = function(t) {
      var ellapsed, progress;

      ellapsed = t - this._startTime[0];
      progress = ellapsed / this._duration;
      if (progress >= 1) {
        progress = 1;
        this._stop();
      } else {
        this._scheduleUpdate();
      }
      progress = this._ease(progress);
      this._updateByProgress(progress);
    };

    Transitioner.prototype._updateByProgress = function(progress) {
      this._updateTransitionForTransforms(progress);
      this._updateTransitionForFill(progress);
      return null;
    };

    Transitioner.prototype._ease = function(progress) {
      return this._easing(progress);
    };

    return Transitioner;

  })());
});
