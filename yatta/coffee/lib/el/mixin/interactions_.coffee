define [
	'../../methodChain/methodChain'
	'../../utility/array'
], (MethodChain, array) ->

	class Interactions_

		__initMixinInteractions: ->

			@_quittersForInteractions = []

			null

		__clonerForInteractions: (newEl) ->

			newEl._quittersForInteractions = []

		__quitterForInteractions: ->

			loop

				return if @_quittersForInteractions.length < 1

				@_quittersForInteractions.pop()()

			return

		_getMethodChain: ->

			unless @constructor.__methodChain?

				@constructor.__methodChain = new MethodChain

				for key, fn of @

					continue if key[0] is '_' or key is 'constructor'

					continue unless fn instanceof Function

					@constructor.__methodChain.addMethod key

			@constructor.__methodChain

		_getNewInterface: ->

			@_getMethodChain().getInterface()

		wait: (ms, rest...) ->

			@_eventEnabledMethod rest, (cb) =>

				frames.wait ms, =>

					cb.call @

		immediately: ->

			@_eventEnabledMethod arguments, (cb) =>

				frames.laterInThisFrame =>

					cb.call @

		eachFrame: ->

			@_eventEnabledMethod arguments, (cb) =>

				startTime = new Int32Array 1
				startTime[0] = -1

				canceled = no

				canceler = =>

					return if canceled

					frames.cancelEachFrame theCallback

					array.pluckOneItem @_quittersForInteractions, canceler

					canceled = yes

				@_quittersForInteractions.push canceler

				theCallback = (t) =>

					if startTime[0] < 0

						startTime[0] = t

						elapsedTime = 0

					else

						elapsedTime = t - startTime[0]

					cb.call @, elapsedTime, canceler

					null

				frames.onEachFrame theCallback

		run: ->

			@_eventEnabledMethod arguments, (cb) =>

				cb.call @

			@

		every: (ms, args...) ->

			@_eventEnabledMethod args, (cb) =>

				canceled = no

				canceler = =>

					return if canceled

					frames.cancelEvery theCallback

					array.pluckOneItem @_quittersForInteractions, canceler

					canceled = yes

				@_quittersForInteractions.push canceler

				theCallback = =>

					cb.call @, canceler

				frames.every ms, theCallback

		everyAndNow: (ms, args...) ->

			@_eventEnabledMethod args, (cb) =>

				canceled = no

				canceler = =>

					return if canceled

					frames.cancelEvery theCallback

					array.pluckOneItem @_quittersForInteractions, canceler

					canceled = yes

				@_quittersForInteractions.push canceler

				theCallback = =>

					cb.call @, canceler

				frames.every ms, theCallback

				frames.laterInThisFrame theCallback

		_eventEnabledMethod: (args, runCallback) ->

			fn = args[0] ? null

			if fn

				runCallback =>

					fn.apply @, arguments

				return @

			else

				_interface = @_getNewInterface()

				runCallback =>

					@_getMethodChain().run _interface, @

				return _interface