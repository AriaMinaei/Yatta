define ['../../visuals/lightmatrix', '../tools/css'], (LightMatrix, css) ->

	class Transforms_

		_initTransforms: ->

			@_transform = new LightMatrix

		_updateTransform: (withAnim = no) ->

			@_do =>

				css.setTransform @node, @_transform.toPlainCss()

			@

		@getter 'transform', -> @_transform._current


	for key, fn of LightMatrix.prototype

		continue if key[0] is '_' or key is 'temporarily' or key is 'commit' or key is 'rollBack' or key is 'toCss' or key is 'toPlainCss' or key is 'toArray' or key is 'toMatrix'

		do ->
			_key = key
			Transforms_.prototype[_key] = acceptLazyArgs ->

				@_transform[_key].apply @_transform, arguments


				do @_updateTransform

			@

	Transforms_