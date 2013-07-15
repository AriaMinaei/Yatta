define(function() {
  var ParamEl, isNumeric;

  isNumeric = function(n) {
    return !isNaN(n);
  };
  return ParamEl = (function() {
    function ParamEl(name, val) {
      var _this = this;

      this._containerNode = document.createElement('div');
      this._containerNode.classList.add('yatta-param-container');
      this._nameNode = document.createElement('span');
      this._nameNode.classList.add('yatta-param-name');
      this._containerNode.appendChild(this._nameNode);
      this._inputNode = document.createElement('input');
      this._inputNode.classList.add('yatta-param-input');
      this._containerNode.appendChild(this._inputNode);
      this._inputNode.addEventListener('keyup', function() {
        return setTimeout(function() {
          var v;

          v = _this._inputNode.value;
          _this._val = isNumeric(v) ? Number(v) : v;
          if (_this._onChangeCb != null) {
            return _this._onChangeCb(_this._val);
          }
        }, 0);
      });
      this.setName(name);
      this.setValue(val);
      this.onChange(null);
    }

    ParamEl.prototype.setName = function(name) {
      this._name = String(name);
      this._nameNode.innerHTML = this._name;
      return this;
    };

    ParamEl.prototype.setValue = function(val) {
      this._val = val;
      this._inputNode.value = this._val;
      return this;
    };

    ParamEl.prototype.onChange = function(fn) {
      this._onChangeCb = fn;
      return this;
    };

    ParamEl.prototype.getNode = function() {
      return this._containerNode;
    };

    return ParamEl;

  })();
});
