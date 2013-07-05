define ['./el'], (El) ->

	class Container extends El

		constructor: ->

			node = document.createElement 'div'
			node.classList.add 'container'

			super node