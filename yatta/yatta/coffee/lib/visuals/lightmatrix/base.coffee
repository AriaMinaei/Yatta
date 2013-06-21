if typeof define isnt 'function' then define = require('amdefine')(module)

define ->

	Base = 

		identity: ->

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

				m41: 0
				m42: 0
				m43: 0
				m44: 1
			}

		setIdentity: (m) ->
			m.m11 = 1
			m.m12 = 0
			m.m13 = 0
			m.m14 = 0

			m.m21 = 0
			m.m22 = 1
			m.m23 = 0
			m.m24 = 0

			m.m31 = 0
			m.m32 = 0
			m.m33 = 1
			m.m34 = 0

			m.m41 = 0
			m.m42 = 0
			m.m43 = 0
			m.m44 = 1
			
			m

		css2Array: (s) ->

			# Is it a matrix3d?
			if s.substr(8, 1) is '('

				# Remove the 'matrix3d(' and ')'
				s = s.substr(9, s.length - 10)
				result = s.split(', ').map(parseFloat)

			# Or a matrix?
			else if s.substr(6, 1) is '('

				s = s.substr(7, s.length - 8)
				temp = s.split(', ').map(parseFloat)
				result = [
					temp[0],
					temp[1],
					0, 0,

					temp[2],
					temp[3],
					0, 0,

					0, 0, 1, 0,

					temp[4],
					temp[5],
					0, 1
				]

			else if s[0] is 'n'

				# none
				result = identity()

			else
			
				throw Error 'Unkown matrix format'

			result

		fromCss: (s) ->

			Base.fromArray Base.css2Array s

		fromArray: (a) ->

			{
				m11: a[0]
				m12: a[1]
				m13: a[2]
				m14: a[3]

				m21: a[4]
				m22: a[5]
				m23: a[6]
				m24: a[7]

				m31: a[8]
				m32: a[9]
				m33: a[10]
				m34: a[11]

				m41: a[12]
				m42: a[13]
				m43: a[14]
				m44: a[15]
			}

		toCss2: (m) ->

			'matrix3d(' + 
				m.m11 + ', ' +
				m.m12 + ', ' +
				m.m13 + ', ' +
				m.m14 + ', ' +

				m.m21 + ', ' +
				m.m22 + ', ' +
				m.m23 + ', ' +
				m.m24 + ', ' +

				m.m31 + ', ' +
				m.m32 + ', ' +
				m.m33 + ', ' +
				m.m34 + ', ' +

				m.m41 + ', ' +
				m.m42 + ', ' +
				m.m43 + ', ' +
				m.m44 + ')'
		
		toCss: (m) ->

			'matrix3d(' + 
				@_toCssNumber(m.m11) + ', ' +
				@_toCssNumber(m.m12) + ', ' +
				@_toCssNumber(m.m13) + ', ' +
				@_toCssNumber(m.m14) + ', ' +

				@_toCssNumber(m.m21) + ', ' +
				@_toCssNumber(m.m22) + ', ' +
				@_toCssNumber(m.m23) + ', ' +
				@_toCssNumber(m.m24) + ', ' +

				@_toCssNumber(m.m31) + ', ' +
				@_toCssNumber(m.m32) + ', ' +
				@_toCssNumber(m.m33) + ', ' +
				@_toCssNumber(m.m34) + ', ' +

				@_toCssNumber(m.m41) + ', ' +
				@_toCssNumber(m.m42) + ', ' +
				@_toCssNumber(m.m43) + ', ' +
				@_toCssNumber(m.m44) + ')'
		
		_toCssNumber: (num) ->

			if -0.000001 < num < 0.000001

				return 0

			else

				return num
		
		multiply: (b, a) ->

			{
				m11: a.m11 * b.m11  +  a.m12 * b.m21  +  a.m13 * b.m31  +  a.m14 * b.m41
				m12: a.m11 * b.m12  +  a.m12 * b.m22  +  a.m13 * b.m32  +  a.m14 * b.m42
				m13: a.m11 * b.m13  +  a.m12 * b.m23  +  a.m13 * b.m33  +  a.m14 * b.m43
				m14: a.m11 * b.m14  +  a.m12 * b.m24  +  a.m13 * b.m34  +  a.m14 * b.m44

				m21: a.m21 * b.m11  +  a.m22 * b.m21  +  a.m23 * b.m31  +  a.m24 * b.m41
				m22: a.m21 * b.m12  +  a.m22 * b.m22  +  a.m23 * b.m32  +  a.m24 * b.m42
				m23: a.m21 * b.m13  +  a.m22 * b.m23  +  a.m23 * b.m33  +  a.m24 * b.m43
				m24: a.m21 * b.m14  +  a.m22 * b.m24  +  a.m23 * b.m34  +  a.m24 * b.m44

				m31: a.m31 * b.m11  +  a.m32 * b.m21  +  a.m33 * b.m31  +  a.m34 * b.m41
				m32: a.m31 * b.m12  +  a.m32 * b.m22  +  a.m33 * b.m32  +  a.m34 * b.m42
				m33: a.m31 * b.m13  +  a.m32 * b.m23  +  a.m33 * b.m33  +  a.m34 * b.m43
				m34: a.m31 * b.m14  +  a.m32 * b.m24  +  a.m33 * b.m34  +  a.m34 * b.m44
				
				m41: a.m41 * b.m11  +  a.m42 * b.m21  +  a.m43 * b.m31  +  a.m44 * b.m41
				m42: a.m41 * b.m12  +  a.m42 * b.m22  +  a.m43 * b.m32  +  a.m44 * b.m42
				m43: a.m41 * b.m13  +  a.m42 * b.m23  +  a.m43 * b.m33  +  a.m44 * b.m43
				m44: a.m41 * b.m14  +  a.m42 * b.m24  +  a.m43 * b.m34  +  a.m44 * b.m44
			}

		toArray: (m) ->

			[
				m.m11, m.m12, m.m13, m.m14,
				m.m21, m.m22, m.m23, m.m24,
				m.m31, m.m32, m.m33, m.m34,
				m.m41, m.m42, m.m43, m.m44
			]