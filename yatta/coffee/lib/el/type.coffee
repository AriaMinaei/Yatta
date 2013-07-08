define [
	'./el'
	'./type/_letter'
	], (El, _Letter) ->

	mixing class Type extends El

		constructor: (text = '') ->

			node = document.createElement 'div'
			node.classList.add 'type'

			super node

			@_letters = []

			@setText text

			Type.__initMixinsFor @

			do @_styleSetter._initTypography

		setText: (text) ->

			@_text = text

			do @_applyText

			@

		_applyText: ->

			lettersToApply = @_text.split ''

			for l, i in lettersToApply

				if @_letters[i]?

					@_letters[i].setLetter l

				else

					newLetter = new _Letter l

					newLetter.putIn @

					@_letters.push newLetter

			loop

				break if @_letters.length <= i

				letter = @_letters.pop()

				letter.remove()

			@