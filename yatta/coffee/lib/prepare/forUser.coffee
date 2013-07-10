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

	window.every = frames.every

	window.wait = frames.wait

	null