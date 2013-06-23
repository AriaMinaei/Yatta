define [
	'../utility/object'
	'./css'
	'../tools'
	'./_el/__generals'
	'./_el/__transforms'
	'./_el/__filters'
	'./_el/__interactions'
	'../utility/generals'
	], (object, css, tools, __Generals, __Transforms, __Filters, __Interactions) ->

	body = document.body

	implementing __Generals, __Transforms, __Filters, __Interactions, class El

		constructor: (@node) ->

			do @_initTransforms

			do @_initFilters

			do @_initInteractions

			@_beenAppended = no

			setTimeout =>

				if not @_beenAppended

					@putIn body

			, 0

			@_animationEnabled = no

		clone: ->

			newEl = Object.create @constructor::

			for key of @

				continue if key is 'el' or key is '_beenAppended'

				if @hasOwnProperty key

					newEl[key] = object.clone @[key], yes

			newNode = @node.cloneNode()

			parent = @node.parentElement

			newEl.node = newNode

			newEl._beenAppended = no

			setTimeout =>

				if not newEl._beenAppended

					newEl.putIn parent

			, 0

			newEl

		enableAnimation: (duration = 500) ->

			duration = parseInt(duration) / 1000

			css.setTransitionDuration @node, duration + 's'

			@_animationEnabled = yes

			@

		_do: (fn) ->

			unless @_animationEnabled

				fn.apply @

			else

				tools.nextTick =>

					fn.apply @

			@

		ease: (func = 'ease-out') ->

			css.setTransitionTimingFunction @node, func

			@

		putIn: (el = body) ->

			if el instanceof El

				el = el.node

			@_beenAppended = yes

			el.appendChild @node

			@