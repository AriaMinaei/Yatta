define ['./el'], (El) ->

	class Display extends El

		constructor: (node = document.body) ->

			super node

			@_displayCoords =

				centerX: 0
				centerY: 0
				width: 0
				height: 0

			@_displayCoordsInitialized = no

		_getDisplayCoords: ->

			unless @_displayCoordsInitialized

				@_displayCoords.width = window.innerWidth
				@_displayCoords.height = window.innerHeight

				@_displayCoords.centerX = parseInt @_displayCoords.width / 2
				@_displayCoords.centerY = parseInt @_displayCoords.height / 2

				@_displayCoordsInitialized = yes

			@_displayCoords

		@getter 'centerX', -> @_getDisplayCoords().centerX

		@getter 'centerY', -> @_getDisplayCoords().centerY

		@getter 'width', -> @_getDisplayCoords().width

		@getter 'height', -> @_getDisplayCoords().height