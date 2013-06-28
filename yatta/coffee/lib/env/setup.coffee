define ['./setup/timing', '../utility/generals'], (Timing) ->

	for key, item of Timing

		window[key] = item

	null