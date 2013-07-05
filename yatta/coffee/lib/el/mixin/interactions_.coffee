define ['../../methodChain/methodChain'], (MethodChain) ->

	class Interactions_

		@_nextThenCallback: (cb) ->

			frames.laterInThisFrame cb

		__initMixinInteractions: ->

			@_methodChain = null

			do @_resetNextThenCallback

			null

		_resetNextThenCallback: ->

			@_nextThenCallback = Interactions_._nextThenCallback

		_getMethodChain: ->

			unless @_methodChain?

				@_methodChain = new MethodChain

				for key, fn of @

					continue if key[0] is '_' or key is 'constructor'

					continue unless fn instanceof Function

					@_methodChain.addMethod key

			@_methodChain

		_getNewInterface: ->

			@_getMethodChain().getInterface()

		onClick: ->

			@_eventEnabledMethod arguments, (cb) =>

				@node.addEventListener 'click', cb

		wait: (ms, rest...) ->

			@_eventEnabledMethod rest, (cb) =>

				frames.wait ms, cb.bind(@)

		eachFrame: ->

			@_eventEnabledMethod arguments, (cb) =>

				startTime = new Int32Array 1
				startTime[0] = -1

				cancel = =>

					frames.cancelEachFrame frameCallback

				frameCallback = (t) =>

					if startTime[0] < 0

						startTime[0] = t

						elapsedTime = 0

					else

						elapsedTime = t - startTime[0]

					cb @, elapsedTime, cancel

					null

				frames.onEachFrame frameCallback

		then: (rest...) ->

			@_eventEnabledMethod rest, (cb) =>

				@_nextThenCallback cb.bind(@)

		every: (ms, args...) ->

			@_eventEnabledMethod args, (cb) =>

				frames.every ms, cb.bind(@)

		each: ->

			_interface = @_getNewInterface()

			els = @_children

			if els.length isnt 0

				frames.laterInThisFrame =>

					for el in els

						@_getMethodChain().run _interface, el

					null

			return _interface

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