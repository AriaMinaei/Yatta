if typeof define isnt 'function' then define = require('amdefine')(module)

define [
	'./lightmatrix/base'
	'./lightmatrix/translation'
	'./lightmatrix/scale'
	'./lightmatrix/perspective'
	'./lightmatrix/rotation'
	], (Base, Translation, Scale, Perspective, Rotation) ->

	emptyStack = ->

		{
			mX: 0
			mY: 0
			mZ: 0

			sX: 1
			sY: 1
			sZ: 1

			p: 0

			rX: 0
			rY: 0
			rZ: 0

			tX: 0
			tY: 0
			tZ: 0
		}

	copyStack = (from, to) ->

		to.mX = from.mX
		to.mY = from.mY
		to.mZ = from.mZ

		to.sX = from.sX
		to.sY = from.sY
		to.sZ = from.sZ

		to.p  = from.p

		to.rX = from.rX
		to.rY = from.rY
		to.rZ = from.rZ

		to.tX = from.tX
		to.tY = from.tY
		to.tZ = from.tZ


	class LightMatrix

		constructor: ->

			@_main = emptyStack()
			@_temp = emptyStack()

			@_current = @_main

			@_has =

				movement: no

				perspective: no

				rotation: no

				scale: no

				translation: no


			@_identityMatrix = Base.identity()

			@_tempMode = no

		temporarily: ->

			copyStack @_main, @_temp
			@_current = @_temp

			@_tempMode = yes

			@

		commit: ->

			if @_tempMode

				copyStack @_temp, @_main
				@_current = @_main

				@_tempMode = no

			@

		rollBack: ->

			if @_tempMode

				@_current = @_main

				@_tempMode = no

			@

		toCss: ->

			Base.toCss @toMatrix()

		toPlainCss: ->

			# movement
			if @_has.m

				css = Translation.toPlainCss @_current.mX, @_current.mY, @_current.mZ

			else

				css = ''

			# scale
			if @_has.s

				css += Scale.toPlainCss @_current.sX, @_current.sY, @_current.sZ

			# perspectove
			if @_has.p

				css += Perspective.toPlainCss @_current.p

			# rotation
			if @_has.r

				css += Rotation.toPlainCss @_current.rX, @_current.rY, @_current.rZ

			# translation
			if @_has.t

				css += Translation.toPlainCss @_current.tX, @_current.tY, @_current.tZ

			css

		toArray: ->

			Base.toArray @toMatrix()

		toMatrix: ->

			soFar = @_getIdentityMatrix()

			# movement
			if @_has.m

				soFar = Translation.setTo soFar, @_current.mX, @_current.mY, @_current.mZ

			# scale
			if @_has.s

				Scale.applyTo soFar, @_current.sX, @_current.sY, @_current.sZ

			# perspectove
			if @_has.p

				Perspective.applyTo soFar, @_current.p

			# rotation
			if @_has.r

				Rotation.applyTo soFar, @_current.rX, @_current.rY, @_current.rZ

			# translation
			if @_has.t

				Translation.applyTo soFar, @_current.tX, @_current.tY, @_current.tZ

			soFar

		_getIdentityMatrix: ->

			Base.setIdentity @_identityMatrix

			@_identityMatrix

		###
		Movement
		###

		resetMovement: ->

			@_has.m = no

			@_current.mX = 0
			@_current.mY = 0
			@_current.mZ = 0

			@

		movement: ->

			{
				x: @_current.mX
				y: @_current.mY
				z: @_current.mZ
			}

		setMovement: (x, y, z) ->

			@_has.m = yes

			@_current.mX = x
			@_current.mY = y
			@_current.mZ = z

			@

		setMovementX: (x) ->

			@_has.m = yes

			@_current.mX = x

			@

		setMovementY: (y) ->

			@_has.m = yes

			@_current.mY = y

			@

		setMovementZ: (z) ->

			@_has.m = yes

			@_current.mZ = z

			@

		move: (x, y, z) ->

			# This *does* work most of the times
			@_has.m = yes

			@_current.mX += x
			@_current.mY += y
			@_current.mZ += z

			@

		moveX: (x) ->

			@_has.m = yes

			@_current.mX += x

			@

		moveY: (y) ->

			@_has.m = yes

			@_current.mY += y

			@

		moveZ: (z) ->

			@_has.m = yes

			@_current.mZ += z

			@

		###
		Scale
		###

		resetScale: ->

			@_has.s = no

			@_current.sX = 1
			@_current.sY = 1
			@_current.sZ = 1

			@

		getScale: ->

			{
				x: @_current.sX
				y: @_current.sY
				z: @_current.sZ
			}

		setScale: (x, y, z) ->

			@_has.s = yes

			@_current.sX = x
			@_current.sY = y
			@_current.sZ = z

			@

		setScaleX: (x) ->

			@_has.s = yes

			@_current.sX = x

			@

		setScaleY: (y) ->

			@_has.s = yes

			@_current.sY = y

			@

		setScaleZ: (z) ->

			@_has.s = yes

			@_current.sZ = z

			@

		scale: (x, y, z) ->

			# This *does* work most of the times
			@_has.s = yes

			@_current.sX *= x
			@_current.sY *= y
			@_current.sZ *= z

			@

		setScaleAll: (x) ->

			if x is 1

				@_has.s = no

			else

				@_has.s = yes

			@_current.sX = @_current.sY = @_current.sZ = x

			@

		scaleX: (x) ->

			@_has.s = yes

			@_current.sX *= x

			@

		scaleY: (y) ->

			@_has.s = yes

			@_current.sY *= y

			@

		scaleZ: (z) ->

			@_has.s = yes

			@_current.sZ *= z

			@

		###
		Perspective
		###

		resetPerspective: ->

			@_current.p = 0

			@_has.p = no

			@

		setPerspective: (d) ->

			@_current.p = d

			if d
				@_has.p = yes

			@

		###
		Rotation
		###

		resetRotation: ->

			@_has.r = no

			@_current.rX = 0
			@_current.rY = 0
			@_current.rZ = 0

			@

		rotation: ->

			{
				x: @_current.rX
				y: @_current.rY
				z: @_current.rZ
			}

		setRotation: (x, y, z) ->

			@_has.r = yes

			@_current.rX = x
			@_current.rY = y
			@_current.rZ = z

			@

		setRotationX: (x) ->

			@_has.r = yes

			@_current.rX = x

			@

		setRotationY: (y) ->

			@_has.r = yes

			@_current.rY = y

			@

		setRotationZ: (z) ->

			@_has.r = yes

			@_current.rZ = z

			@

		rotate: (x, y, z) ->

			# This *does* work most of the times
			@_has.r = yes

			@_current.rX += x
			@_current.rY += y
			@_current.rZ += z

			@

		rotateX: (x) ->

			@_has.r = yes

			@_current.rX += x

			@

		rotateY: (y) ->

			@_has.r = yes

			@_current.rY += y

			@

		rotateZ: (z) ->

			@_has.r = yes

			@_current.rZ += z

			@

		###
		Translation
		###

		resetTranslation: ->

			@_has.t = no

			@_current.tX = 0
			@_current.tY = 0
			@_current.tZ = 0

			@

		translation: ->

			{
				x: @_current.tX
				y: @_current.tY
				z: @_current.tZ
			}

		setTranslation: (x, y, z) ->

			@_has.t = no if not x and not y and not z

			@_current.tX = x
			@_current.tY = y
			@_current.tZ = z

			@

		setTranslationX: (x) ->

			@_has.t = yes

			@_current.tX = x

			@

		setTranslationY: (y) ->

			@_has.t = yes

			@_current.tY = y

			@

		setTranslationZ: (z) ->

			@_has.t = yes

			@_current.tZ = z

			@

		translate: (x, y, z) ->

			# This *does* work most of the times
			@_has.t = yes

			@_current.tX += x
			@_current.tY += y
			@_current.tZ += z

			@

		translateX: (x) ->

			@_has.t = yes

			@_current.tX += x

			@

		translateY: (y) ->

			@_has.t = yes

			@_current.tY += y

			@

		translateZ: (z) ->

			@_has.t = yes

			@_current.tZ += z

			@