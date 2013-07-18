c = new Container

for i in [0..20]

	el = new Ellipse 20
	el.putIn c

	el.fill.withHsl 200, 100, 50
	el.moveX rand 0, 1500

	el.moveY rand 0, 300

# Children
c.each (child, childNumber) ->

	child.trans(300).moveX childNumber * 10

	@moveX 10 # Works on the container itself

c.each().moveX(_rand(-10, 10))