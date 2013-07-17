define ['./el', './rectangle'], (El, Rectangle) ->

	class Cube extends El

		constructor: (@width, @height, @depth, @_initialHue = 0, @_initialSaturation = 0) ->

			node = document.createElement 'div'

			node.classList.add 'yatta-cube'

			super node

			@go3d()

			@_createSurfaces @width, @height, @depth

		_createSurfaces: (width, height, depth) ->

			@topSurface = new Rectangle width, depth
			@topSurface
			.rotateX(PI / 2)
			.putIn @

			@bottomSurface = new Rectangle width, depth
			@bottomSurface
			.rotateX(-PI / 2)
			.moveZTo(depth)
			.moveYTo(height)
			.putIn @

			@frontSurface = new Rectangle width, height
			@frontSurface
			.putIn @

			@backSurface = new Rectangle width, height
			@backSurface
			.moveZTo(depth)
			.putIn @

			@leftSurface = new Rectangle depth, height
			@leftSurface
			.rotateY(PI / 2)
			.moveZTo(depth)
			.putIn @

			@rightSurface = new Rectangle depth, height
			@rightSurface
			.rotateY(PI / 2)
			.moveZTo(depth)
			.moveXTo(width)
			.putIn @

			do @originToCenter

			for child in @_children

				child.fill.withHsl(@_initialHue,  @_initialSaturation, rand(50, 90))

				child.setOrigin(0, 0, 0)

			@

		originToCenter: ->

			@setOrigin(@width / 2, @height / 2, @depth / 2)

			@

		originToBottom: ->

			@setOrigin(@width / 2, @height, @depth / 2)

			@

		originToTop: ->

			@setOrigin(@width / 2, 0, @depth / 2)

			@

		clone: ->

			newEl = Object.create @constructor::

			newEl.topSurface = null
			newEl.bottomSurface = null
			newEl.frontSurface = null
			newEl.backSurface = null
			newEl.leftSurface = null
			newEl.rightSurface = null

			super newEl

			newEl.topSurface = newEl._children[0]
			newEl.bottomSurface = newEl._children[1]
			newEl.frontSurface = newEl._children[2]
			newEl.backSurface = newEl._children[3]
			newEl.leftSurface = newEl._children[4]
			newEl.rightSurface = newEl._children[5]

			newEl