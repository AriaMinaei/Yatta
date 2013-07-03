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

			do @__initMixins

			@_eachFrameCallback = @_getEachFrameCallback()

			@_framesEnabled = no

			@_shouldFinish = no

			@_needsUpdate =

				transformMovement: no
				transformRotation: no
				transformScale: no
				transformPerspective: no
				transformTranslation: no
				opacity: no

			@ease 'cubic.easeIn'

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

			@_easing = f

			@

		_getEachFrameCallback: ->

			(t) =>

				@_updateForTime t

				return

		clone: (el) ->

			newObj = Object.create @constructor::

			newObj.el = el

			newObj._startTime = new Int32Array 1
			newObj._startTime[0] = 0

			newObj._styleSetter = el._styleSetter

			newObj._framesEnabled = no

			newObj._shouldFinish = no

			newObj._eachFrameCallback = newObj._getEachFrameCallback()

			newObj._needsUpdate =

				transformMovement: no
				transformRotation: no
				transformScale: no
				transformPerspective: no
				transformTranslation: no
				opacity: no

			@__applyCloners newObj

			for key of @

				continue if newObj[key]?

				if @hasOwnProperty key

					newObj[key] = object.clone @[key], yes

			newObj

		enable: (duration) ->

			@_enabled = yes

			@_duration = duration

			@

		disable: ->

			@_enabled = no

			do @_stop

			@

		_ease: (progress) ->

			Math.sin progress * Math.PI / 2

		_update: ->

			return if @_startTime[0] is frames.time[0]

			do @_startOver

			return

		_adjustFromValues: ->

			do @_adjustFromValuesForTransforms

			do @_adjustFromValuesForFill

			@

		_startOver: ->

			@_startTime[0] = frames.time[0]

			do @_adjustFromValues

			@_shouldFinish = no

			do @_startFrames

		_startFrames: ->

			unless @_framesEnabled

				frames.onEachFrame @_eachFrameCallback

				@_framesEnabled = yes

			return

		_stop: ->

			if @_framesEnabled

				frames.cancelEachFrame @_eachFrameCallback

				@_framesEnabled = no

			@_shouldFinish = no

			do @_disableTransitionForTransforms
			do @_disableTransitionForFill

			return

		_updateForTime: (t) ->

			ellapsed = (t - @_startTime[0])

			if @_shouldFinish and ellapsed - @_duration > 1000

				do @_stop

				return

			return if @_shouldFinish

			progress = ellapsed / @_duration

			if progress >= 1

				progress = 1

				@_shouldFinish = yes

			progress = @_ease progress

			@_updateByProgress progress

			return

		_updateByProgress: (progress) ->

			@_updateTransitionForTransforms progress

			@_updateTransitionForFill progress

			null