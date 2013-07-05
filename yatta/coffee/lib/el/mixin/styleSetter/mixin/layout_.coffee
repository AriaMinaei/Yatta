define ->

	class Layout_

		__initMixinLayout: ->

			@_dims =

				width: null

				height: null

		setWidth: (w) ->

			@_dims.width = w

			@_styles.width = w + 'px'

			@

		setHeight: (h) ->

			@_dims.height = h

			@_styles.height = h + 'px'

			@