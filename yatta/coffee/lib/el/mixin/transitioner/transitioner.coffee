define [
	'./mixin/layout_'
	'./mixin/transforms_'
	'../../../utility/object'
	'../../../visuals/animation/easing'
], (Layout_, Transforms_, object, easing) ->

	mixing Layout_, Transforms_, class Transitioner

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

			@

		_ease: (progress) ->

			Math.sin progress * Math.PI / 2

		_update: ->

			return if @_startTime[0] is frames.time[0]

			do @_startOver

			return

		_adjustForTimeJump: ->

			do @_adjustTransformsForTimeJump

			@

		_startOver: ->

			@_startTime[0] = frames.time[0]

			do @_adjustForTimeJump

			@_shouldFinish = no

			do @_startFrames

		_startFrames: ->

			unless @_framesEnabled

				frames.onEachFrame @_eachFrameCallback

				@_framesEnabled = yes

			return

		_stopFrames: ->

			if @_framesEnabled

				frames.cancelEachFrame @_eachFrameCallback

				@_framesEnabled = no

		_updateForTime: (t) ->

			ellapsed = (t - @_startTime[0])

			if @_shouldFinish and ellapsed - @_duration > 1000

				do @_stopFrames

				@_shouldFinish = no

				return

			return if @_shouldFinish

			progress = ellapsed / @_duration

			if progress > 1

				progress = 1

				@_shouldFinish = yes

			progress = @_ease progress

			@_updateByProgress progress

			return

		_updateByProgress: (progress) ->

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

			null