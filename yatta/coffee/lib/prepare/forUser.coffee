define [
	'../userTools/math'
	'../userTools/param'
	'../userTools/loading'
	], (math, Param, loading) ->

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

	window.load = loading.load
	window.loadWithIndicator = loading.loadWithIndicator

	null