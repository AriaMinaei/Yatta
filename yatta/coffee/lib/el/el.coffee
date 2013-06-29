define [
	'./mixin/interactions_'
	'../utility/object'
	'../utility/array'
	'./tools/css'
	'./styleSetter/styleSetter'
	], (Interactions_, object, array, css, StyleSetter) ->

	# Every Yatta-enabled node in the app is an instance of El, which adds
	# Yatta-specific functionality to native elements.
	implementing Interactions_, class El

		constructor: (@node) ->

			if not @_shouldCloneInnerHTML?

				@_shouldCloneInnerHTML = no

			@_styleSetter = new StyleSetter @

			# @_animator = new Animator @

			@_styleInterface = @_styleSetter

			# do @_initTransforms

			# do @_initFilters

			do @_initInteractions

			@_beenAppended = no

			frames.nextTick =>

				if not @_beenAppended

					if not @node.parentElement? and @node.tagName isnt 'BODY'

						@putIn display

					else

						@_beenAppended = yes

			, 0

			@_animationEnabled = no

			@_parent = null

			@_children = []

		clone: ->

			newEl = Object.create @constructor::

			do =>

				for key of @

					continue if key is 'el' or key is '_beenAppended' or key is '_children' or key is '_parent'

					if @hasOwnProperty key

						newEl[key] = object.clone @[key], yes

			newNode = @node.cloneNode()
			newEl.node = newNode

			newEl._children = []

			do =>

				if @_shouldCloneInnerHTML

					newEl.node.innerHTML = @node.innerHTML

				else

					for child in @_children

						child.clone().putIn newEl

			do =>

				newEl._parent = null

				parent = @node._parent ? @node.parentElement ? null

				newEl._beenAppended = no

				setTimeout =>

					if not newEl._beenAppended

						newEl.putIn parent

				, 0

			newEl

		enableAnimation: acceptLazyArgs (duration = 500) ->

			duration = parseInt(duration) / 1000

			css.setTransitionDuration @node, duration + 's'

			@_animationEnabled = yes

			@

		_do: (fn) ->

			unless @_animationEnabled

				fn.apply @

			else

				nextPulse =>

					fn.apply @

			@

		ease: acceptLazyArgs (func = 'ease-out') ->

			css.setTransitionTimingFunction @node, func

			@

		_notYourChildAnymore: (el) ->

			unless el instanceof El

				throw Error "`el` must be an instance of `El`"

			array.pluckItem @_children, el

			@

		putIn: (el = display) ->

			if @_parent?

				@_parent._notYourChildAnymore @

			if el instanceof El

				el._append @
				@_parent = el

			else

				el.appendChild @node
				@_parent = null

			@_beenAppended = yes

			@

		_append: (el) ->

			if el instanceof El

				node = el.node
				@_children.push el

			else

				node = el

			@node.appendChild node

			@

		remove: ->

			if @_parent?

				@_parent._notYourChildAnymore @

			if @node.parentNode?

				@node.parentNode.removeChild @node

			null

	El