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

      if (_intervalPool._pool.length > 0) {
        item = _intervalPool._pool.pop();
        item.every = every;
        item.from = from;
        item.timesCalled = timesCalled;
        item.fn = fn;
        return item;
      } else {
        return _intervalPool._getNew(every, from, timesCalled, fn);
      }
    },
    take: function(item) {
      _intervalPool._pool.push(item);
      return null;
    }
  };
});
