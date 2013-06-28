define [
	'../userTools/math'
	'../userTools/param'
	], (math, Param) ->


	for key of math

		window[key] = math[key]

	null

	do ->

		p = new Param

		window.param = ->

			p.param.apply p, arguments

		window._param = returnLazily ->

			p.param.apply p, arguments

	# Center of the window in X axis
	window.centerX = -> window.innerWidth / 2

	# Center of the window in Y axis
	window.centerY = -> window.innerHeight / 2

	null