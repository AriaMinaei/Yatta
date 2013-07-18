e = new Rectangle 20, 100

e.fill.withHsl hue[0..360], saturation[0..100], lightness[0..100]

e.fill.setHue(deg)
e.fill.rotateHue(deg)
e.fill.setSaturation(amount)
e.fill.saturate(amount)
e.fill.setLightness(amount)
e.fill.lighten(amount)
e.fill.fromHsl(h, s, l)
e.fill.fromRgb(r, g, b)