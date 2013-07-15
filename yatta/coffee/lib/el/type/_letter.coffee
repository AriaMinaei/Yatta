define ['../el'], (El) ->

	mixing class _Letter extends El

		constructor: (letter = '') ->

			@_shouldCloneInnerHTML = yes

			node = document.createElement 'span'
			node.classList.add 'yatta-letter'

			super node, no

			@setLetter letter

			_Letter.__initMixinsFor @

		setLetter: (letter) ->

			@_letter = String letter

			do @_applyLetter

		_applyLetter: ->

			if @_letter is ' '

				@node.innerHTML = '&nbsp'

			else

				@node.innerHTML = @_letter