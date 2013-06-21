if typeof define isnt 'function' then define = require('amdefine')(module)

define ->

	# https://github.com/jashkenas/coffee-script/issues/451#issuecomment-2404226
	Function::define = (prop, desc) ->

		Object.defineProperty this.prototype, prop, desc

	Function::getter = (prop, getter) ->

		@::__defineGetter__ prop, getter

	Function::setter = (prop, setter) ->

		@::__defineSetter__ prop, setter


	# Little helper for mixins from CoffeeScript FAQ,
	# courtesy of Sethaurus (http://github.com/sethaurus)
	implementing = (mixins..., classReference) ->

		for mixin in mixins

			classProto = classReference::

			for member of mixin::

				unless Object.getOwnPropertyDescriptor classProto, member

					desc = Object.getOwnPropertyDescriptor mixin::, member

					Object.defineProperty classProto, member, desc

		classReference

	global.implementing = implementing