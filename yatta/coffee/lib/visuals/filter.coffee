if typeof define isnt 'function' then define = require('amdefine')(module)

define [
	'./filter/blur'
	'./filter/brightness'
	'./filter/contrast'
	'./filter/grayscale'
	'./filter/hueRotate'
	'./filter/invert'
	'./filter/opacity'
	'./filter/saturate'
	'./filter/sepia'
], (blur, brightness, contrast, grayscale, hueRotate, invert, opacity, saturate, sepia) ->

	filters = 

		blur: blur
		brightness: brightness
		contrast: contrast
		grayscale: grayscale
		hueRotate: hueRotate
		invert: invert
		opacity: opacity
		saturate: saturate
		sepia: sepia

	class CSSFilter

		constructor: ->

			@_filters = {}

		setBlur: (d) ->

			@_filters.blur = d

			@

		setBrightness: (d) ->

			@_filters.brightness = d

			@

		setContrast: (d) ->

			@_filters.contrast = d

			@

		setGrayscale: (d) ->

			@_filters.grayscale = d

			@

		rotateHue: (d) ->

			@_filters.hueRotate = d

			@

		invertColors: (d) ->

			@_filters.invert = d

			@

		setOpacity: (d) ->

			@_filters.opacity = d

			@

		setSaturation: (d) ->

			@_filters.saturate = d

			@

		setSepia: (d) ->

			@_filters.sepia = d

			@

		toCss: ->

			str = ''

			for key, value of @_filters

				str += filters[key].toCss(value) + ' '

			str


			