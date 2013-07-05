define ['./el'], (El) ->

	class Image extends El

		constructor: (@filename) ->

			node = document.createElement 'img'
			node.src = "./images/#{@filename}"

			super node