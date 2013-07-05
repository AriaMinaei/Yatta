define(function() {
  var _timeoutPool;

  return _timeoutPool = {
    _pool: [],
    _getNew: function(time, fn) {
      return {
        time: time,
        fn: fn
      };
    },
    give: function(time, fn) {
      var item;

      if (this._pool.length > 0) {
        item = this._pool.pop();
        item.time = time;
        item.fn = fn;
        return item;
      } else {
        return this._getNew(time, fn);
      }
    },
    take: function(item) {
      this._pool.push(item);
      return null;
    }
  };
});
