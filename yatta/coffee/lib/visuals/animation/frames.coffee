define [
	'../../utility/array'
	'./frames/_timeoutPool'
	'./frames/_intervalPool'
], (array, _timeoutPool, _intervalPool) ->

	getTime = do ->

		if performance? and performance.now?

			return -> performance.now()

		else

			return Date.now

	_nextFrame = do ->

		return window.requestAnimationFrame if window.requestAnimationFrame

		return window.mozRequestAnimationFrame if window.mozRequestAnimationFrame

		return window.webkitRequestAnimationFrame if window.webkitRequestAnimationFrame

		return (fn) ->

			setTimeout fn, 16

	frames =

		getTime: getTime

		_currentT: 0

		_currentTInMs: 0

		_toCallLaterInThisFrame: []

		_toCallOnNextTick: []

		_nextTickTimeout: null

		nextTick: (fn) ->

			@_toCallOnNextTick.push fn

			unless @_nextTickTimeout

				@_nextTickTimeout = setTimeout =>

					do @_callTick

				, 0

			@

		_callTick: ->

			@_nextTickTimeout = null

			toCallNow = @_toCallOnNextTick

			@_toCallOnNextTick = []

			for fn in toCallNow

				do fn

			null

		laterInThisFrame: (fn) ->

			@_toCallLaterInThisFrame.push fn

			null

		_callFramesScheduledForLaterInThisFrame: (t) ->

			loop

				len = @_toCallLaterInThisFrame.length

				break if len < 1

				toCall = @_toCallLaterInThisFrame

				@_toCallLaterInThisFrame = []

				for fn in toCall

					fn t

			null

		_toCallOnNextFrame: []

		onNextFrame: (fn) ->

			@_toCallOnNextFrame.push fn

			null

		cancelOnNextFrame: (fn) ->

			array.pluckOneItem @_toCallOnNextFrame, fn

			null

		_callFramesScheduledForThisFrame: (t) ->

			toCallNow = @_toCallOnNextFrame

			@_toCallOnNextFrame = []

			for fn in toCallNow

				fn t

			null

		_toCallOnEachFrame: []

		_toCancelFromCallingOnEachFrame: []

		onEachFrame: (fn) ->

			@_toCallOnEachFrame.push fn

			null

		cancelEachFrame: (fn) ->

			@_toCancelFromCallingOnEachFrame.push fn

			null

		_callFramesScheduledForEachFrame: (t) ->

			for toCancel in @_toCancelFromCallingOnEachFrame

				array.pluckOneItem @_toCallOnEachFrame, toCancel

			@_toCancelFromCallingOnEachFrame.length = 0

			for fn in @_toCallOnEachFrame

				fn t

			null

		__shouldInjectCallItem: (itemA, itemB, itemToInject) ->

			unless itemA?

				return yes if itemToInject.time <= itemB.time

				return no

			unless itemB?

				return yes if itemA.time <= itemToInject.time

				return no

			return yes if itemA.time <= itemToInject.time <= itemB.time

			return no

		_waitCallbacks: []

		wait: (ms, fn) ->

			callTime = @_currentTInMs + ms + 8

			item = _timeoutPool.give callTime, fn

			array.injectByCallback @_waitCallbacks, item, @__shouldInjectCallItem

			null

		_callWaiters: (t) ->

			loop

				return if @_waitCallbacks.length < 1

				item = @_waitCallbacks[0]

				return if item.time > @_currentTInMs

				_timeoutPool.take item

				@_waitCallbacks.shift()

				item.fn t

			null

		_intervals: []

		_removeFromIntervals: []

		every: (ms, fn) ->

			@_intervals.push _intervalPool.give ms, @_currentTInMs, 0, fn

			null

		cancelEvery: (fn) ->

			@_removeFromIntervals.push fn

			null

		_callIntervals: ->


			t = @_currentTInMs

			for fnToRemove in @_removeFromIntervals

				array.pluckByCallback @_intervals, (item) ->

					return yes if item.fn is fnToRemove
					return no

			for item in @_intervals

				properTimeToCall = item.from + (item.timesCalled * item.every) + item.every


				if properTimeToCall <= t

					item.fn t

					item.timesCalled++

			null

		_theLoop: (t) ->

			_nextFrame frames._theLoop

			frames._currentT = t

			frames._currentTInMs = parseInt t

			frames._callFramesScheduledForThisFrame t

			frames._callFramesScheduledForEachFrame t

			frames._callFramesScheduledForLaterInThisFrame t

			frames._callWaiters t

			frames._callIntervals t

			null

		start: ->

			_nextFrame frames._theLoop

			null