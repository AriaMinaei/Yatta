define ['../el', './typography_'], (El, Typography_) ->

	mixing Typography_, class _Letter extends El

		constructor: (letter = '') ->

			@_shouldCloneInnerHTML = yes

			node = document.createElement 'span'
			node.classList.add 'letter'

			super node

			@setLetter letter

			_Letter.__initMixinsFor @

		setLetter: (letter) ->

			@_letter = String letter

			do @_applyLetter

		_applyLetter: ->

			@node.innerHTML = @_letter