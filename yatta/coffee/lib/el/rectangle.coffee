define ['./el'], (El) ->

	class Rectangle extends El

		constructor: (x, y) ->

			@x = parseFloat x

			if not y?

				@y = @x

			else

				@y = parseFloat y

			node = document.createElement 'div'

			node.classList.add 'yatta-rectangle'

			super node

			@setWidth @x

			@setHeight @y