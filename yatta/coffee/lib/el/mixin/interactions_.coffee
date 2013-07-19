define [
	'../../methodChain/methodChain'
	'../../utility/array'
], (MethodChain, array) ->

	class Interactions_

		__initMixinInteractions: ->

			@_quittersForInteractions = []

			null

		__clonerForInteractions: (newEl) ->

			newEl._quittersForInteractions = []

		__quitterForInteractions: ->

			loop

				return if @_quittersForInteractions.length < 1

				@_quittersForInteractions.pop()()

			return

		_getMethodChain: ->

			unless @constructor.__methodChain?

				@constructor.__methodChain = new MethodChain

				for key, fn of @

					continue if key[0] is '_' or key is 'constructor'

					continue unless fn instanceof Function

					@constructor.__methodChain.addMethod key

			@constructor.__methodChain

		_getNewInterface: ->

			@_getMethodChain().getInterface()

		onClick: ->

			@_eventEnabledMethod arguments, (cb) =>

				@node.addEventListener 'click', (e) =>

					e.stopPropagation()
					e.preventDefault()

					cb.call @

		onMouseOver: ->

			@_eventEnabledMethod arguments, (cb) =>

				@node.addEventListener 'mouseover', (e) =>

					e.stopPropagation()
					e.preventDefault()

					cb.call @

		onMouseOut: ->

			@_eventEnabledMethod arguments, (cb) =>

				@node.addEventListener 'mouseout', (e) =>

					e.stopPropagation()
					e.preventDefault()

					cb.call @

		wait: (ms, rest...) ->

			@_eventEnabledMethod rest, (cb) =>

				frames.wait ms, =>

					cb.call @

		immediately: ->

			@_eventEnabledMethod arguments, (cb) =>

				frames.laterInThisFrame =>

					cb.call @

		eachFrame: ->

			@_eventEnabledMethod arguments, (cb) =>

				startTime = new Int32Array 1
				startTime[0] = -1

				canceled = no

				canceler = =>

					return if canceled

					frames.cancelEachFrame theCallback

					array.pluckOneItem @_quittersForInteractions, canceler

					canceled = yes

				@_quittersForInteractions.push canceler

				theCallback = (t) =>

					if startTime[0] < 0

						startTime[0] = t

						elapsedTime = 0

					else

						elapsedTime = t - startTime[0]

					cb.call @, elapsedTime, canceler

					null

				frames.onEachFrame theCallback

		run: ->

			@_eventEnabledMethod arguments, (cb) =>

				cb.call @

			@

		every: (ms, args...) ->

			@_eventEnabledMethod args, (cb) =>

				canceled = no

				canceler = =>

					return if canceled

					frames.cancelEvery theCallback

					array.pluckOneItem @_quittersForInteractions, canceler

					canceled = yes

				@_quittersForInteractions.push canceler

				theCallback = =>

					cb.call @, canceler

				frames.every ms, theCallback

		everyAndNow: (ms, args...) ->

			@_eventEnabledMethod args, (cb) =>

				canceled = no

				canceler = =>

					return if canceled

					frames.cancelEvery theCallback

					array.pluckOneItem @_quittersForInteractions, canceler

					canceled = yes

				@_quittersForInteractions.push canceler

				theCallback = =>

					cb.call @, canceler

				frames.every ms, theCallback

				frames.laterInThisFrame theCallback

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

		_eventEnabledMethod: (args, runCallback) ->

			fn = args[0] ? null

			if fn

				runCallback =>

					fn.apply @, arguments

				return @

			else

				_interface = @_getNewInterface()

				runCallback =>

					@_getMethodChain().run _interface, @

				return _interface