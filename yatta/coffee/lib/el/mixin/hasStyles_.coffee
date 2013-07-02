define [
	'./styleSetter/styleSetter'
	'./transitioner/transitioner'
	], (StyleSetter, Transitioner) ->

	class HasStyles_

		__initMixinHasStyles: ->

			@_styleSetter = new StyleSetter @

			@_transitioner = new Transitioner @

			@_styleInterface = @_styleSetter

			return

		__clonerForHasStyles: (newEl) ->

			newEl._styleSetter = @_styleSetter.clone newEl
			newEl._transitioner = @_transitioner.clone newEl

			if @_styleInterface is @_styleSetter

				newEl._styleInterface = newEl._styleSetter

			else

				newEl._styleInterface = newEl._transitioner

			return

		enableTransition: (duration) ->

			@_styleInterface = @_transitioner

			@_transitioner.enable duration

			@

		disableTransition: ->

			@_styleInterface = @_styleSetter

			do @_transitioner.disable

			@

	ClassPrototype = HasStyles_.prototype

	for methodName, method of Transitioner.prototype

		continue unless method instanceof Function

		continue if ClassPrototype[methodName]?

		continue if methodName[0] is '_'

		continue if methodName.substr(0, 3) is 'get'

		do ->

			_methodName = methodName

			if method.length is 0

				ClassPrototype[_methodName] = ->

					# This is more performant than method.apply()
					#
					# Argument splats won't work here though.
					@_styleInterface[_methodName]()

					@

			else if method.length is 1

				ClassPrototype[_methodName] = (arg0) ->

					@_styleInterface[_methodName] arg0

					@

			else if method.length is 2

				ClassPrototype[_methodName] = (arg0, arg1) ->

					@_styleInterface[_methodName] arg0, arg1

					@

			else if method.length is 3

				ClassPrototype[_methodName] = (arg0, arg1, arg2) ->

					@_styleInterface[_methodName] arg0, arg1, arg2

					@

			else if method.length is 4

				ClassPrototype[_methodName] = (arg0, arg1, arg2, arg3) ->

					@_styleInterface[_methodName] arg0, arg1, arg2, arg3

					@

			else if method.length is 5

				ClassPrototype[_methodName] = (arg0, arg1, arg2, arg3, arg4) ->

					@_styleInterface[_methodName] arg0, arg1, arg2, arg3, arg4

					@

			else

				throw Error "Methods with more than 5 args are not supported."

	for methodName, method of StyleSetter.prototype

		continue unless method instanceof Function

		continue if ClassPrototype[methodName]?

		continue if methodName[0] is '_'

		continue if methodName.substr(0, 3) is 'get'

		do ->

			_methodName = methodName

			if method.length is 0

				ClassPrototype[_methodName] = ->

					# This is more performant than method.apply()
					#
					# Argument splats won't work here though.
					@_styleSetter[_methodName]()

					@

			else if method.length is 1

				ClassPrototype[_methodName] = (arg0) ->

					@_styleSetter[_methodName] arg0

					@

			else if method.length is 2

				ClassPrototype[_methodName] = (arg0, arg1) ->

					@_styleSetter[_methodName] arg0, arg1

					@

			else if method.length is 3

				ClassPrototype[_methodName] = (arg0, arg1, arg2) ->

					@_styleSetter[_methodName] arg0, arg1, arg2

					@

			else if method.length is 4

				ClassPrototype[_methodName] = (arg0, arg1, arg2, arg3) ->

					@_styleSetter[_methodName] arg0, arg1, arg2, arg3

					@

			else if method.length is 5

				ClassPrototype[_methodName] = (arg0, arg1, arg2, arg3, arg4) ->

					@_styleSetter[_methodName] arg0, arg1, arg2, arg3, arg4

					@

			else

				throw Error "Methods with more than 5 args are not supported."

	HasStyles_