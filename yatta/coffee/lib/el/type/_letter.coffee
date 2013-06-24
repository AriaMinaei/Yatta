define ['../el'], (El) ->

	class _Letter extends El

		constructor: (letter = '') ->

			@_shouldCloneInnerHTML = yes

			node = document.createElement 'span'
			node.classList.add 'letter'

			super node

			@setLetter letter

		setLetter: (letter) ->

			@_letter = String letter

			do @_applyLetter

		_applyLetter: ->

			@node.innerHTML = @_letter