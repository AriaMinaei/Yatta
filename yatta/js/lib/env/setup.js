define(['../visuals/animation/frames', '../el/tools/css/color', '../utility/generals'], function(frames, CSSColor) {
  window.CSSColor = CSSColor;
  frames.start();
  window.frames = frames;
  return null;
});
