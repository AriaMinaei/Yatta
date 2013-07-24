define [
	'./mixin/hasStyles_'
	'./mixin/interactions_'
	'./mixin/reactive_'
	'../utility/object'
	'../utility/array'
	# No dependency for _Axis, 'cause of the circular dependency, and the
	# fact that its only used by the user; I'll do something cleaner later.
	], (HasStyles_, Interactions_, Reactive_, object, array) ->

	# Every Yatta-enabled node in the app is an instance of El, which adds
	# Yatta-specific functionality to native elements.
	mixing HasStyles_, Interactions_, Reactive_, class El

		@_defaultContainer: null

		@_getDefaultContainer: ->

			if @_defaultContainer?

				return @_defaultContainer

			else

				return document.body

		constructor: (@node, addYattaClass = yes) ->

			if not @_shouldCloneInnerHTML?

				@_shouldCloneInnerHTML = no

			El.__initMixinsFor @

			@node.classList.add 'yatta-el' if addYattaClass

			@_beenAppended = no

			@_parent = null

			@_children = []

			@_group = null

			@_axis = null

			frames.nextTick =>

				if not @_beenAppended

					if not @node.parentElement? and @node.tagName isnt 'BODY'

						@putIn El._getDefaultContainer()

					else

						@_beenAppended = yes

		clone: (newEl = Object.create @constructor::) ->

			@_doUpdate()

			# Adding the node
			newNode = @node.cloneNode()
			newEl.node = newNode
			newEl._children = []

			if @_axis?

				newEl.enableAxis()

			# Cloning the children
			if @_shouldCloneInnerHTML

				newEl.node.innerHTML = @node.innerHTML

			else

				for child in @_children

					continue if child is @_axis

					child.clone().putIn newEl

			# Deciding on the parent
			newEl._parent = null

			if @_parent?

				parent = @_parent

			else

				parent = @node._parent ? @node.parentElement ? null

			newEl._beenAppended = no

			frames.laterInThisFrame =>

				if not newEl._beenAppended

					newEl.putIn parent

				return

			El.__applyClonersFor @, [newEl]

			for key, val of @

				continue if newEl[key] isnt undefined

				if @hasOwnProperty key

					newEl[key] = object.clone val, yes

			newEl

		_notYourChildAnymore: (el) ->

			unless el instanceof El

				throw Error "`el` must be an instance of `El`"

			array.pluckItem @_children, el

			@

		putIn: (el = El._getDefaultContainer()) ->

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

		takeOutOfParent: ->

			if @_parent?

				@_parent._notYourChildAnymore @

			@_parent = null

			@_beenAppended = no

			@

		setAsDefaultContainer: ->

			El._defaultContainer = @

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

		quit: ->

			p = @node.parentNode

			if p?

				p.removeChild @node

			@disableAxis()

			for child in @_children

				child.quit()


			El.__applyQuittersFor @

			return

		enableAxis: ->

			@_axis = _Axis.give()

			@_axis.putIn @

			do @_updateAxis

			@

		disableAxis: ->

			return @ unless @_axis?

			@_axis.takeOutOfParent()

			_Axis.take @_axis

			@_axis = null

			@

		_updateAxis: ->

			return unless @_axis?

			origin = @_styleSetter._origin
			# dims = @_styleSetter._dims

			if origin.x?

				@_axis.moveTo origin.x, origin.y, origin.z

			else

				wait 50, =>

					cssOrigin = getComputedStyle(@node).webkitTransformOrigin

					parts = cssOrigin.split(" ").map (num) -> parseFloat num

					if parts.length is 2

						@_axis.moveTo parts[0], parts[1], 0

					else

						@_axis.moveTo 0, 0, 0





			# else if dims.width?

			# 	@_axis.moveTo dims.width / 2, dims.height / 2, 0

			# else

			# 	@_axis.moveTo 0, 0, 0

			@

		each: (cb = null) ->

			if cb instanceof Function

				# I have to use this loop, since the children
				# might be put in another container
				i = 0
				child = null
				counter = -1

				loop

					counter++

					if child is @_children[i]

						i++

					child = @_children[i]

					break unless child?

					cb.call @, child, counter

				return @

			_interface = @_getNewInterface()

			els = @_children

			if els.length isnt 0

				frames.laterInThisFrame =>

					for el in els

						@_getMethodChain().run _interface, el

					null

			return _interface

		onClick: ->

			@_eventEnabledMethod arguments, (cb) =>

				@node.addEventListener 'click', (e) =>

					e.preventDefault()

					cb.call @

		onMouseOver: ->

			@_eventEnabledMethod arguments, (cb) =>

				@node.addEventListener 'mouseover', (e) =>

					e.preventDefault()

					cb.call @

		onMouseOut: ->

			@_eventEnabledMethod arguments, (cb) =>

				@node.addEventListener 'mouseout', (e) =>

					e.preventDefault()

					cb.call @