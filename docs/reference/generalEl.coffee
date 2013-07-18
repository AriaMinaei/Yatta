el = new Rectangle 20

el.every(300).clone().moveX(300)

el.wait(5000).quit()

el.enableAxis()

el.setBorder(thickness, r, g, b)
el.setOpacity(d)
el.adjustOpacity(d)
el.texturize(filename) # if filename is 'a.jpg', it'll lookup './images/a.jpg'
el.setTexturePosition(x, y)
el.makeHollow() # Removes background
el.setTextColor(r, g, b)

el.z(i) # z-index
el.css(prop, val) #css property
el.addClass(c)
el.removeClass(c)
el.toggleClass(c)
el.setClass(c)

el.setWidth(w)
el.setHeight(h)

setFace(face) # Set Font face
setSize(size) # Font Size
setColor(r, g, b) # Font Color