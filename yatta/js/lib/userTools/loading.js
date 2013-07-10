define(function() {
  var loadImg, loading;

  loading = {};
  loading.load = function(items, cb) {
    var item, loaded, loadedCb, toLoad, _i, _len;

    loaded = 0;
    toLoad = items.length;
    loadedCb = function() {
      loaded++;
      if (loaded === toLoad) {
        return cb();
      }
    };
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      loadImg(item, loadedCb);
    }
  };
  loading.loadWithIndicator = function(items, cb) {
    var indicator;

    loading.load(items, function() {
      indicator.quit();
      return cb();
    });
    indicator = new Type('LOADING');
    indicator.setFace('"HelveticaNeueLT Std Thin", Helvetica, Arial');
    indicator.moveX(display.centerX - 60);
    indicator.moveY(display.centerY - 20);
    indicator.setOpacity(0.5).setScaleAll(0.95).enableTransition(900).setOpacity(1).setScaleAll(1).every(2500).setOpacity(0.5).setScaleAll(0.95).wait(900).setOpacity(1).setScaleAll(1);
  };
  loadImg = function(addr, cb) {
    var img;

    img = document.createElement('img');
    img.src = addr;
    return img.addEventListener('load', function() {
      return cb();
    });
  };
  return loading;
});
