define ['./el', './rectangle'], (El, Rectangle) ->

	class Cube extends El

		constructor: (width, height, depth) ->

			node = document.createElement 'div'

			node.classList.add 'cube'

			super node

			@go3d()

			@_createSurfaces width, height, depth

		_createSurfaces: (width, height, depth) ->

			@topSurface = new Rectangle width, depth
			@topSurface
			.rotateX(PI / 2)
			.putIn @

			@bottomSurface = new Rectangle width, depth
			@bottomSurface
			.rotateX(-PI / 2)
			.setMovementZ(depth)
			.setMovementY(height)
			.putIn @

			@frontSurface = new Rectangle width, height
			@frontSurface
			.putIn @

			@backSurface = new Rectangle width, height
			@backSurface
			.setMovementZ(depth)
			.putIn @

			@leftSurface = new Rectangle depth, height
			@leftSurface
			.rotateY(PI / 2)
			.setMovementZ(depth)
			.putIn @

			@rightSurface = new Rectangle depth, height
			@rightSurface
			.rotateY(PI / 2)
			.setMovementZ(depth)
			.setMovementX(width)
			.putIn @

			@setOrigin("#{depth / 2}px #{height / 2}px #{width / 2}px ");

			for child in @_children

				child.fill.withHsl(120, 0, rand(50, 90))

				child.setOrigin('0 0 0')

				# child.css('-webkit-backface-visibility', 'hidden');

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