define ['./bezier'], (Bezier) ->

	# Some standard easing curves for tween animations, originally from MooTools.
	#
	# See easings.net
	Easing =

		# Linear easing
		linear: (p) -> p

		# To define a easing function. It'll take care of the ease in, out, and in-out
		# parts.
		#
		# Example: Easing.define 'quad', (p) -> p * p
		#
		# usage: Easing.quad.easeIn 0.6
		define: (name, func) ->

			if typeof name is 'object'

				Easing.define _name, _func for _name, _func of name

				return

			Easing[name] =

				easeIn: func

				easeOut: (p) -> 1 - func( 1 - p )

				easeInOut: (p) ->

					if p <= 0.5
						return 0.5 * func( p * 2 )
					else
						return 0.5 * ( 2 - func( 2 * ( 1 - p ) ) )

		get: (func) ->

			if func instanceof Function

				return func

			else if arguments.length is 4

				b = new Bezier arguments[0], arguments[1], arguments[2], arguments[3]

				return (p) ->

					b.solve p, Bezier.epsilon

			unless typeof func is 'string'

				throw Error "func should either be a function or a string, like cubic.easeOut"

			parts = func.split '.'

			f = Easing

			for part in parts

				f = f[part]

			if typeof f is 'undefined'

				throw Error "Cannot find easing function `#{func}`"

			f

	# Defining the standard easings
	Easing.define

		quad: 	(p) -> Math.pow p, 2

		cubic: 	(p) -> Math.pow p, 3

		quart: 	(p) -> Math.pow p, 4

		quint: 	(p) -> Math.pow p, 5

		expo: 	(p) -> Math.pow 2, 8 * (p - 1)

		circ:	(p) -> 1 - Math.sin Math.cos p

		sine:	(p) -> 1 - Math.cos p * Math.PI / 2

	Easing