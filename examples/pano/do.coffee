###
Don't take this too seriously ;)
###
makePanorama = (fullWidth, fullHeight, texture, fullCircle = no, sides = 50) ->

	width = fullWidth / sides
	height = fullHeight

	sM = if fullCircle then 2 else 1

	r = (fullWidth / PI / sM) - 20

	walls = new Container

	for i in [0..sides]

		index = i + 0.5

		c = new Rectangle width, height

		c.rotateY PI * sM * index / sides
		c.moveX r * sin(PI * sM * index / sides)
		c.moveZ r * cos(PI * sM * index / sides)
		# c.css 'border', '10px solid red'

		c.putIn walls

		c.texturize texture
		c.setTexturePosition -width * i, 0

	walls.go3d().enableAxis()
	.eachFrame (t) ->

		if fullCircle

			@setRotationY (PI * 2 * t / 15000)

		else

			@setRotationY(
				(PI / 2 * backAndForth(t, 15000) / 15000) +
				param('+', 0.8)
			)

		@setOrigin width / 2, param('Origin Y', 0), param('Origin Z', 0)
		@setRotationX param 'Rotation X', 0.33
		@setRotationZ param 'Rotation Z', 0
		@setMovementX display.centerX + param 'Movement X', -width / 2
		@setMovementY param 'Movement Y', -330
		@setMovementZ param 'Movement Z', 0

		@setPerspective param 'Perspective', 1700

	walls

# walls = makePanorama 23478, 2278, 'london.jpg', no
walls = makePanorama 7131, 2009, 'img.jpg', no

do ->

	maxWidth = 1700
	maxHeight = 1100

	if display.width > maxWidth

		dif = display.width - maxWidth

		r = new Rectangle dif / 2, display.height
		r.fill.withRgb 0, 0, 0
		r.z 500

		r.clone().moveX(display.width - dif / 2)

	if display.height > maxHeight

		dif = display.height - maxHeight

		r = new Rectangle display.width, dif / 2
		r.fill.withRgb 0, 0, 0
		r.z 500

		r.clone().moveY(display.height - dif / 2)

console.log 'Image from: http://erikcollinder.deviantart.com/art/Panorama-73725587'