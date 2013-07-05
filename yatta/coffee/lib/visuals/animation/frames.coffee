define [
	'../../utility/array'
	'./frames/_timeoutPool'
	'./frames/_intervalPool'
], (array, _timeoutPool, _intervalPool) ->

	getTime = do ->

		if performance? and performance.now?

			return -> performance.now()

		else

			return Date.now() - 1372763687107

	_nextFrame = do ->

		return window.requestAnimationFrame if window.requestAnimationFrame

		return window.mozRequestAnimationFrame if window.mozRequestAnimationFrame

		return window.webkitRequestAnimationFrame if window.webkitRequestAnimationFrame

	frames =

		getTime: getTime

		time: new Float64Array 1

		timeInMs: new Int32Array 1

		_toCallLaterInThisFrame: []

		_toCallOnNextTick: []

		_nextTickTimeout: null

		nextTick: (fn) ->

			frames._toCallOnNextTick.push fn

			unless frames._nextTickTimeout

				frames._nextTickTimeout = setTimeout =>

					do frames._callTick

				, 0

			null

		_callTick: ->

			return if frames._toCallOnNextTick.length < 1

			frames._nextTickTimeout = null

			toCallNow = frames._toCallOnNextTick

			frames._toCallOnNextTick = []

			for fn in toCallNow

				do fn

			null

		laterInThisFrame: (fn) ->

			frames._toCallLaterInThisFrame.push fn

			null

		_callFramesScheduledForLaterInThisFrame: (t) ->

			return if frames._toCallLaterInThisFrame.length < 1

			loop

				return if frames._toCallLaterInThisFrame.length < 1

				toCall = frames._toCallLaterInThisFrame

				frames._toCallLaterInThisFrame = []

				for fn in toCall

					fn t

			null

		_toCallOnNextFrame: []

		onNextFrame: (fn) ->

			frames._toCallOnNextFrame.push fn

			null

		cancelOnNextFrame: (fn) ->

			array.pluckOneItem frames._toCallOnNextFrame, fn

			null

		_callFramesScheduledForThisFrame: (t) ->

			return if frames._toCallOnNextFrame.length < 1

			toCallNow = frames._toCallOnNextFrame

			frames._toCallOnNextFrame = []

			for fn in toCallNow

				fn t

			null

		_toCallOnEachFrame: []

		_toCancelFromCallingOnEachFrame: []

		onEachFrame: (fn) ->

			frames._toCallOnEachFrame.push fn

			null

		cancelEachFrame: (fn) ->

			frames._toCancelFromCallingOnEachFrame.push fn

			null

		_callFramesScheduledForEachFrame: (t) ->

			return if frames._toCallOnEachFrame.length < 1

			for toCancel in frames._toCancelFromCallingOnEachFrame

				array.pluckOneItem frames._toCallOnEachFrame, toCancel

			frames._toCancelFromCallingOnEachFrame.length = 0

			for fn in frames._toCallOnEachFrame

				fn t

			return

		_toCallAfterEachFrame: []

		_toCancelFromCallingAfterEachFrame: []

		afterEachFrame: (fn) ->

			frames._toCallAfterEachFrame.push fn

			null

		cancelAfterEachFrame: (fn) ->

			frames._toCancelFromCallingAfterEachFrame.push fn

			null

		_callFramesScheduledForAfterEachFrame: (t) ->

			return if frames._toCallAfterEachFrame.length < 1

			for toCancel in frames._toCancelFromCallingAfterEachFrame

				array.pluckOneItem frames._toCallAfterEachFrame, toCancel

			frames._toCancelFromCallingAfterEachFrame.length = 0

			for fn in frames._toCallAfterEachFrame

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

			callTime = frames.timeInMs[0] + ms + 8

			item = _timeoutPool.give callTime, fn

			array.injectByCallback frames._waitCallbacks, item, frames.__shouldInjectCallItem

			null

		_callWaiters: (t) ->

			return if frames._waitCallbacks.length < 1

			loop

				return if frames._waitCallbacks.length < 1

				item = frames._waitCallbacks[0]

				return if item.time > frames.timeInMs[0]

				_timeoutPool.take item

				frames._waitCallbacks.shift()

				item.fn t

			null

		_intervals: []

		_removeFromIntervals: []

		every: (ms, fn) ->

			frames._intervals.push _intervalPool.give ms, frames.timeInMs[0], 0, fn

			null

		cancelEvery: (fn) ->

			frames._removeFromIntervals.push fn

			null

		_callIntervals: ->

			return if frames._intervals.length < 1

			t = frames.timeInMs[0]

			for fnToRemove in frames._removeFromIntervals

				array.pluckByCallback frames._intervals, (item) ->

					return yes if item.fn is fnToRemove
					return no

			for item in frames._intervals

				properTimeToCall = item.from + (item.timesCalled * item.every) + item.every

				if properTimeToCall <= t

					item.fn t

					item.timesCalled++

			return

		_theLoop: (t) ->

			_nextFrame frames._theLoop

			frames.time[0] = t

			t = parseInt t

			frames.timeInMs[0] = t

			frames._callFramesScheduledForThisFrame t

			frames._callFramesScheduledForEachFrame t

			frames._callFramesScheduledForAfterEachFrame t

			frames._callFramesScheduledForLaterInThisFrame t

			frames._callWaiters t

			frames._callIntervals t

			null

		start: ->

			_nextFrame frames._theLoop

			null