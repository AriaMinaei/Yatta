define ['./el'], (El) ->

	class Ellipse extends El

		constructor: (x, y) ->

			@x = parseFloat x

			if not y?

				@y = @x

			else

				@y = parseFloat y

			node = document.createElement 'div'

			node.classList.add 'yatta-ellipse'

			super node

			@setWidth @x

			@setHeight @y

