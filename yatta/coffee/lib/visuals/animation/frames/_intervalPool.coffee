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

			if _intervalPool._pool.length > 0

				item = _intervalPool._pool.pop()

				item.every = every
				item.from = from
				item.timesCalled = timesCalled
				item.fn = fn

				return item

			else

				return _intervalPool._getNew every, from, timesCalled, fn

		take: (item) ->

			_intervalPool._pool.push item

			null