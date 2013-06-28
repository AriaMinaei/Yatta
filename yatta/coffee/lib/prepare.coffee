define ['require', './env/setup'], (require) ->

	toCallWhenReady = []
	ready = no

	callThem = ->

		return unless ready

		for fn in toCallWhenReady

			do fn

		toCallWhenReady.length = 0

		null

	require [
		'./prepare/elements'
		'./prepare/forUser'
	], (prepareElements, prepareForUser) ->

		ready = yes

		do callThem

	(fn) ->

		toCallWhenReady.push fn

		null