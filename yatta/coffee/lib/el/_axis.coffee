define ['./el', './cube', './type'], (El, Cube, Type) ->

	class _Axis extends El

		@_pool = []

		@give: ->

			if @_pool.length > 0

				return @_pool.pop()

			else

				return new _Axis

		@take: (axis) ->

			@_pool.push axis

			return

		constructor: (@_sizeMultiplier = 1, @_lengthToDepth = 30) ->

			node = document.createElement 'div'

			node.classList.add 'yatta-axis'

			super node

			@go3d()

			do @_createAxis

		_createAxis: ->

			@xAxis = new Cube @_sizeMultiplier * @_lengthToDepth * 5, @_sizeMultiplier * 5, @_sizeMultiplier * 5, 0, 70
			@xAxis.moveX(@_sizeMultiplier * 5)
			@xAxis.putIn @

			# @xType = new Type 'X'
			# @xType.moveX @_lengthToDepth * 5 + 10
			# @xType.setColor 250, 50, 50
			# @xType.putIn @
			# @xType.moveY -20

			@yAxis = new Cube @_sizeMultiplier * 5, @_sizeMultiplier * @_lengthToDepth * 5, @_sizeMultiplier * 5, 210, 70
			@yAxis.moveY(@_sizeMultiplier * 5)
			@yAxis.putIn @

			@zAxis = new Cube @_sizeMultiplier * 5, @_sizeMultiplier * 5, @_sizeMultiplier * @_lengthToDepth * 5, 64, 70
			@zAxis.moveZ(@_sizeMultiplier * 5)
			@zAxis.putIn @

			@_root = new Cube @_sizeMultiplier * 5, @_sizeMultiplier * 5, @_sizeMultiplier * 5
			@_root.each (side) ->

				side.fill.withRgb 0, 0, 0

			@_root.putIn @

			for child in @_children

				child
				.moveX(-@_sizeMultiplier * 5 / 2)
				.moveY(-@_sizeMultiplier * 5 / 2)
				.moveZ(-@_sizeMultiplier * 5 / 2)

			@

		clone: ->

			newEl = Object.create @constructor::

			super newEl