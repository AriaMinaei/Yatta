define(['./setup/timing', '../utility/generals'], function(Timing) {
  var item, key;

  for (key in Timing) {
    item = Timing[key];
    window[key] = item;
  }
  return null;
});
