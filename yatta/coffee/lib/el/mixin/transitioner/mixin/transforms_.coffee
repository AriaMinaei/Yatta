define [
	'../../../../visuals/typedMatrix'
], (TypedMatrix) ->

	class Transforms_

		__initMixinTransforms: ->

			@_toMatrix = TypedMatrix._emptyStack()

			@_fromMatrix = TypedMatrix._emptyStack()

			@_currentMatrix = @el._styleSetter._transformer._current

		__clonerForTransforms: (newTransitioner) ->

			newTransitioner._currentMatrix = newTransitioner.el._styleSetter._transformer._current

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

		_reportUpdateForMove: ->

			return if @_needsUpdate.transformMovement

			@_needsUpdate.transformMovement = yes

			@_toMatrix[0] = @_currentMatrix[0]
			@_toMatrix[1] = @_currentMatrix[1]
			@_toMatrix[2] = @_currentMatrix[2]

			return

		resetMovement: ->

			do @_reportUpdateForMove

			@_toMatrix[0] = 0
			@_toMatrix[1] = 0
			@_toMatrix[2] = 0

			do @_update

			@

		setMovement: (x, y, z) ->

			do @_reportUpdateForMove

			@_toMatrix[0] = x
			@_toMatrix[1] = y
			@_toMatrix[2] = z

			do @_update

			@

		setMovementX: (x) ->

			do @_reportUpdateForMove

			@_toMatrix[0] = x

			do @_update

			@

		setMovementY: (y) ->

			do @_reportUpdateForMove

			@_toMatrix[1] = y

			do @_update

			@

		setMovementZ: (z) ->

			do @_reportUpdateForMove

			@_toMatrix[2] = z

			do @_update

			@

		move: (x, y, z) ->

			do @_reportUpdateForMove

			@_toMatrix[0] = @_currentMatrix[0] + x
			@_toMatrix[1] = @_currentMatrix[1] + y
			@_toMatrix[2] = @_currentMatrix[2] + z

			do @_update

			@

		moveX: (x) ->

			do @_reportUpdateForMove

			@_toMatrix[0] = @_currentMatrix[0] + x

			do @_update

			@

		moveY: (y) ->

			do @_reportUpdateForMove

			@_toMatrix[1] = @_currentMatrix[1] + y

			do @_update

			@

		moveZ: (z) ->

			do @_reportUpdateForMove

			@_toMatrix[2] = @_currentMatrix[2] + z

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

		_reportUpdateForScale: ->

			return if @_needsUpdate.transformScale

			@_needsUpdate.transformScale = yes

			@_toMatrix[3] = @_currentMatrix[3]
			@_toMatrix[4] = @_currentMatrix[4]
			@_toMatrix[5] = @_currentMatrix[5]

			return

		resetScale: ->

			do @_reportUpdateForScale

			@_toMatrix[3] = 1
			@_toMatrix[4] = 1
			@_toMatrix[5] = 1

			do @_update

			@

		setScale: (x, y, z) ->

			do @_reportUpdateForScale

			@_toMatrix[3] = x
			@_toMatrix[4] = y
			@_toMatrix[5] = z

			do @_update

			@

		setScaleX: (x) ->

			do @_reportUpdateForScale

			@_toMatrix[3] = x

			do @_update

			@

		setScaleY: (y) ->

			do @_reportUpdateForScale

			@_toMatrix[4] = y

			do @_update

			@

		setScaleZ: (z) ->

			do @_reportUpdateForScale

			@_toMatrix[5] = z

			do @_update

			@

		scale: (x, y, z) ->

			do @_reportUpdateForScale

			@_toMatrix[3] = @_currentMatrix[3] * x
			@_toMatrix[4] = @_currentMatrix[4] * y
			@_toMatrix[5] = @_currentMatrix[5] * z

			do @_update

			@

		setScaleAll: (x) ->

			do @_reportUpdateForScale

			@_toMatrix[3] = @_toMatrix[4] = @_toMatrix[5] = x

			do @_update

			@

		scaleX: (x) ->

			do @_reportUpdateForScale

			@_toMatrix[3] = @_currentMatrix[3] * x

			do @_update

			@

		scaleY: (y) ->

			do @_reportUpdateForScale

			@_toMatrix[4] = @_currentMatrix[4] * y

			do @_update

			@

		scaleZ: (z) ->

			do @_reportUpdateForScale

			@_toMatrix[5] = @_currentMatrix[5] * z

			do @_update

			@

		_reportUpdateForPerspective: ->

			return if @_needsUpdate.transformPerspective

			@_needsUpdate.transformPerspective = yes

			@_toMatrix[6] = @_currentMatrix[6]

			return

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

			do @_reportUpdateForPerspective

			@_toMatrix[6] = 0

			do @_update

			@

		setPerspective: (d) ->

			do @_reportUpdateForPerspective

			@_toMatrix[6] = d

			do @_update

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

		_reportUpdateForRotation: ->

			return if @_needsUpdate.transformRotation

			@_needsUpdate.transformRotation = yes

			@_toMatrix[7] = @_currentMatrix[7]
			@_toMatrix[8] = @_currentMatrix[8]
			@_toMatrix[9] = @_currentMatrix[9]

			return

		resetRotation: ->

			do @_reportUpdateForRotation

			@_toMatrix[7] = 0
			@_toMatrix[8] = 0
			@_toMatrix[9] = 0

			do @_update

			@

		setRotation: (x, y, z) ->

			do @_reportUpdateForRotation

			@_toMatrix[7] = x
			@_toMatrix[8] = y
			@_toMatrix[9] = z

			do @_update

			@

		setRotationX: (x) ->

			do @_reportUpdateForRotation

			@_toMatrix[7] = x

			do @_update

			@

		setRotationY: (y) ->

			do @_reportUpdateForRotation

			@_toMatrix[8] = y

			do @_update

			@

		setRotationZ: (z) ->

			do @_reportUpdateForRotation

			@_toMatrix[9] = z

			do @_update

			@

		rotate: (x, y, z) ->

			do @_reportUpdateForRotation

			@_toMatrix[7] = @_currentMatrix[7] + x
			@_toMatrix[8] = @_currentMatrix[8] + y
			@_toMatrix[9] = @_currentMatrix[9] + z

			do @_update

			@

		rotateX: (x) ->

			do @_reportUpdateForRotation

			@_toMatrix[7] = @_currentMatrix[7] + x

			do @_update

			@

		rotateY: (y) ->

			do @_reportUpdateForRotation

			@_toMatrix[8] = @_currentMatrix[8] + y

			do @_update

			@

		rotateZ: (z) ->

			do @_reportUpdateForRotation

			@_toMatrix[9] = @_currentMatrix[9] + z

			do @_update

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

		_reportUpdateForTranslation: ->

			return if @_needsUpdate.transformTranslation

			@_needsUpdate.transformTranslation = yes

			@_toMatrix[10] = @_currentMatrix[10]
			@_toMatrix[11] = @_currentMatrix[11]
			@_toMatrix[12] = @_currentMatrix[12]

			return

		resetTranslation: ->

			do @_reportUpdateForTranslation

			@_toMatrix[10] = 0
			@_toMatrix[11] = 0
			@_toMatrix[12] = 0

			do @_update

			@

		setTranslation: (x, y, z) ->

			do @_reportUpdateForTranslation

			@_toMatrix[10] = x
			@_toMatrix[11] = y
			@_toMatrix[12] = z

			do @_update

			@

		setTranslationX: (x) ->

			do @_reportUpdateForTranslation

			@_toMatrix[10] = x

			do @_update

			@

		setTranslationY: (y) ->

			do @_reportUpdateForTranslation

			@_toMatrix[11] = y

			do @_update

			@

		setTranslationZ: (z) ->

			do @_reportUpdateForTranslation

			@_toMatrix[12] = z

			do @_update

			@

		translate: (x, y, z) ->

			do @_reportUpdateForTranslation

			@_toMatrix[10] = @_currentMatrix[10] + x
			@_toMatrix[11] = @_currentMatrix[11] + y
			@_toMatrix[12] = @_currentMatrix[12] + z

			do @_update

			@

		translateX: (x) ->

			do @_reportUpdateForTranslation

			@_toMatrix[10] = @_currentMatrix[10] + x

			do @_update

			@

		translateY: (y) ->

			do @_reportUpdateForTranslation

			@_toMatrix[11] = @_currentMatrix[11] + y

			do @_update

			@

		translateZ: (z) ->

			do @_reportUpdateForTranslation

			@_toMatrix[12] = @_currentMatrix[12] + z

			do @_update

			@