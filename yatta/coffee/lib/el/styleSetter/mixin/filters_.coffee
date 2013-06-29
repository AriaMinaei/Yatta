define ['../../../visuals/filter', '../../tools/css'], (CSSFilter, css) ->

	class Filters_

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
			Filters_.prototype[_key] = acceptLazyArgs ->

				@_cssFilter[_key].apply @_cssFilter, arguments

				do @updateCssFilter

			@

	Filters_