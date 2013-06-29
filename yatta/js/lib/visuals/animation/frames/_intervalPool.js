define(function() {
  var _intervalPool;

  return _intervalPool = {
    _pool: [],
    _getNew: function(every, from, timesCalled, fn) {
      return {
        every: every,
        from: from,
        timesCalled: timesCalled,
        fn: fn
      };
    },
    give: function(every, from, timesCalled, fn) {
      var item;

      if (this._pool.length > 0) {
        item = pool.pop();
        item.every = every;
        item.from = from;
        item.timesCalled = timesCalled;
        item.fn = fn;
        return item;
      } else {
        return this._getNew(every, from, timesCalled, fn);
      }
    },
    take: function(item) {
      this._pool.push(item);
      return null;
    }
  };
});
