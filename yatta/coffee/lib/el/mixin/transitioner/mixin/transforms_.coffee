define [
	'../../../../visuals/typedMatrix'
], (TypedMatrix) ->

	class Transforms_

		__initMixinTransforms: ->

			@_toMatrix = TypedMatrix._emptyStack()

			@_fromMatrix = TypedMatrix._emptyStack()

			@_currentMatrix = @el._styleSetter._transformer._current

		__clonerForTransforms: (newObj) ->

			newObj._currentMatrix = newObj.el._styleSetter._transformer._current

			return

		_adjustFromValuesForTransforms: ->

			@_fromMatrix[0] = @_currentMatrix[0]
			@_fromMatrix[1] = @_currentMatrix[1]
			@_fromMatrix[2] = @_currentMatrix[2]

			@_fromMatrix[3] = @_currentMatrix[3]
			@_fromMatrix[4] = @_currentMatrix[4]
			@_fromMatrix[5] = @_currentMatrix[5]

			@_fromMatrix[6] = @_currentMatrix[6]

			@_fromMatrix[7] = @_currentMatrix[7]
			@_fromMatrix[8] = @_currentMatrix[8]
			@_fromMatrix[9] = @_currentMatrix[9]

			@_fromMatrix[10] = @_currentMatrix[10]
			@_fromMatrix[11] = @_currentMatrix[11]
			@_fromMatrix[12] = @_currentMatrix[12]

			@

		_disableTransitionForTransforms: ->

			@_needsUpdate.transformMovement = no
			@_toMatrix[0] = @_currentMatrix[0]
			@_toMatrix[1] = @_currentMatrix[1]
			@_toMatrix[2] = @_currentMatrix[2]

			@_needsUpdate.transformScale = no
			@_toMatrix[3] = @_currentMatrix[3]
			@_toMatrix[4] = @_currentMatrix[4]
			@_toMatrix[5] = @_currentMatrix[5]

			@_needsUpdate.transformPerspective = no
			@_toMatrix[6] = @_currentMatrix[6]

			@_needsUpdate.transformRotation = no
			@_toMatrix[7] = @_currentMatrix[7]
			@_toMatrix[8] = @_currentMatrix[8]
			@_toMatrix[9] = @_currentMatrix[9]

			@_needsUpdate.transformTranslation = no
			@_toMatrix[10] = @_currentMatrix[10]
			@_toMatrix[11] = @_currentMatrix[11]
			@_toMatrix[12] = @_currentMatrix[12]


			@

		_updateTransitionForTransforms: (progress) ->

			if @_needsUpdate.transformMovement

				@_updateMovement progress

			if @_needsUpdate.transformRotation

				@_updateRotation progress

			if @_needsUpdate.transformScale

				@_updateScale progress

			if @_needsUpdate.transformPerspective

				@_updatePerspective progress

			if @_needsUpdate.transformTranslation

				@_updateTranslation progress

			return

		_updateMovement: (progress) ->

			@_styleSetter.setMovement (
					@_fromMatrix[0] +
					((@_toMatrix[0] - @_fromMatrix[0]) * progress)
				),
				(
					@_fromMatrix[1] +
					((@_toMatrix[1] - @_fromMatrix[1]) * progress)
				),
				(
					@_fromMatrix[2] +
					((@_toMatrix[2] - @_fromMatrix[2]) * progress)
				)

			null

		resetMovement: ->

			@_toMatrix[0] = 0
			@_toMatrix[1] = 0
			@_toMatrix[2] = 0

			@_needsUpdate.transformMovement = yes

			do @_update

			@

		setMovement: (x, y, z) ->

			@_toMatrix[0] = x
			@_toMatrix[1] = y
			@_toMatrix[2] = z

			@_needsUpdate.transformMovement = yes

			do @_update

			@

		setMovementX: (x) ->

			@_toMatrix[0] = x

			@_needsUpdate.transformMovement = yes

			do @_update

			@

		setMovementY: (y) ->

			@_toMatrix[1] = y

			@_needsUpdate.transformMovement = yes

			do @_update

			@

		setMovementZ: (z) ->

			@_toMatrix[2] = z

			@_needsUpdate.transformMovement = yes

			do @_update

			@

		move: (x, y, z) ->

			@_toMatrix[0] = @_currentMatrix[0] + x
			@_toMatrix[1] = @_currentMatrix[1] + y
			@_toMatrix[2] = @_currentMatrix[2] + z

			@_needsUpdate.transformMovement = yes

			do @_update

			@

		moveX: (x) ->

			@_toMatrix[0] = @_currentMatrix[0] + x

			@_needsUpdate.transformMovement = yes

			do @_update

			@

		moveY: (y) ->

			@_toMatrix[1] = @_currentMatrix[1] + y

			@_needsUpdate.transformMovement = yes

			do @_update

			@

		moveZ: (z) ->

			@_toMatrix[2] = @_currentMatrix[2] + z

			@_needsUpdate.transformMovement = yes

			do @_update

			@

		###
		Scale
		###

		_updateScale: (progress) ->

			@_styleSetter.setScale (
					@_fromMatrix[3] +
					((@_toMatrix[3] - @_fromMatrix[3]) * progress)
				),
				(
					@_fromMatrix[4] +
					((@_toMatrix[4] - @_fromMatrix[4]) * progress)
				),
				(
					@_fromMatrix[5] +
					((@_toMatrix[5] - @_fromMatrix[5]) * progress)
				)

			null

		resetScale: ->

			@_needsUpdate.transformScale = yes

			do @_update

			@_toMatrix[3] = 1
			@_toMatrix[4] = 1
			@_toMatrix[5] = 1

			@

		setScale: (x, y, z) ->

			@_needsUpdate.transformScale = yes

			do @_update

			@_toMatrix[3] = x
			@_toMatrix[4] = y
			@_toMatrix[5] = z

			@

		setScaleX: (x) ->

			@_needsUpdate.transformScale = yes

			do @_update

			@_toMatrix[3] = x

			@

		setScaleY: (y) ->

			@_needsUpdate.transformScale = yes

			do @_update

			@_toMatrix[4] = y

			@

		setScaleZ: (z) ->

			@_needsUpdate.transformScale = yes

			do @_update

			@_toMatrix[5] = z

			@

		scale: (x, y, z) ->

			@_needsUpdate.transformScale = yes

			do @_update

			@_toMatrix[3] = @_currentMatrix[3] * x
			@_toMatrix[4] = @_currentMatrix[4] * y
			@_toMatrix[5] = @_currentMatrix[5] * z

			@

		setScaleAll: (x) ->

			@_needsUpdate.transformScale = yes

			do @_update

			@_toMatrix[3] = @_toMatrix[4] = @_toMatrix[5] = x

			@

		scaleX: (x) ->

			@_needsUpdate.transformScale = yes

			do @_update

			@_toMatrix[3] = @_currentMatrix[3] * x

			@

		scaleY: (y) ->

			@_needsUpdate.transformScale = yes

			do @_update

			@_toMatrix[4] = @_currentMatrix[4] * y

			@

		scaleZ: (z) ->

			@_needsUpdate.transformScale = yes

			do @_update

			@_toMatrix[5] = @_currentMatrix[5] * z

			@

		###
		Perspective
		###

		_updatePerspective: (progress) ->

			@_styleSetter.setPerspective (
					@_fromMatrix[6] +
					((@_toMatrix[6] - @_fromMatrix[6]) * progress)
				)

			null

		resetPerspective: ->

			@_needsUpdate.transformPerspective = yes

			do @_update

			@_toMatrix[6] = 0


			@

		setPerspective: (d) ->

			@_needsUpdate.transformPerspective = yes

			do @_update

			@_toMatrix[6] = d

			@

		###
		Rotation
		###

		_updateRotation: (progress) ->

			@_styleSetter.setRotation (
					@_fromMatrix[7] +
					((@_toMatrix[7] - @_fromMatrix[7]) * progress)
				),
				(
					@_fromMatrix[8] +
					((@_toMatrix[8] - @_fromMatrix[8]) * progress)
				),
				(
					@_fromMatrix[9] +
					((@_toMatrix[9] - @_fromMatrix[9]) * progress)
				)

			null

		resetRotation: ->

			@_needsUpdate.transformRotation = yes

			do @_update

			@_toMatrix[7] = 0
			@_toMatrix[8] = 0
			@_toMatrix[9] = 0

			@

		setRotation: (x, y, z) ->

			@_needsUpdate.transformRotation = yes

			do @_update

			@_toMatrix[7] = x
			@_toMatrix[8] = y
			@_toMatrix[9] = z

			@

		setRotationX: (x) ->

			@_needsUpdate.transformRotation = yes

			do @_update

			@_toMatrix[7] = x

			@

		setRotationY: (y) ->

			@_needsUpdate.transformRotation = yes

			do @_update

			@_toMatrix[8] = y

			@

		setRotationZ: (z) ->

			@_needsUpdate.transformRotation = yes

			do @_update

			@_toMatrix[9] = z

			@

		rotate: (x, y, z) ->

			@_needsUpdate.transformRotation = yes

			do @_update

			@_toMatrix[7] = @_currentMatrix[7] + x
			@_toMatrix[8] = @_currentMatrix[8] + y
			@_toMatrix[9] = @_currentMatrix[9] + z

			@

		rotateX: (x) ->

			@_needsUpdate.transformRotation = yes

			do @_update

			@_toMatrix[7] = @_currentMatrix[7] + x

			@

		rotateY: (y) ->

			@_needsUpdate.transformRotation = yes

			do @_update

			@_toMatrix[8] = @_currentMatrix[8] + y

			@

		rotateZ: (z) ->

			@_needsUpdate.transformRotation = yes

			do @_update


			@_toMatrix[9] = @_currentMatrix[9] + z

			@

		###
		Translation
		###

		_updateTranslation: (progress) ->

			@_styleSetter.setTranslation (
					@_fromMatrix[10] +
					((@_toMatrix[10] - @_fromMatrix[10]) * progress)
				),
				(
					@_fromMatrix[11] +
					((@_toMatrix[11] - @_fromMatrix[11]) * progress)
				),
				(
					@_fromMatrix[12] +
					((@_toMatrix[12] - @_fromMatrix[12]) * progress)
				)

			null

		resetTranslation: ->

			@_needsUpdate.transformTranslation = yes

			do @_update

			@_toMatrix[10] = 0
			@_toMatrix[11] = 0
			@_toMatrix[12] = 0

			@

		setTranslation: (x, y, z) ->

			@_needsUpdate.transformTranslation = yes

			do @_update

			@_toMatrix[10] = x
			@_toMatrix[11] = y
			@_toMatrix[12] = z

			@

		setTranslationX: (x) ->

			@_needsUpdate.transformTranslation = yes

			do @_update

			@_toMatrix[10] = x

			@

		setTranslationY: (y) ->

			@_needsUpdate.transformTranslation = yes

			do @_update

			@_toMatrix[11] = y

			@

		setTranslationZ: (z) ->

			@_needsUpdate.transformTranslation = yes

			do @_update

			@_toMatrix[12] = z

			@

		translate: (x, y, z) ->

			@_needsUpdate.transformTranslation = yes

			do @_update

			@_toMatrix[10] = @_currentMatrix[10] + x
			@_toMatrix[11] = @_currentMatrix[11] + y
			@_toMatrix[12] = @_currentMatrix[12] + z

			@

		translateX: (x) ->

			@_needsUpdate.transformTranslation = yes

			do @_update

			@_toMatrix[10] = @_currentMatrix[10] + x

			@

		translateY: (y) ->

			@_needsUpdate.transformTranslation = yes

			do @_update

			@_toMatrix[11] = @_currentMatrix[11] + y

			@

		translateZ: (z) ->

			@_needsUpdate.transformTranslation = yes

			do @_update

			@_toMatrix[12] = @_currentMatrix[12] + z

			@