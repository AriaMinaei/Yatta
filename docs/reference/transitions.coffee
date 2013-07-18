el = new Rectangle 20, 100

# Jumps to 100px
el.moveX(100)

# Enable animation. From now on, everything animates
el.trans(200)

# flows 300px in x axis
el.moveX(300)

el.ease('quad.easeOut')
el.ease (p) -> p * p

# List of available easings:
linear
quad.easeIn, 	quad.easeOut, 	quad.easeInOut
cubic.easeIn, 	cubic.easeOut, 	cubic.easeInOut
quart.easeIn, 	quart.easeOut, 	quart.easeInOut
quint.easeIn, 	quint.easeOut, 	quint.easeInOut
expo.easeIn, 	expo.easeOut, 	expo.easeInOut
circ.easeIn, 	circ.easeOut, 	circ.easeInOut
sine.easeIn, 	sine.easeOut, 	sine.easeInOut

# Only transformations and Opacity transitions. Everything else jumps.