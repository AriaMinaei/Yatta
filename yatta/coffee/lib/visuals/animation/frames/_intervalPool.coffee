define ->

	_intervalPool =

		_pool: []

		_getNew: (every, from, timesCalled, fn) ->

			{
				every: every
				from: from
				timesCalled: timesCalled
				fn: fn
			}

		give: (every, from, timesCalled, fn) ->

			if @_pool.length > 0

				item = pool.pop()

				item.every = every
				item.from = from
				item.timesCalled = timesCalled
				item.fn = fn

				return item

			else

				return @_getNew every, from, timesCalled, fn

		take: (item) ->

			@_pool.push item

			null