define(['./benchmark/simpleSuite', '../utility/array'], function(suite, array) {
  var before, cb;

  before = Date.now();
  cb = function(t) {
    return console.log(Date.now() - before);
  };
  frames.nextTick(cb);
  frames.nextTick(cb);
  frames.nextTick(cb);
  suite.add('splice', function() {
    sp();
    return null;
  });
  return suite.add('injectInIndex', function() {
    injectInIndex();
    return null;
  });
});
