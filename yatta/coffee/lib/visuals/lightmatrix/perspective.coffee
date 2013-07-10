if typeof define isnt 'function' then define = require('amdefine')(module)

define ->

	Perspective =

		components: (d) ->

			if -0.00001 < d < 0.00001

				d = 0

			if d is 0

				p = 0

			else

				p = - 1 / d

			{
				m34: p
			}

		matrix: (d) ->

			if d is 0

				p = 0

			else

				p = - 1 / d

			{
				m11: 1
				m12: 0
				m13: 0
				m14: 0

				m21: 0
				m22: 1
				m23: 0
				m24: 0

				m31: 0
				m32: 0
				m33: 1
				m34: p

				m41: 0
				m42: 0
				m43: 0
				m44: 1
			}

		toPlainCss: (d) ->

			"perspective(#{d}) "

		applyTo: (b, d) ->

			if d is 0

				p = 0

			else

				p = - 1 / d



			b.m31 = b.m31  +  p * b.m41
			b.m32 = b.m32  +  p * b.m42
			b.m33 = b.m33  +  p * b.m43
			b.m34 = b.m34  +  p * b.m44



			b