define ['../tools/css'], (css) ->

	class General_

		setWidth: acceptLazyArgs (d) ->

			@_do =>

				@node.style.width = d + 'px'

			@

		setHeight: acceptLazyArgs (d) ->

			@_do =>

				@node.style.height = d + 'px'

			@

		go3d: ->

			css.setTransformStyle @node, 'preserve-3d'

			@

		setOrigin: acceptLazyArgs (origin) ->

			@_do =>

				css.setTransformOrigin @node, origin

			@

		fillWith: acceptLazyArgs (r, g, b) ->

			args = arguments

			@_do =>

				if args.length is 0

					color = 'transparent'

				else if args.length is 1

					color = r

				else

					color = css.rgb r, g, b

				@node.style.background = color

			@

		makeHollow: ->

			@_do =>

				do @fillWith

			@

		z: acceptLazyArgs (i) ->

			@node.style.zIndex = i

			@

		setBorder: acceptLazyArgs (thickness, r, g, b) ->

			args = arguments

			@_do =>

				if args.length is 0

					@node.style.border = 'none'

				else if args.length isnt 4

					throw Error "setBorders() requires either 0 or 4 arguments: thickness, r, g, b"

				else

					@node.style.border = thickness + 'px solid ' + css.rgb(r, g, b)

			@

		removeBorder: ->

			@_do =>

				do @setBorder