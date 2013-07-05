define [
	'../tools/css'
	'./_tools'
], (css, _tools) ->

	class Typography_

		__initMixinTypography: ->

			@_face = Typography_.defaultFace

			@_size = Typography_.defaultSize

			@_color = Typography_.defaultColor

		_initTypography: ->

			do @setSize
			do @setColor
			do @setFace

		setFace: (face) ->

			unless face

				@_face = Typography_.defaultFace

			else

				@_face = face

			do @_applyFace

			@

		_applyFace: ->

			@node.style.fontFamily = @_face

			@

		setSize: (size) ->

			unless size

				@_size = Typography_.defaultSize

			else

				@_size = size

			do @_applySize

			@

		_applySize: ->

			@node.style.fontSize = @_size + 'px'

			@

		setColor: (r, g, b) ->

			if arguments.length is 0

				@_color = Typography_.defaultColor

			else

				@_color = css.rgb(r, g, b)

			do @_applyColor

			@

		_applyColor: ->

			@node.style.color = @_color

			do @_applyStroke

			@

		_applyStroke: ->

			if _tools.needsTextStroke()

				@node.style.webkitTextStroke = '1.5 ' + @_color

			@

		@defaultFace = '"HelveticaNeueLT Std Thin"'

		@setDefaultFace: (face = "HelveticaNeueLT Std Thin") ->

			@defaultFace = face

		@defaultSize = 36

		@setDefaultSize: (size = 36) ->

			@defaultSize = size

		@defaultColor = css.rgb(255, 255, 255)

		@setDefaultColor: (r, g, b) ->

			if arguments.length is 0

				@defaultColor = css.rgb(255, 255, 255)

			@defaultColor = css.rgb(r, g, b)