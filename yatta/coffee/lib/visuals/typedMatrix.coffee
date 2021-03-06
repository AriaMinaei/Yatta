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

		a[13] = 0
		a[14] = 0
		a[15] = 0

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

		to[13] = from[13]
		to[14] = from[14]
		to[15] = from[15]

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

				localMovement: no

				localRotation: no


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
			if @_has.movement

				css = Translation.toPlainCss @_current[0], @_current[1], @_current[2]

			else

				css = ''

			# perspectove
			if @_has.perspective

				css += Perspective.toPlainCss @_current[6]

			# rotation
			if @_has.rotation

				css += Rotation.toPlainCss @_current[7], @_current[8], @_current[9]

			# translation
			if @_has.localMovement

				css += Translation.toPlainCss @_current[10], @_current[11], @_current[12]

			# rotation
			if @_has.localRotation

				css += Rotation.toPlainCss @_current[13], @_current[14], @_current[15]

			# scale
			if @_has.scale

				css += Scale.toPlainCss @_current[3], @_current[4], @_current[5]

			css

		toStupidCss: ->

			"translate3d(#{@_current[0]}px, #{@_current[1]}px, #{@_current[2]}px) scale3d(#{@_current[3]}, #{@_current[4]}, #{@_current[5]}) perspective(#{@_current[6]}) rotateX(#{@_current[7]}) rotateY(#{@_current[8]}) rotateZ(#{@_current[9]}) translate3d(#{@_current[10]}px, #{@_current[11]}px, #{@_current[12]}px) rotateX(#{@_current[13]}) rotateY(#{@_current[14]}) rotateZ(#{@_current[15]})"

		toArray: ->

			Base.toArray @toMatrix()

		toMatrix: ->

			soFar = @_getIdentityMatrix()

			# movement
			if @_has.movement

				soFar = Translation.setTo soFar, @_current[0], @_current[1], @_current[2]

			# scale
			if @_has.scale

				Scale.applyTo soFar, @_current[3], @_current[4], @_current[5]

			# perspectove
			if @_has.perspective

				Perspective.applyTo soFar, @_current[6]

			# rotation
			if @_has.rotation

				Rotation.applyTo soFar, @_current[7], @_current[8], @_current[9]

			# translation
			if @_has.localMovement

				Translation.applyTo soFar, @_current[10], @_current[11], @_current[12]

			# localRotation
			if @_has.localRotation

				Rotation.applyTo soFar, @_current[13], @_current[14], @_current[15]

			soFar

		_getIdentityMatrix: ->

			Base.setIdentity @_identityMatrix

			@_identityMatrix

		###
		Movement
		###

		resetMovement: ->

			@_has.movement = no

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

		moveTo: (x, y, z) ->

			@_has.movement = yes

			@_current[0] = x
			@_current[1] = y
			@_current[2] = z

			@

		moveXTo: (x) ->

			@_has.movement = yes

			@_current[0] = x

			@

		moveYTo: (y) ->

			@_has.movement = yes

			@_current[1] = y

			@

		moveZTo: (z) ->

			@_has.movement = yes

			@_current[2] = z

			@

		move: (x, y, z) ->

			# This *does* work most of the times
			@_has.movement = yes

			@_current[0] += x
			@_current[1] += y
			@_current[2] += z

			@

		moveX: (x) ->

			@_has.movement = yes

			@_current[0] += x

			@

		moveY: (y) ->

			@_has.movement = yes

			@_current[1] += y

			@

		moveZ: (z) ->

			@_has.movement = yes

			@_current[2] += z

			@

		###
		Scale
		###

		resetScale: ->

			@_has.scale = no

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

		scaleTo: (x, y, z) ->

			@_has.scale = yes

			@_current[3] = x
			@_current[4] = y
			@_current[5] = z

			@

		scaleXTo: (x) ->

			@_has.scale = yes

			@_current[3] = x

			@

		scaleYTo: (y) ->

			@_has.scale = yes

			@_current[4] = y

			@

		scaleZTo: (z) ->

			@_has.scale = yes

			@_current[5] = z

			@

		scale: (x, y, z) ->

			# This *does* work most of the times
			@_has.scale = yes

			@_current[3] *= x
			@_current[4] *= y
			@_current[5] *= z

			@

		scaleAllTo: (x) ->

			if x is 1

				@_has.scale = no

			else

				@_has.scale = yes

			@_current[3] = @_current[4] = @_current[5] = x

			@

		scaleX: (x) ->

			@_has.scale = yes

			@_current[3] *= x

			@

		scaleY: (y) ->

			@_has.scale = yes

			@_current[4] *= y

			@

		scaleZ: (z) ->

			@_has.scale = yes

			@_current[5] *= z

			@

		###
		Perspective
		###

		resetPerspective: ->

			@_current[6] = 0

			@_has.perspective = no

			@

		perspective: (d) ->

			@_current[6] = d

			if d

				@_has.perspective = yes

			@

		###
		Rotation
		###

		resetRotation: ->

			@_has.rotation = no

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

		rotateTo: (x, y, z) ->

			@_has.rotation = yes

			@_current[7] = x
			@_current[8] = y
			@_current[9] = z

			@

		rotateXTo: (x) ->

			@_has.rotation = yes

			@_current[7] = x

			@

		rotateYTo: (y) ->

			@_has.rotation = yes

			@_current[8] = y

			@

		rotateZTo: (z) ->

			@_has.rotation = yes

			@_current[9] = z

			@

		rotate: (x, y, z) ->

			# This *does* work most of the times
			@_has.rotation = yes

			@_current[7] += x
			@_current[8] += y
			@_current[9] += z

			@

		rotateX: (x) ->

			@_has.rotation = yes

			@_current[7] += x

			@

		rotateY: (y) ->

			@_has.rotation = yes

			@_current[8] += y

			@

		rotateZ: (z) ->

			@_has.rotation = yes

			@_current[9] += z

			@

		###
		Local Movement
		###

		resetLocalMovement: ->

			@_has.localMovement = no

			@_current[10] = 0
			@_current[11] = 0
			@_current[12] = 0

			@

		localMovement: ->

			{
				x: @_current[10]
				y: @_current[11]
				z: @_current[12]
			}

		localMoveTo: (x, y, z) ->

			@_has.localMovement = yes

			@_current[10] = x
			@_current[11] = y
			@_current[12] = z

			@

		localMoveXTo: (x) ->

			@_has.localMovement = yes

			@_current[10] = x

			@

		localMoveYTo: (y) ->

			@_has.localMovement = yes

			@_current[11] = y

			@

		localMoveZTo: (z) ->

			@_has.localMovement = yes

			@_current[12] = z

			@

		localMove: (x, y, z) ->

			# This *does* work most of the times
			@_has.localMovement = yes

			@_current[10] += x
			@_current[11] += y
			@_current[12] += z

			@

		localMoveX: (x) ->

			@_has.localMovement = yes

			@_current[10] += x

			@

		localMoveY: (y) ->

			@_has.localMovement = yes

			@_current[11] += y

			@

		localMoveZ: (z) ->

			@_has.localMovement = yes

			@_current[12] += z

			@

		###
		Local Rotation
		###

		resetLocalRotation: ->

			@_has.localRotation = no

			@_current[13] = 0
			@_current[14] = 0
			@_current[15] = 0

			@

		localRotation: ->

			{
				x: @_current[13]
				y: @_current[14]
				z: @_current[15]
			}

		localRotateTo: (x, y, z) ->

			@_has.localRotation = yes

			@_current[13] = x
			@_current[14] = y
			@_current[15] = z

			@

		localRotateXTo: (x) ->

			@_has.localRotation = yes

			@_current[13] = x

			@

		localRotateYTo: (y) ->

			@_has.localRotation = yes

			@_current[14] = y

			@

		localRotateZTo: (z) ->

			@_has.localRotation = yes

			@_current[15] = z

			@

		localRotate: (x, y, z) ->

			# This *does* work most of the times
			@_has.localRotation = yes

			@_current[13] += x
			@_current[14] += y
			@_current[15] += z

			@

		localRotateX: (x) ->

			@_has.localRotation = yes

			@_current[13] += x

			@

		localRotateY: (y) ->

			@_has.localRotation = yes

			@_current[14] += y

			@

		localRotateZ: (z) ->

			@_has.localRotation = yes

			@_current[15] += z

			@

		resetAll: ->

			do @resetMovement
			do @resetScale
			do @resetPerspective
			do @resetRotation
			do @resetLocalMovement
			do @resetLocalRotation