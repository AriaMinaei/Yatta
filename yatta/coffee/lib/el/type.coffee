define ['./el', '../tools'], (El, tools) ->

	class Type extends El

		constructor: (text = '') ->

			node = document.createElement 'div'
			node.classList.add 'type'

			super node

			@setText text

			do @setSize

			do @setColor

			do @setFace

		setText: acceptLazyArgs (text) ->

			@_text = text

			do @_applyText

			@

		_applyText: ->

			@node.innerHTML = @_text

			@

		setFace: acceptLazyArgs (face) ->

			unless face

				@_face = Type.defaultFace

			else

				@_face = face

			do @_applyFace

			@

		_applyFace: ->

			@node.style.fontFamily = @_face

			@

		setSize: acceptLazyArgs (size) ->

			unless size

				@_size = Type.defaultSize

			else

				@_size = size

			do @_applySize

			@

		_applySize: ->

			@node.style.fontSize = @_size + 'px'

			@

		setColor: acceptLazyArgs (r, g, b) ->

			if arguments.length is 0

				@_color = Type.defaultColor

			else

				@_color = tools.rgb(r, g, b)

			do @_applyColor

			@

		_applyColor: ->

			@node.style.color = @_color

			do @_applyStroke

			@

		_applyStroke: ->

			if tools.needsTextStroke()

				@node.style.webkitTextStroke = '1.5 ' + @_color

			@


		@defaultFace = '"HelveticaNeueLT Std Thin"'

		@setDefaultFace: (face = "HelveticaNeueLT Std Thin") ->

			@defaultFace = face

		@defaultSize = 36

		@setDefaultSize: (size = 36) ->

			@defaultSize = size

		@defaultColor = tools.rgb(255, 255, 255)

		@setDefaultColor: (r, g, b) ->

			if arguments.length is 0

				@defaultColor = tools.rgb(255, 255, 255)

			@defaultColor = tools.rgb(r, g, b)