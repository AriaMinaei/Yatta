if typeof define isnt 'function' then define = require('amdefine')(module)

define ->

	if typeof window isnt 'undefined' then global = window

	# https://github.com/jashkenas/coffee-script/issues/451#issuecomment-2404226
	Function::define = (prop, desc) ->

		Object.defineProperty this.prototype, prop, desc

	Function::getter = (prop, getter) ->

		@::__defineGetter__ prop, getter

	Function::setter = (prop, setter) ->

		@::__defineSetter__ prop, setter

	# Little helper for mixins from CoffeeScript FAQ,
	# courtesy of Sethaurus (http://github.com/sethaurus)
	global.implementing = implementing = (mixins..., classReference) ->

		for mixin in mixins

			classProto = classReference::

			for member of mixin::

				unless Object.getOwnPropertyDescriptor classProto, member

					desc = Object.getOwnPropertyDescriptor mixin::, member

					Object.defineProperty classProto, member, desc

		classReference

	getLazyValue = (val) ->


		if val._isLazy? and val._isLazy

			return do val

		else

			return val

	getLazyValues = (ar) ->

		getLazyValue item for item in ar

	global.returnLazily = returnLazily = (fn) ->

		->

			args = arguments

			ret = =>

				fn.apply @, args

			ret._isLazy = yes

			ret

	global.acceptLazyArgs = acceptLazyArgs = (fn) ->

		->

			args = getLazyValues arguments

			fn.apply @, args

	global.acceptAndReturnLazily = acceptAndReturnLazily = (fn) ->

		returnLazily acceptLazyArgs fn

	null