define [
	'../../../../visuals/lightmatrix'
], (LightMatrix) ->

	class Transforms_

		__initMixinTransforms: ->

			@_toMatrix = LightMatrix._emptyStack()

			@_fromMatrix = LightMatrix._emptyStack()

			@_currentMatrix = @el._styleSetter._transformer._current

		__clonerForTransforms: (newObj) ->

			newObj._currentMatrix = newObj.el._styleSetter._transformer._current

			return

		_adjustTransformsForTimeJump: ->

			@_fromMatrix.mX = @_currentMatrix.mX
			@_fromMatrix.mY = @_currentMatrix.mY
			@_fromMatrix.mZ = @_currentMatrix.mZ

			@_fromMatrix.sX = @_currentMatrix.sX
			@_fromMatrix.sY = @_currentMatrix.sY
			@_fromMatrix.sZ = @_currentMatrix.sZ

			@_fromMatrix.rX = @_currentMatrix.rX
			@_fromMatrix.rY = @_currentMatrix.rY
			@_fromMatrix.rZ = @_currentMatrix.rZ

			@_fromMatrix.tX = @_currentMatrix.tX
			@_fromMatrix.tY = @_currentMatrix.tY
			@_fromMatrix.tZ = @_currentMatrix.tZ

			@_fromMatrix.p = @_currentMatrix.p

			@

		_updateMovement: (progress) ->

			if progress is 1

				@_needsUpdate.transformMovement = no

			@_styleSetter.setMovement (
					@_fromMatrix.mX +
					((@_toMatrix.mX - @_fromMatrix.mX) * progress)
				),
				(
					@_fromMatrix.mY +
					((@_toMatrix.mY - @_fromMatrix.mY) * progress)
				),
				(
					@_fromMatrix.mZ +
					((@_toMatrix.mZ - @_fromMatrix.mZ) * progress)
				)

			null

		# _updateMovementX: (progress) ->

		# 	return @_updateMovement progress

		# 	@_styleSetter.setMovementX (
		# 			@_fromMatrix.mX +
		# 			((@_toMatrix.mX - @_fromMatrix.mX) * progress)
		# 		)

		# 	null

		# _updateMovementY: (progress) ->

		# 	return @_updateMovement progress

		# 	@_styleSetter.setMovementY (
		# 			@_fromMatrix.mY +
		# 			((@_toMatrix.mY - @_fromMatrix.mY) * progress)
		# 		)

		# 	null

		# _updateMovementZ: (progress) ->

		# 	return @_updateMovement progress

		# 	@_styleSetter.setMovementZ (
		# 			@_fromMatrix.mZ +
		# 			((@_toMatrix.mZ - @_fromMatrix.mZ) * progress)
		# 		)

		# 	null

		resetMovement: ->

			@_fromMatrix.mX = @_currentMatrix.mX
			@_fromMatrix.mY = @_currentMatrix.mY
			@_fromMatrix.mZ = @_currentMatrix.mZ


			@_toMatrix.mX = 0
			@_toMatrix.mY = 0
			@_toMatrix.mZ = 0

			@_needsUpdate.transformMovement = yes
			do @_update

			@

		setMovement: (x, y, z) ->

			@_fromMatrix.mX = @_currentMatrix.mX
			@_fromMatrix.mY = @_currentMatrix.mY
			@_fromMatrix.mZ = @_currentMatrix.mZ

			@_toMatrix.mX = x
			@_toMatrix.mY = y
			@_toMatrix.mZ = z

			@_needsUpdate.transformMovement = yes
			do @_update

			@

		setMovementX: (x) ->

			@_fromMatrix.mX = @_currentMatrix.mX
			@_fromMatrix.mY = @_currentMatrix.mY
			@_fromMatrix.mZ = @_currentMatrix.mZ

			@_toMatrix.mX = x

			@_needsUpdate.transformMovement = yes
			do @_update

			@

		setMovementY: (y) ->

			@_fromMatrix.mX = @_currentMatrix.mX
			@_fromMatrix.mY = @_currentMatrix.mY
			@_fromMatrix.mZ = @_currentMatrix.mZ

			@_toMatrix.mY = y

			@_needsUpdate.transformMovement = yes
			do @_update

			@

		setMovementZ: (z) ->

			@_fromMatrix.mX = @_currentMatrix.mX
			@_fromMatrix.mY = @_currentMatrix.mY
			@_fromMatrix.mZ = @_currentMatrix.mZ

			@_toMatrix.mZ = z

			@_needsUpdate.transformMovement = yes
			do @_update

			@

		move: (x, y, z) ->

			@_fromMatrix.mX = @_currentMatrix.mX
			@_fromMatrix.mY = @_currentMatrix.mY
			@_fromMatrix.mZ = @_currentMatrix.mZ

			@_toMatrix.mX = @_currentMatrix.mX + x
			@_toMatrix.mY = @_currentMatrix.mY + y
			@_toMatrix.mZ = @_currentMatrix.mZ + z

			@_needsUpdate.transformMovement = yes
			do @_update

			@

		moveX: (x) ->

			@_fromMatrix.mX = @_currentMatrix.mX
			@_fromMatrix.mY = @_currentMatrix.mY
			@_fromMatrix.mZ = @_currentMatrix.mZ

			@_toMatrix.mX = @_currentMatrix.mX + x

			@_needsUpdate.transformMovement = yes
			do @_update

			@

		moveY: (y) ->

			@_fromMatrix.mX = @_currentMatrix.mX
			@_fromMatrix.mY = @_currentMatrix.mY
			@_fromMatrix.mZ = @_currentMatrix.mZ

			@_toMatrix.mY = @_currentMatrix.mY + y

			@_needsUpdate.transformMovement = yes
			do @_update

			@

		moveZ: (z) ->

			@_fromMatrix.mX = @_currentMatrix.mX
			@_fromMatrix.mY = @_currentMatrix.mY
			@_fromMatrix.mZ = @_currentMatrix.mZ

			@_toMatrix.mZ = @_currentMatrix.mZ + z

			@_needsUpdate.transformMovement = yes
			do @_update

			@

		###
		Scale
		###

		_updateScale: (progress) ->

			if progress is 1

				@_needsUpdate.transformScale = no

			@_styleSetter.setScale (
					@_fromMatrix.sX +
					((@_toMatrix.sX - @_fromMatrix.sX) * progress)
				),
				(
					@_fromMatrix.sY +
					((@_toMatrix.sY - @_fromMatrix.sY) * progress)
				),
				(
					@_fromMatrix.sZ +
					((@_toMatrix.sZ - @_fromMatrix.sZ) * progress)
				)

			null

		# _updateScaleX: (progress) ->

		# 	@_styleSetter.setScaleX (
		# 			@_fromMatrix.sX +
		# 			((@_toMatrix.sX - @_fromMatrix.sX) * progress)
		# 		)

		# 	null

		# _updateScaleY: (progress) ->

		# 	@_styleSetter.setScaleY (
		# 			@_fromMatrix.sY +
		# 			((@_toMatrix.sY - @_fromMatrix.sY) * progress)
		# 		)

		# 	null

		# _updateScaleZ: (progress) ->

			@_styleSetter.setScaleZ (
					@_fromMatrix.sZ +
					((@_toMatrix.sZ - @_fromMatrix.sZ) * progress)
				)

			null

		resetScale: ->

			@_fromMatrix.sX = @_currentMatrix.sX
			@_fromMatrix.sY = @_currentMatrix.sY
			@_fromMatrix.sZ = @_currentMatrix.sZ

			@_needsUpdate.transformScale = yes
			do @_update

			@_toMatrix.sX = 1
			@_toMatrix.sY = 1
			@_toMatrix.sZ = 1

			@

		setScale: (x, y, z) ->

			@_fromMatrix.sX = @_currentMatrix.sX
			@_fromMatrix.sY = @_currentMatrix.sY
			@_fromMatrix.sZ = @_currentMatrix.sZ

			@_needsUpdate.transformScale = yes
			do @_update

			@_toMatrix.sX = x
			@_toMatrix.sY = y
			@_toMatrix.sZ = z

			@

		setScaleX: (x) ->

			@_fromMatrix.sX = @_currentMatrix.sX
			@_fromMatrix.sY = @_currentMatrix.sY
			@_fromMatrix.sZ = @_currentMatrix.sZ

			@_needsUpdate.transformScale = yes
			do @_update

			@_toMatrix.sX = x

			@

		setScaleY: (y) ->

			@_fromMatrix.sX = @_currentMatrix.sX
			@_fromMatrix.sY = @_currentMatrix.sY
			@_fromMatrix.sZ = @_currentMatrix.sZ

			@_needsUpdate.transformScale = yes
			do @_update

			@_toMatrix.sY = y

			@

		setScaleZ: (z) ->

			@_fromMatrix.sX = @_currentMatrix.sX
			@_fromMatrix.sY = @_currentMatrix.sY
			@_fromMatrix.sZ = @_currentMatrix.sZ

			@_needsUpdate.transformScale = yes
			do @_update

			@_toMatrix.sZ = z

			@

		scale: (x, y, z) ->

			@_fromMatrix.sX = @_currentMatrix.sX
			@_fromMatrix.sY = @_currentMatrix.sY
			@_fromMatrix.sZ = @_currentMatrix.sZ

			@_needsUpdate.transformScale = yes
			do @_update

			@_toMatrix.sX = @_currentMatrix.sX * x
			@_toMatrix.sY = @_currentMatrix.sY * y
			@_toMatrix.sZ = @_currentMatrix.sZ * z

			@

		setScaleAll: (x) ->

			@_fromMatrix.sX = @_currentMatrix.sX
			@_fromMatrix.sY = @_currentMatrix.sY
			@_fromMatrix.sZ = @_currentMatrix.sZ

			@_needsUpdate.transformScale = yes
			do @_update

			@_toMatrix.sX = @_toMatrix.sY = @_toMatrix.sZ = x

			@

		scaleX: (x) ->

			@_fromMatrix.sX = @_currentMatrix.sX
			@_fromMatrix.sY = @_currentMatrix.sY
			@_fromMatrix.sZ = @_currentMatrix.sZ

			@_needsUpdate.transformScale = yes
			do @_update

			@_toMatrix.sX = @_currentMatrix.sX * x

			@

		scaleY: (y) ->

			@_fromMatrix.sX = @_currentMatrix.sX
			@_fromMatrix.sY = @_currentMatrix.sY
			@_fromMatrix.sZ = @_currentMatrix.sZ

			@_needsUpdate.transformScale = yes
			do @_update

			@_toMatrix.sY = @_currentMatrix.sY * y

			@

		scaleZ: (z) ->

			@_fromMatrix.sX = @_currentMatrix.sX
			@_fromMatrix.sY = @_currentMatrix.sY
			@_fromMatrix.sZ = @_currentMatrix.sZ

			@_needsUpdate.transformScale = yes
			do @_update

			@_toMatrix.sZ = @_currentMatrix.sZ * z

			@

		###
		Perspective
		###

		_updatePerspective: (progress) ->

			if progress is 1

				@_needsUpdate.transformPerspective = no

			@_styleSetter.setPerspective (
					@_fromMatrix.p +
					((@_toMatrix.p - @_fromMatrix.p) * progress)
				)

			null

		resetPerspective: ->

			@_fromMatrix.p = @_currentMatrix.p

			@_needsUpdate.transformPerspective = yes
			do @_update

			@_toMatrix.p = 0


			@

		setPerspective: (d) ->

			@_fromMatrix.p = @_currentMatrix.p

			@_needsUpdate.transformPerspective = yes
			do @_update

			@_toMatrix.p = d

			@

		###
		Rotation
		###

		_updateRotation: (progress) ->

			if progress is 1

				@_needsUpdate.transformRotation = no

			@_styleSetter.setRotation (
					@_fromMatrix.rX +
					((@_toMatrix.rX - @_fromMatrix.rX) * progress)
				),
				(
					@_fromMatrix.rY +
					((@_toMatrix.rY - @_fromMatrix.rY) * progress)
				),
				(
					@_fromMatrix.rZ +
					((@_toMatrix.rZ - @_fromMatrix.rZ) * progress)
				)

			null

		# _updateRotationX: (progress) ->

		# 	@_styleSetter.setRotationX (
		# 			@_fromMatrix.rX +
		# 			((@_toMatrix.rX - @_fromMatrix.rX) * progress)
		# 		)

		# 	null

		# _updateRotationY: (progress) ->

		# 	@_styleSetter.setRotationY (
		# 			@_fromMatrix.rY +
		# 			((@_toMatrix.rY - @_fromMatrix.rY) * progress)
		# 		)

		# 	null

		# _updateRotationZ: (progress) ->

			@_styleSetter.setRotationZ (
					@_fromMatrix.rZ +
					((@_toMatrix.rZ - @_fromMatrix.rZ) * progress)
				)

			null

		resetRotation: ->

			@_fromMatrix.rX = @_currentMatrix.rX
			@_fromMatrix.rY = @_currentMatrix.rY
			@_fromMatrix.rZ = @_currentMatrix.rZ

			@_needsUpdate.transformRotation = yes
			do @_update

			@_toMatrix.rX = 0
			@_toMatrix.rY = 0
			@_toMatrix.rZ = 0

			@

		setRotation: (x, y, z) ->

			@_fromMatrix.rX = @_currentMatrix.rX
			@_fromMatrix.rY = @_currentMatrix.rY
			@_fromMatrix.rZ = @_currentMatrix.rZ

			@_needsUpdate.transformRotation = yes
			do @_update

			@_toMatrix.rX = x
			@_toMatrix.rY = y
			@_toMatrix.rZ = z

			@

		setRotationX: (x) ->

			@_fromMatrix.rX = @_currentMatrix.rX
			@_fromMatrix.rY = @_currentMatrix.rY
			@_fromMatrix.rZ = @_currentMatrix.rZ

			@_needsUpdate.transformRotation = yes
			do @_update

			@_toMatrix.rX = x

			@

		setRotationY: (y) ->

			@_fromMatrix.rX = @_currentMatrix.rX
			@_fromMatrix.rY = @_currentMatrix.rY
			@_fromMatrix.rZ = @_currentMatrix.rZ

			@_needsUpdate.transformRotation = yes
			do @_update

			@_toMatrix.rY = y

			@

		setRotationZ: (z) ->

			@_fromMatrix.rX = @_currentMatrix.rX
			@_fromMatrix.rY = @_currentMatrix.rY
			@_fromMatrix.rZ = @_currentMatrix.rZ

			@_needsUpdate.transformRotation = yes
			do @_update

			@_toMatrix.rZ = z

			@

		rotate: (x, y, z) ->

			@_fromMatrix.rX = @_currentMatrix.rX
			@_fromMatrix.rY = @_currentMatrix.rY
			@_fromMatrix.rZ = @_currentMatrix.rZ

			@_needsUpdate.transformRotation = yes
			do @_update

			@_toMatrix.rX = @_currentMatrix.rX + x
			@_toMatrix.rY = @_currentMatrix.rY + y
			@_toMatrix.rZ = @_currentMatrix.rZ + z

			@

		rotateX: (x) ->

			@_fromMatrix.rX = @_currentMatrix.rX
			@_fromMatrix.rY = @_currentMatrix.rY
			@_fromMatrix.rZ = @_currentMatrix.rZ

			@_needsUpdate.transformRotation = yes
			do @_update

			@_toMatrix.rX = @_currentMatrix.rX + x

			@

		rotateY: (y) ->

			@_fromMatrix.rX = @_currentMatrix.rX
			@_fromMatrix.rY = @_currentMatrix.rY
			@_fromMatrix.rZ = @_currentMatrix.rZ

			@_needsUpdate.transformRotation = yes
			do @_update

			@_toMatrix.rY = @_currentMatrix.rY + y

			@

		rotateZ: (z) ->

			@_fromMatrix.rX = @_currentMatrix.rX
			@_fromMatrix.rY = @_currentMatrix.rY
			@_fromMatrix.rZ = @_currentMatrix.rZ

			@_needsUpdate.transformRotation = yes
			do @_update


			@_toMatrix.rZ = @_currentMatrix.rZ + z

			@

		###
		Translation
		###

		_updateTranslation: (progress) ->

			if progress is 1

				@_needsUpdate.transformTranslation = no

			@_styleSetter.setRotation (
					@_fromMatrix.tX +
					((@_toMatrix.tX - @_fromMatrix.tX) * progress)
				),
				(
					@_fromMatrix.tY +
					((@_toMatrix.tY - @_fromMatrix.tY) * progress)
				),
				(
					@_fromMatrix.tZ +
					((@_toMatrix.tZ - @_fromMatrix.tZ) * progress)
				)

			null

		# _updateTranslationX: (progress) ->

		# 	@_styleSetter.setTranslationX (
		# 			@_fromMatrix.tX +
		# 			((@_toMatrix.tX - @_fromMatrix.tX) * progress)
		# 		)

		# 	null

		# _updateTranslationY: (progress) ->

		# 	@_styleSetter.setTranslationY (
		# 			@_fromMatrix.tY +
		# 			((@_toMatrix.tY - @_fromMatrix.tY) * progress)
		# 		)

		# 	null

		# _updateTranslationZ: (progress) ->

			@_styleSetter.setTranslationZ (
					@_fromMatrix.tZ +
					((@_toMatrix.tZ - @_fromMatrix.tZ) * progress)
				)

			null

		resetTranslation: ->

			@_fromMatrix.tX = @_currentMatrix.tX
			@_fromMatrix.tY = @_currentMatrix.tY
			@_fromMatrix.tZ = @_currentMatrix.tZ

			@_needsUpdate.transformTranslation = yes
			do @_update

			@_toMatrix.tX = 0
			@_toMatrix.tY = 0
			@_toMatrix.tZ = 0

			@

		setTranslation: (x, y, z) ->

			@_fromMatrix.tX = @_currentMatrix.tX
			@_fromMatrix.tY = @_currentMatrix.tY
			@_fromMatrix.tZ = @_currentMatrix.tZ

			@_needsUpdate.transformTranslation = yes
			do @_update

			@_toMatrix.tX = x
			@_toMatrix.tY = y
			@_toMatrix.tZ = z

			@

		setTranslationX: (x) ->

			@_fromMatrix.tX = @_currentMatrix.tX
			@_fromMatrix.tY = @_currentMatrix.tY
			@_fromMatrix.tZ = @_currentMatrix.tZ

			@_needsUpdate.transformTranslation = yes
			do @_update

			@_toMatrix.tX = x

			@

		setTranslationY: (y) ->

			@_fromMatrix.tX = @_currentMatrix.tX
			@_fromMatrix.tY = @_currentMatrix.tY
			@_fromMatrix.tZ = @_currentMatrix.tZ

			@_needsUpdate.transformTranslation = yes
			do @_update

			@_toMatrix.tY = y

			@

		setTranslationZ: (z) ->

			@_fromMatrix.tX = @_currentMatrix.tX
			@_fromMatrix.tY = @_currentMatrix.tY
			@_fromMatrix.tZ = @_currentMatrix.tZ

			@_needsUpdate.transformTranslation = yes
			do @_update

			@_toMatrix.tZ = z

			@

		translate: (x, y, z) ->

			@_fromMatrix.tX = @_currentMatrix.tX
			@_fromMatrix.tY = @_currentMatrix.tY
			@_fromMatrix.tZ = @_currentMatrix.tZ

			@_needsUpdate.transformTranslation = yes
			do @_update

			@_toMatrix.tX = @_currentMatrix.tX + x
			@_toMatrix.tY = @_currentMatrix.tY + y
			@_toMatrix.tZ = @_currentMatrix.tZ + z

			@

		translateX: (x) ->

			@_fromMatrix.tX = @_currentMatrix.tX
			@_fromMatrix.tY = @_currentMatrix.tY
			@_fromMatrix.tZ = @_currentMatrix.tZ

			@_needsUpdate.transformTranslation = yes
			do @_update

			@_toMatrix.tX = @_currentMatrix.tX + x

			@

		translateY: (y) ->

			@_fromMatrix.tX = @_currentMatrix.tX
			@_fromMatrix.tY = @_currentMatrix.tY
			@_fromMatrix.tZ = @_currentMatrix.tZ

			@_needsUpdate.transformTranslation = yes
			do @_update

			@_toMatrix.tY = @_currentMatrix.tY + y

			@

		translateZ: (z) ->

			@_fromMatrix.tX = @_currentMatrix.tX
			@_fromMatrix.tY = @_currentMatrix.tY
			@_fromMatrix.tZ = @_currentMatrix.tZ

			@_needsUpdate.transformTranslation = yes
			do @_update

			@_toMatrix.tZ = @_currentMatrix.tZ + z

			@