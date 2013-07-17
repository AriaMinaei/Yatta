define ['../../utility/object'], (object) ->

	class Reactive_

		__initMixinReactive: ->

			@_reactor = null
			@_reactorVars =

				started: no

			return

		__clonerForReactive: (newEl) ->

			newEl.reactor = @_reactor
			newEl._reactorVars = object.clone @_reactorVars

			return

		react: (args) ->

			if @_reactorVars.started

				throw Error "Reactor already started", @node

			@_reactorVars.started = yes

			@_reactor.react @, args

			@

		reactLike: (el) ->

			@_reactor = el.reactor
			@_reactorVars  = object.clone el._reactorVars

			@

		setReactor: (r) ->

			@_reactor = r

			@

		configReactor: (config) ->

			object.appendOnto @_reactorVars, config

			@