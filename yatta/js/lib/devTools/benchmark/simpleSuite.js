define(['../../../../requirements/benchmark'], function(Benchmark) {
  var suite;

  suite = new Benchmark.Suite;
  suite.on('cycle', function(e) {
    return console.log(String(e.target));
  });
  suite.on('complete', function() {
    console.groupEnd('Running benchmarks');
    return console.log('Fastest:', this.filter('fastest').pluck('name')[0]);
  });
  suite.on('start', function() {
    console.group('Warming up');
    suite.forEach(function(benchmark) {
      var i, _i;

      for (i = _i = 0; _i <= 40; i = ++_i) {
        benchmark.fn();
      }
      return console.log("Done: " + benchmark.name);
    });
    console.groupEnd('Warming up');
    return console.group('Running benchmarks');
  });
  window.run = function() {
    suite.run({
      async: true
    });
    return null;
  };
  return suite;
});
