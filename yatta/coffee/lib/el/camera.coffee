define ['./el'], (El) ->

	class Container extends El

		constructor: ->

			node = document.createElement 'div'
			node.classList.add 'yatta-camera'

			super node

			@go3d()
			@perspective 1200