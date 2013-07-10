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
	global.implementing = (mixins..., classReference) ->

		classProto = classReference::

		for mixin in mixins

			for member of mixin::

				unless Object.getOwnPropertyDescriptor classProto, member

					desc = Object.getOwnPropertyDescriptor mixin::, member

					Object.defineProperty classProto, member, desc

		classReference

	global.mixing = (mixins..., classReference) ->

		classProto = classReference::

		classReference.__mixinCloners = []

		classReference.__applyClonersFor = (instance, args = null) ->

			for cloner in classReference.__mixinCloners

				cloner.apply instance, args

			return

		classReference.__mixinInitializers = []

		classReference.__initMixinsFor = (instance, args = null) ->

			for initializer in classReference.__mixinInitializers

				initializer.apply instance, args

			return

		classReference.__mixinQuitters = []

		classReference.__applyQuittersFor = (instance, args = null) ->

			for quitter in classReference.__mixinQuitters

				quitter.apply instance, args

			return

		for mixin in mixins

			for member of mixin::

				if member.substr(0, 11) is '__initMixin'

					classReference.__mixinInitializers.push mixin::[member]

					continue

				else if member.substr(0, 11) is '__clonerFor'

					classReference.__mixinCloners.push mixin::[member]

					continue

				else if member.substr(0, 12) is '__quitterFor'

					classReference.__mixinQuitters.push mixin::[member]

					continue

				unless Object.getOwnPropertyDescriptor classProto, member

					desc = Object.getOwnPropertyDescriptor mixin::, member

					Object.defineProperty classProto, member, desc

		classReference

	global.getLazyValue = (val) ->

		if val._isLazy? and val._isLazy

			return do val

		else

			return val

	global.getLazyValues = (ar) ->

		getLazyValue item for item in ar

	global.returnLazily = (fn) ->

		->

			args = arguments

			ret = =>

				fn.apply @, args

			ret._isLazy = yes

			ret

	global.acceptLazyArgs = (fn) ->

		->

			args = getLazyValues arguments

			fn.apply @, args

	global.acceptAndReturnLazily = (fn) ->

		returnLazily acceptLazyArgs fn

	null