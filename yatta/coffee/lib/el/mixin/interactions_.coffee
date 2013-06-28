define ['../../methodChain/methodChain'], (MethodChain) ->

	class Interactions_

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

		wait: acceptLazyArgs (ms, rest...) ->

			@_eventEnabledMethod rest, (cb) =>

				setTimeout cb.bind(@), ms

		then: (rest...) ->

			@_eventEnabledMethod rest, (cb) =>

				setTimeout cb.bind(@), 0

		every: acceptLazyArgs (ms, rest...) ->

			@_eventEnabledMethod rest, (cb) =>

				setInterval cb.bind(@), ms

		each: ->

			_interface = @_getNewInterface()

			els = @_children

			if els.length isnt 0

				setTimeout =>

					for el in els

						@_getMethodChain().run _interface, el

					null

				, 0

			return _interface

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