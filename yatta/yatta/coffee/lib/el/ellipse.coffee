define ['./el', '../tools'], (El, tools) ->

	class Ellipse extends El

		constructor: (x, y) ->

			@x = parseFloat x

			if not y?

				@y = @x

			else

				@y = parseFloat y

			node = document.createElement 'div'

			node.classList.add 'ellipse'

			super node

			@setWidth @x

			@setHeight @y

