define ['./el'], (El) ->

	class Cube extends El

		constructor: (width, height, depth) ->

			node = document.createElement 'div'

			node.classList.add 'cube'

			super node