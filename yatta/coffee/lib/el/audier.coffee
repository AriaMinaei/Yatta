define ['./mixin/interactions_'], (Interactions_) ->

	mixing Interactions_, class Audier

		constructor: (filename) ->

			@node = document.createElement 'audio'

			@node.playbackRate = frames.speed

			@setFile filename

			Audier.__initMixinsFor @

		jumpTo: (ms) ->

			ms /= 1000

			@node.currentTime = ms

			@

		@getter 'time', -> @node.currentTime * 1000

		setFile: (filename) ->

			@_fileAddr = './audio/' + filename

			@node.src = @_fileAddr

			@

		play: ->

			@_eventEnabledMethod arguments, (cb) =>

				if @node.readyState is 4

					do @_play

					do cb

				else

					@node.addEventListener 'canplaythrough', =>

						do @_play

						do cb

			@

		_play: ->

			@node.playbackRate = frames.speed
			@node.play()

		pause: ->

			@node.pause()

			@