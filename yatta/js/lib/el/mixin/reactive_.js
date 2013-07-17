define(['../../utility/object'], function(object) {
  var Reactive_;

  return Reactive_ = (function() {
    function Reactive_() {}

    Reactive_.prototype.__initMixinReactive = function() {
      this._reactor = null;
      this._reactorVars = {
        started: false
      };
    };

    Reactive_.prototype.__clonerForReactive = function(newEl) {
      newEl.reactor = this._reactor;
      newEl._reactorVars = object.clone(this._reactorVars);
    };

    Reactive_.prototype.react = function(args) {
      if (this._reactorVars.started) {
        throw Error("Reactor already started", this.node);
      }
      this._reactorVars.started = true;
      this._reactor.react(this, args);
      return this;
    };

    Reactive_.prototype.reactLike = function(el) {
      this._reactor = el.reactor;
      this._reactorVars = object.clone(el._reactorVars);
      return this;
    };

    Reactive_.prototype.setReactor = function(r) {
      this._reactor = r;
      return this;
    };

    Reactive_.prototype.configReactor = function(config) {
      object.appendOnto(this._reactorVars, config);
      return this;
    };

    return Reactive_;

  })();
});
