define ->

	isNumeric = (n) -> not isNaN n

	class ParamEl

		constructor: (name, val) ->

			@_containerNode = document.createElement 'div'
			@_containerNode.classList.add 'yatta-param-container'

			@_nameNode = document.createElement 'span'
			@_nameNode.classList.add 'yatta-param-name'
			@_containerNode.appendChild @_nameNode

			@_inputNode = document.createElement 'input'
			@_inputNode.classList.add 'yatta-param-input'
			@_containerNode.appendChild @_inputNode

			@_inputNode.addEventListener 'keyup', =>

				setTimeout =>

					v = @_inputNode.value
					@_val = if isNumeric(v) then Number(v) else v

					if @_onChangeCb?

						@_onChangeCb @_val
				, 0

			@setName name
			@setValue val

			@onChange null

		setName: (name) ->

			@_name = String name

			@_nameNode.innerHTML = @_name

			@

		setValue: (val) ->

			@_val = val

			@_inputNode.value = @_val

			@

		onChange: (fn) ->

			@_onChangeCb = fn

			@

		getNode: -> @_containerNode

