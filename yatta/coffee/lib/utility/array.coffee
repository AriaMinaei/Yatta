if typeof define isnt 'function' then define = require('amdefine')(module)

define ['./_common'], (common) -> {

	_clone: common._cloneArray.bind common

	clone: (what) ->

		throw Error("`what` isn\'t an array.") unless Array.isArray what

		@_clone.apply @, arguments

	###
	Tries to turn anything into an array.
	###
	from: (r) ->

		Array::slice.call r

	###
	Clone of an array. Properties will be shallow copies.
	###
	simpleClone: (a) ->

		a.slice 0

	pluck: (a, i) ->

		for value, index in a

			if index > i

				a[index - 1] = a[index]

		a.length = a.length - 1

		a

	pluckItem: (a, item) ->

		i = a.indexOf item

		if i isnt -1

			@pluck a, i

		a

	pluckMultiple: (array, indexesToRemove) ->

		removedSoFar = 0

		indexesToRemove.sort()

		for i in indexesToRemove

			@pluck array, i - removedSoFar

			removedSoFar++

		array

}