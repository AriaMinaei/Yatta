define [
	'./mixin/fill_'
	'./mixin/transforms_'
	'../../../utility/object'
	'../../../visuals/animation/easing'
], (Fill_, Transforms_, object, easing) ->

	mixing Fill_, Transforms_, class Transitioner

		constructor: (@el) ->

			@_styleSetter = @el._styleSetter

			@_enabled = no

			@_duration = 1000

			@_startTime = new Int32Array 1
			@_startTime[0] = 0

			Transitioner.__initMixinsFor @

			@_needsUpdate =

				transformMovement: no
				transformRotation: no
				transformScale: no
				transformPerspective: no
				transformTranslation: no
				opacity: no

			@_shouldUpdate = no

			@ease 'cubic.easeOut'

		ease: (func) ->

			if func instanceof Function

				@_easing = func

				return @

			unless typeof func is 'string'

				throw Error "func should either be a function or a string, like qubic.easeOut"

			parts = func.split '.'

			f = easing

			for part in parts

				f = f[part]

			if typeof f is 'undefined'

				throw Error "Cannot find easing function `#{func}`"

			@_easing = f

			@

		clone: (el) ->

			newObj = Object.create @constructor::

			newObj.el = el

			newObj._startTime = new Int32Array 1
			newObj._startTime[0] = 0

			newObj._styleSetter = el._styleSetter

			newObj._needsUpdate =

				transformMovement: no
				transformRotation: no
				transformScale: no
				transformPerspective: no
				transformTranslation: no
				opacity: no

			Transitioner.__applyClonersFor @, [newObj]

			for key of @

				continue if newObj[key] isnt undefined

				if @hasOwnProperty key

					newObj[key] = object.clone @[key], yes

					console.log

			newObj

		enable: (duration) ->

			@_enabled = yes

			@_duration = duration

			@

		disable: ->

			@_enabled = no

			do @_stop

			@

		_stop: ->

			@_shouldUpdate = no

			do @_disableTransitionForTransforms
			do @_disableTransitionForFill

			return

		_update: ->

			return if @_startTime[0] is frames.timeInMs[0]

			do @_startOver

			return



		_startOver: ->

			@_startTime[0] = frames.timeInMs[0]

			do @_adjustFromValues

			@_shouldUpdate = yes

			do @_scheduleUpdate

		_adjustFromValues: ->

			do @_adjustFromValuesForTransforms

			do @_adjustFromValuesForFill

			@

		_scheduleUpdate: ->

			do @el._scheduleUpdate

		_updateTransition: ->

			return if not @_enabled or not @_shouldUpdate

			@_updateForTime frames.timeInMs[0]

		_updateForTime: (t) ->

			ellapsed = (t - @_startTime[0])

			progress = ellapsed / @_duration

			if progress >= 1

				progress = 1

				do @_stop

			else

				do @_scheduleUpdate

			progress = @_ease progress

			@_updateByProgress progress

			return

		_updateByProgress: (progress) ->

			@_updateTransitionForTransforms progress

			@_updateTransitionForFill progress

			null

		_ease: (progress) ->

			@_easing progress