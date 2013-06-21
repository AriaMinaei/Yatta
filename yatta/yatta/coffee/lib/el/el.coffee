define [
	'../utility/object'
	'./css'
	'../visuals/lightmatrix'
	'../visuals/filter'
	'../tools'
	], (object, css, LightMatrix, CSSFilter, tools) ->

	body = document.body

	class El

		constructor: (@node) ->

			@_transform = new LightMatrix

			@_cssFilter = new CSSFilter

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

		updateTransform: (withAnim = no) ->

			@_do =>

				css.setTransform @node, @_transform.toPlainCss()

			@

		updateCssFilter: (withAnim = no) ->

			@_do =>

				css.setCssFilter @node, @_cssFilter.toCss()

			@

		putIn: (el = body) ->

			if el instanceof El

				el = el.node

			@_beenAppended = yes

			el.appendChild @node

			@

		setWidth: (d) ->

			@_do =>

				@node.style.width = d + 'px'

			@

		setHeight: (d) ->

			@_do =>

				@node.style.height = d + 'px'

			@

		go3d: ->

			css.setTransformStyle @node, 'preserve-3d'

			@

		setOrigin: (origin) ->

			@_do =>

				css.setTransformOrigin @node, origin

			@

		fillWith: (r, g, b) ->

			args = arguments

			@_do =>

				if args.length is 0

					color = 'transparent'

				else if args.length is 1

					color = r

				else

					color = tools.rgb r, g, b

				@node.style.background = color

			@

		makeHollow: ->

			@_do =>

				do @fillWith

			@

		setBorder: (thickness, r, g, b) ->

			args = arguments

			@_do =>

				if args.length is 0

					@node.style.border = 'none'

				else if args.length isnt 4

					throw Error "setBorders() requires either 0 or 4 arguments: thickness, r, g, b"

				else

					@node.style.border = thickness + 'px solid ' + tools.rgb(r, g, b)

			@

		removeBorder: ->

			@_do =>

				do @setBorder

	for key, fn of LightMatrix.prototype

		continue if key[0] is '_' or key is 'temporarily' or key is 'commit' or key is 'rollBack' or key is 'toCss' or key is 'toArray' or key is 'toMatrix'

		do ->
			_key = key
			El.prototype[_key] = ->

				@_transform[_key].apply @_transform, arguments


				do @updateTransform

			@

	for key, fn of CSSFilter.prototype

		continue if key[0] is '_' or key is 'toCss'

		do ->
			_key = key
			El.prototype[_key] = ->

				@_cssFilter[_key].apply @_cssFilter, arguments


				do @updateCssFilter

			@

	El