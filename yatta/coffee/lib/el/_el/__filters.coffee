define ['../../visuals/filter', '../css', '../../utility/generals'], (CSSFilter, css) ->

	class __Filters

		_initFilters: ->

			@_cssFilter = new CSSFilter

		updateCssFilter: (withAnim = no) ->

			@_do =>

				css.setCssFilter @node, @_cssFilter.toCss()

			@

	for key, fn of CSSFilter.prototype

		continue if key[0] is '_' or key is 'toCss'

		do ->
			_key = key
			__Filters.prototype[_key] = acceptLazyArgs ->

				@_cssFilter[_key].apply @_cssFilter, arguments

				do @updateCssFilter

			@

	__Filters