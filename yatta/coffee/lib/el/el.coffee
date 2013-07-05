define [
	'./mixin/hasStyles_'
	'./mixin/interactions_'
	'../utility/object'
	'../utility/array'
	], (HasStyles_, Interactions_, object, array) ->

	# Every Yatta-enabled node in the app is an instance of El, which adds
	# Yatta-specific functionality to native elements.
	mixing HasStyles_, Interactions_, class El

		constructor: (@node) ->

			if not @_shouldCloneInnerHTML?

				@_shouldCloneInnerHTML = no

			El.__initMixinsFor @

			@_beenAppended = no

			@_parent = null

			@_children = []

			frames.nextTick =>

				if not @_beenAppended

					if not @node.parentElement? and @node.tagName isnt 'BODY'

						@putIn display

					else

						@_beenAppended = yes

		clone: ->

			@_doUpdate()

			# The skeleton
			newEl = Object.create @constructor::

			# Adding the node
			newNode = @node.cloneNode()
			newEl.node = newNode
			newEl._children = []

			# Cloning the children
			if @_shouldCloneInnerHTML

				newEl.node.innerHTML = @node.innerHTML

			else

				for child in @_children

					child.clone().putIn newEl

			# Deciding on the parent
			newEl._parent = null

			parent = @node._parent ? @node.parentElement ? null

			newEl._beenAppended = no

			frames.laterInThisFrame =>

				if not newEl._beenAppended

					newEl.putIn parent

				return

			@__applyCloners newEl

			for key of @

				continue if newEl[key]?

				if @hasOwnProperty key

					newEl[key] = object.clone @[key], yes

			newEl

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