define ['../../../tools/css'], (css) ->

	class General_

		__initMixinGeneral: ->



		setOrigin: (origin) ->

			css.setTransformOrigin @node, origin

			@

		z: (i) ->

			@node.style.zIndex = i

			@