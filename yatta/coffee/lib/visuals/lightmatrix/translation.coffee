if typeof define isnt 'function' then define = require('amdefine')(module)

define ->

	Translation = 

		components: (x, y, z) ->

			{
				m41: x
				m42: y
				m43: z
			}

		matrix: (x, y, z) ->

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
				m34: 0

				m41: x
				m42: y
				m43: z
				m44: 1
			}

		toPlainCss: (x, y, z) ->

			"translate3d(#{x}px, #{y}px, #{z}px) "

		setTo: (b, x, y, z) ->

			b.m41 = x
			b.m42 = y
			b.m43 = z
			
			b

		applyTo: (b, x, y, z) ->

			b.m41 = x * b.m11  +  y * b.m21  +  z * b.m31  +  b.m41
			b.m42 = x * b.m12  +  y * b.m22  +  z * b.m32  +  b.m42
			b.m43 = x * b.m13  +  y * b.m23  +  z * b.m33  +  b.m43
			b.m44 = x * b.m14  +  y * b.m24  +  z * b.m34  +  b.m44
			
			b