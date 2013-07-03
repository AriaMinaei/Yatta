define [
	'../../../../visuals/typedMatrix'
	'../../../tools/css'
], (TypedMatrix, css) ->

	class Transforms_

		__initMixinTransforms: ->

			@_transformer = new TypedMatrix

			@_shouldUpdateTransforms = no

			@_lastTimeUpdatedTransforms = 0

			@_transformUpdateCallbackAttached = no

			@_updateTransformCallback = @_getTransformCallback()

			return

		_getTransformCallback: ->

			(t) =>

				unless @_shouldUpdateTransforms

					if t - @_lastTimeUpdatedTransforms > 2000

						frames.cancelAfterEachFrame @_updateTransformCallback

						@_transformUpdateCallbackAttached = no

					return

				do @_actuallyUpdateTransforms

				@_lastTimeUpdatedTransforms = t

				@_shouldUpdateTransforms = no

				return

		__clonerForTransforms: (newStyleSetter) ->

			newStyleSetter._shouldUpdateTransforms = no

			newStyleSetter._lastTimeUpdatedTransforms = 0

			newStyleSetter._transformUpdateCallbackAttached = no

			newStyleSetter._updateTransformCallback = newStyleSetter._getTransformCallback()

			return

		_updateTransforms: ->

			return @ if @_shouldUpdateTransforms

			unless @_transformUpdateCallbackAttached

				frames.afterEachFrame @_updateTransformCallback

				@_transformUpdateCallbackAttached = yes

			@_shouldUpdateTransforms = yes

			@

		_actuallyUpdateTransforms: ->

			css.setTransform @node, @_transformer.toPlainCss()

			@

		go3d: ->

			css.setTransformStyle @node, 'preserve-3d'

			@

	ClassPrototype = Transforms_.prototype

	for methodName, method of TypedMatrix.prototype

		continue unless method instanceof Function

		continue if ClassPrototype[methodName]?

		continue if methodName[0] is '_'

		continue if methodName is 'temporarily' or methodName is 'commit' or
			methodName is 'rollBack' or methodName is 'toCss' or
			methodName is 'toPlainCss' or methodName is 'toArray' or
			methodName is 'toMatrix'

		do ->

			_methodName = methodName

			if method.length is 0

				ClassPrototype[_methodName] =  ->

					# This is more performant than method.apply()
					#
					# Argument splats won't work here though.
					@_transformer[_methodName]()

					do @_updateTransforms

					@

			else if method.length is 1

				ClassPrototype[_methodName] = (arg0) ->

					@_transformer[_methodName] arg0

					do @_updateTransforms

					@

			else if method.length is 2

				ClassPrototype[_methodName] = (arg0, arg1) ->

					@_transformer[_methodName] arg0, arg1

					do @_updateTransforms

					@

			else if method.length is 3

				ClassPrototype[_methodName] = (arg0, arg1, arg2) ->

					@_transformer[_methodName] arg0, arg1, arg2

					do @_updateTransforms

					@

			else if method.length is 4

				ClassPrototype[_methodName] = (arg0, arg1, arg2, arg3) ->

					@_transformer[_methodName] arg0, arg1, arg2, arg3

					do @_updateTransforms

					@

			else if method.length is 5

				ClassPrototype[_methodName] = (arg0, arg1, arg2, arg3, arg4) ->

					@_transformer[_methodName] arg0, arg1, arg2, arg3, arg4

					do @_updateTransforms

					@

			else

				throw Error "Methods with more than 5 args are not supported."

	Transforms_