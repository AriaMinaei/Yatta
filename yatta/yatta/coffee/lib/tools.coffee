define ->

	needsTextStroke = null

	nextTick = do ->

		list = []

		to = null

		doIt = ->

			for fn in list

				do fn

			list.length = 0
			to = null

			null

		(fn) ->

			list.push fn

			# if to isnt null

			# 	clearTimeout to

			to = setTimeout doIt, 50

			null

	onFrame = do ->

		return window.requestAnimationFrame if window.requestAnimationFrame

		return window.mozRequestAnimationFrame if window.mozRequestAnimationFrame

		return window.webkitRequestAnimationFrame if window.webkitRequestAnimationFrame

		return (fn) ->

			setTimeout fn, 16

	tools =

		nextTick: nextTick

		onFrame: onFrame

		needsTextStroke: ->

			if needsTextStroke is null

				if navigator.appVersion.indexOf('Chrome') isnt -1 and navigator.appVersion.indexOf('Windows') isnt -1

					needsTextStroke = yes

				else

					needsTextStroke = no

			needsTextStroke



		rgb: (r, g, b) ->

			'rgb(' + r + ', ' + g + ', ' + b + ')'

		setBgColor: (el, r, g, b) ->

			el.style.backgroundColor = tools.rgb r, g, b

		wait: (ms, fn) ->

			setTimeout ->

				do fn

			, ms

			null

		count: (from, to, fn) ->

			`for (var i = from; i <= to; i++) {
				fn(i);
			}`

			null

		centerX: -> window.innerWidth / 2

		centerY: -> window.innerHeight / 2