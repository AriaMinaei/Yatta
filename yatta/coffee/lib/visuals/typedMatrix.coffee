if typeof define isnt 'function' then define = require('amdefine')(module)

define [
	'./typedMatrix/base'
	'./typedMatrix/translation'
	'./typedMatrix/scale'
	'./typedMatrix/perspective'
	'./typedMatrix/rotation'
	], (Base, Translation, Scale, Perspective, Rotation) ->

	emptyStack = ->

		a = new Float64Array 16

		a[0] = 0
		a[1] = 0
		a[2] = 0

		a[3] = 1
		a[4] = 1
		a[5] = 1

		a[6] = 10000

		a[7] = 0
		a[8] = 0
		a[9] = 0

		a[10] = 0
		a[11] = 0
		a[12] = 0

		a


	copyStack = (from, to) ->

		to[0] = from[0]
		to[1] = from[1]
		to[2] = from[2]

		to[3] = from[3]
		to[4] = from[4]
		to[5] = from[5]

		to[6]  = from[6]

		to[7] = from[7]
		to[8] = from[8]
		to[9] = from[9]

		to[10] = from[10]
		to[11] = from[11]
		to[12] = from[12]

		return

	class TypedMatrix

		@_emptyStack: emptyStack

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

			# Gotta figure out why this outperforms toCss() and toStupidCss()

			# movement
			if @_has.m

				css = Translation.toPlainCss @_current[0], @_current[1], @_current[2]

			else

				css = ''

			# scale
			if @_has.s

				css += Scale.toPlainCss @_current[3], @_current[4], @_current[5]

			# perspectove
			if @_has.p

				css += Perspective.toPlainCss @_current[6]

			# rotation
			if @_has.r

				css += Rotation.toPlainCss @_current[7], @_current[8], @_current[9]

			# translation
			if @_has.t

				css += Translation.toPlainCss @_current[10], @_current[11], @_current[12]

			css

		toStupidCss: ->

			"translate3d(#{@_current[0]}px, #{@_current[1]}px, #{@_current[2]}px) scale3d(#{@_current[3]}, #{@_current[4]}, #{@_current[5]}) perspective(#{@_current[6]}) rotateX(#{@_current[7]}) rotateY(#{@_current[8]}) rotateZ(#{@_current[9]}) translate3d(#{@_current[10]}px, #{@_current[11]}px, #{@_current[12]}px)"

		toArray: ->

			Base.toArray @toMatrix()

		toMatrix: ->

			soFar = @_getIdentityMatrix()

			# movement
			if @_has.m

				soFar = Translation.setTo soFar, @_current[0], @_current[1], @_current[2]

			# scale
			if @_has.s

				Scale.applyTo soFar, @_current[3], @_current[4], @_current[5]

			# perspectove
			if @_has.p

				Perspective.applyTo soFar, @_current[6]

			# rotation
			if @_has.r

				Rotation.applyTo soFar, @_current[7], @_current[8], @_current[9]

			# translation
			if @_has.t

				Translation.applyTo soFar, @_current[10], @_current[11], @_current[12]

			soFar

		_getIdentityMatrix: ->

			Base.setIdentity @_identityMatrix

			@_identityMatrix

		###
		Movement
		###

		resetMovement: ->

			@_has.m = no

			@_current[0] = 0
			@_current[1] = 0
			@_current[2] = 0

			@

		movement: ->

			{
				x: @_current[0]
				y: @_current[1]
				z: @_current[2]
			}

		setMovement: (x, y, z) ->

			@_has.m = yes

			@_current[0] = x
			@_current[1] = y
			@_current[2] = z

			@

		setMovementX: (x) ->

			@_has.m = yes

			@_current[0] = x

			@

		setMovementY: (y) ->

			@_has.m = yes

			@_current[1] = y

			@

		setMovementZ: (z) ->

			@_has.m = yes

			@_current[2] = z

			@

		move: (x, y, z) ->

			# This *does* work most of the times
			@_has.m = yes

			@_current[0] += x
			@_current[1] += y
			@_current[2] += z

			@

		moveX: (x) ->

			@_has.m = yes

			@_current[0] += x

			@

		moveY: (y) ->

			@_has.m = yes

			@_current[1] += y

			@

		moveZ: (z) ->

			@_has.m = yes

			@_current[2] += z

			@

		###
		Scale
		###

		resetScale: ->

			@_has.s = no

			@_current[3] = 1
			@_current[4] = 1
			@_current[5] = 1

			@

		getScale: ->

			{
				x: @_current[3]
				y: @_current[4]
				z: @_current[5]
			}

		setScale: (x, y, z) ->

			@_has.s = yes

			@_current[3] = x
			@_current[4] = y
			@_current[5] = z

			@

		setScaleX: (x) ->

			@_has.s = yes

			@_current[3] = x

			@

		setScaleY: (y) ->

			@_has.s = yes

			@_current[4] = y

			@

		setScaleZ: (z) ->

			@_has.s = yes

			@_current[5] = z

			@

		scale: (x, y, z) ->

			# This *does* work most of the times
			@_has.s = yes

			@_current[3] *= x
			@_current[4] *= y
			@_current[5] *= z

			@

		setScaleAll: (x) ->

			if x is 1

				@_has.s = no

			else

				@_has.s = yes

			@_current[3] = @_current[4] = @_current[5] = x

			@

		scaleX: (x) ->

			@_has.s = yes

			@_current[3] *= x

			@

		scaleY: (y) ->

			@_has.s = yes

			@_current[4] *= y

			@

		scaleZ: (z) ->

			@_has.s = yes

			@_current[5] *= z

			@

		###
		Perspective
		###

		resetPerspective: ->

			@_current[6] = 0

			@_has.p = no

			@

		setPerspective: (d) ->

			@_current[6] = d

			if d

				@_has.p = yes

			@

		###
		Rotation
		###

		resetRotation: ->

			@_has.r = no

			@_current[7] = 0
			@_current[8] = 0
			@_current[9] = 0

			@

		rotation: ->

			{
				x: @_current[7]
				y: @_current[8]
				z: @_current[9]
			}

		setRotation: (x, y, z) ->

			@_has.r = yes

			@_current[7] = x
			@_current[8] = y
			@_current[9] = z

			@

		setRotationX: (x) ->

			@_has.r = yes

			@_current[7] = x

			@

		setRotationY: (y) ->

			@_has.r = yes

			@_current[8] = y

			@

		setRotationZ: (z) ->

			@_has.r = yes

			@_current[9] = z

			@

		rotate: (x, y, z) ->

			# This *does* work most of the times
			@_has.r = yes

			@_current[7] += x
			@_current[8] += y
			@_current[9] += z

			@

		rotateX: (x) ->

			@_has.r = yes

			@_current[7] += x

			@

		rotateY: (y) ->

			@_has.r = yes

			@_current[8] += y

			@

		rotateZ: (z) ->

			@_has.r = yes

			@_current[9] += z

			@

		###
		Translation
		###

		resetTranslation: ->

			@_has.t = no

			@_current[10] = 0
			@_current[11] = 0
			@_current[12] = 0

			@

		translation: ->

			{
				x: @_current[10]
				y: @_current[11]
				z: @_current[12]
			}

		setTranslation: (x, y, z) ->

			@_has.t = no if not x and not y and not z

			@_current[10] = x
			@_current[11] = y
			@_current[12] = z

			@

		setTranslationX: (x) ->

			@_has.t = yes

			@_current[10] = x

			@

		setTranslationY: (y) ->

			@_has.t = yes

			@_current[11] = y

			@

		setTranslationZ: (z) ->

			@_has.t = yes

			@_current[12] = z

			@

		translate: (x, y, z) ->

			# This *does* work most of the times
			@_has.t = yes

			@_current[10] += x
			@_current[11] += y
			@_current[12] += z

			@

		translateX: (x) ->

			@_has.t = yes

			@_current[10] += x

			@

		translateY: (y) ->

			@_has.t = yes

			@_current[11] += y

			@

		translateZ: (z) ->

			@_has.t = yes

			@_current[12] += z

			@