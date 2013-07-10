define [
	'./mixin/generals_'
	'./mixin/layout_'
	'./mixin/fill_'
	'./mixin/typography_'
	'./mixin/transforms_'
	'./mixin/filters_'
	'../../../utility/object'
], (Generals_, Layout_, Fill_, Typography_, Transforms_, Filters_, object) ->

	mixing Generals_, Layout_, Fill_, Typography_, Transforms_, Filters_, class StyleSetter

		constructor: (@el) ->

			@node = @el.node

			@_styles = @node.style

			StyleSetter.__initMixinsFor @

		_scheduleUpdate: ->

			do @el._scheduleUpdate

		clone: (el) ->

			newObj = Object.create @constructor::

			newObj.el = el
			newObj.node = el.node
			newObj._styles = el.node.style

			StyleSetter.__applyClonersFor @, [newObj]

			for key of @

				continue if newObj[key] isnt undefined

				if @hasOwnProperty key

					newObj[key] = object.clone @[key], yes

			newObj