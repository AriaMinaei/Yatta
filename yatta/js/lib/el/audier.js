define(['./mixin/interactions_'], function(Interactions_) {
  var Audier;

  return mixing(Interactions_, Audier = (function() {
    function Audier(filename) {
      this.node = document.createElement('audio');
      this.node.playbackRate = frames.speed;
      this.setFile(filename);
      Audier.__initMixinsFor(this);
    }

    Audier.prototype.jumpTo = function(ms) {
      ms /= 1000;
      this.node.currentTime = ms;
      return this;
    };

    Audier.getter('time', function() {
      return this.node.currentTime * 1000;
    });

    Audier.prototype.setFile = function(filename) {
      this._fileAddr = './audio/' + filename;
      this.node.src = this._fileAddr;
      return this;
    };

    Audier.prototype.play = function() {
      var _this = this;

      this._eventEnabledMethod(arguments, function(cb) {
        if (_this.node.readyState === 4) {
          _this._play();
          return cb();
        } else {
          return _this.node.addEventListener('canplaythrough', function() {
            _this._play();
            return cb();
          });
        }
      });
      return this;
    };

    Audier.prototype._play = function() {
      this.node.playbackRate = frames.speed;
      return this.node.play();
    };

    Audier.prototype.pause = function() {
      this.node.pause();
      return this;
    };

    return Audier;

  })());
});
