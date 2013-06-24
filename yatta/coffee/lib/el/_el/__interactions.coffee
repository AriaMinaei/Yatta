define ['../../methodChain/methodChain'], (MethodChain) ->

	class __Interactions

		_initInteractions: ->

			@_methodChain = null

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

				setTimeout cb.bind(@), ms

		then: (rest...) ->

			@_eventEnabledMethod rest, (cb) =>

				setTimeout cb.bind(@), 0

		every: (ms, rest...) ->

			@_eventEnabledMethod rest, (cb) =>

				setInterval cb.bind(@), ms

		_eventEnabledMethod: (args, cb) ->

			fn = args[0] ? null

			if fn

				cb (e) =>

					fn.apply @, [e]

				return @

			else

				_interface = @_getNewInterface()

				cb =>

					@_getMethodChain().run _interface, @

				return _interface