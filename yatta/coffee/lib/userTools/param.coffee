define ['./param/el'], (ParamEl) ->

	class Params

		constructor: ->

			@_params = {}

			@_initialized = no

		_init: ->

			return if @_initialized

			@_initialized = yes

			@_containerNode = document.createElement 'div'
			@_containerNode.classList.add 'yatta-params-container'

			unless @_putIn

				@_putIn = document.body

			@_putIn.appendChild @_containerNode

		putIn: (@_putIn) ->

		_addParam: (name, def) ->

			do @_init unless @_initialized

			@_params[name] =

				value: def

			el = new ParamEl name, def

			@_params[name].el = el

			@_containerNode.appendChild el.getNode()

			el.onChange (newVal) =>

				@_update name, newVal

			@

		_update: (name, newVal) ->

			@_params[name].value = newVal

			@

		param: (name, def) ->

			unless @_params[name]?

				@_addParam name, def

			@_params[name].value