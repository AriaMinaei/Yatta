define ->

	timing = {}

	# Runs the given fn on the next pulse (around 66ms later)
	timing.nextPulse = do ->

		list = []

		timeout = null

		doIt = ->

			for fn in list

				do fn

			list.length = 0

			timeout = null

			null

		(fn) ->

			list.push fn

			timeout = setTimeout doIt, 66

			null

	# Runs the given fn on the next frame (requestAnimationFrame)
	timing.nextFrame = do ->

		return window.requestAnimationFrame if window.requestAnimationFrame

		return window.mozRequestAnimationFrame if window.mozRequestAnimationFrame

		return window.webkitRequestAnimationFrame if window.webkitRequestAnimationFrame

		return (fn) ->

			setTimeout fn, 16

	# setTimeout() with arguments in sane order
	timing.wait = (ms, fn) ->

		setTimeout ->

			do fn

		, ms

		null

	# setInterval()
	timing.every = (ms, fn) ->

		setInterval ->

			do fn

		, ms

		null

	timing