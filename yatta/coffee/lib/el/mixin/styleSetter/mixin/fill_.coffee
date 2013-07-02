define ['../../../tools/css'], (css) ->

	class Fill_

		__initMixinFill: ->

			@_fill =

				bgColor: null

				color: null

				border: 'none'

				opacity: 1

		fillWithColor: (r, g, b) ->

			@_styles.backgroundColor = @_fill.bgColor = css.rgb r, g, b

			null

		setTextColor: (r, g, b) ->

			@_styles.color = @_fill.color = css.rgb r, g, b

			null

		makeHollow: ->

			@_styles.color = @_fill.color = 'transparent'

		setBorder: (thickness, r, g, b) ->

			unless thickness?

				@_styles.border = @_fill.border = 'none'

			else

				@_styles.border = @_fill.border = "#{thickness}px solid #{css.rgb(r, g, b)}"

			@

		removeBorder: ->

			@_styles.border = @_fill.border = 'none'

			@

		setOpacity: (d) ->

			@_styles.opacity = @_fill.opacity = d

			@