define ['./el', '../tools'], (El, tools) ->

	class Rectangle extends El

		constructor: (x, y) ->

			@x = parseFloat x

			if not y?

				@y = @x

			else

				@y = parseFloat y

			node = document.createElement 'div'

			node.classList.add 'rectangle'

			super node

			@setWidth @x

			@setHeight @y