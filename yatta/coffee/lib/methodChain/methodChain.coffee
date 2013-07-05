define ['./_interface'], (_Interface) ->

	class MethodChain

		constructor: ->

			@_methods = {}

			@_Interface = class I extends _Interface

		addMethod: (name) ->

			@_Interface::[name] = ->

				@_queue.push

					method: name
					args: Array::slice.call arguments

				@

			@

		getInterface: ->

			new @_Interface

		run: (_interface, context) ->

			for item in _interface._queue

				context = context[item.method].apply context, getLazyValues(item.args)

			context