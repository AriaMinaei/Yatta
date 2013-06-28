define ->

	math =

		PI: Math.PI

		floor: Math.floor

		ceil: Math.ceil

		round: Math.round

		abs: Math.abs

		cos: Math.cos
		acos: Math.acos

		sin: Math.sin
		asin: Math.asin

		tan: Math.tan
		atan: Math.atan

		pow: Math.pow

		sqrt: Math.sqrt

		random: Math.random

		rand: (from, to, inte = yes) ->

			r = Math.random()

			l = to - from

			n = l * r + from

			if inte

				return Math.round n

			else

				return n

		log: Math.log

		rad: (deg) ->

			deg * Math.PI / 180

		deg: (rad) ->

			180 * rad / Math.PI

	for key, val of math

		continue unless val instanceof Function

		math['_' + key] = acceptAndReturnLazily math[key]

	math