define(['./param/el'], function(ParamEl) {
  var Params;

  return Params = (function() {
    function Params() {
      this._params = {};
      this._initialized = false;
    }

    Params.prototype._init = function() {
      if (this._initialized) {
        return;
      }
      this._initialized = true;
      this._containerNode = document.createElement('div');
      this._containerNode.classList.add('yatta-params-container');
      if (!this._putIn) {
        this._putIn = document.body;
      }
      return this._putIn.appendChild(this._containerNode);
    };

    Params.prototype.putIn = function(_putIn) {
      this._putIn = _putIn;
    };

    Params.prototype._addParam = function(name, def) {
      var el,
        _this = this;

      if (!this._initialized) {
        this._init();
      }
      this._params[name] = {
        value: def
      };
      el = new ParamEl(name, def);
      this._params[name].el = el;
      this._containerNode.appendChild(el.getNode());
      el.onChange(function(newVal) {
        return _this._update(name, newVal);
      });
      return this;
    };

    Params.prototype._update = function(name, newVal) {
      this._params[name].value = newVal;
      return this;
    };

    Params.prototype.param = function(name, def) {
      if (this._params[name] == null) {
        this._addParam(name, def);
      }
      return this._params[name].value;
    };

    return Params;

  })();
});
