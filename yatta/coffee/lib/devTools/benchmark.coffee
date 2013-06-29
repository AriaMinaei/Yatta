define ['./benchmark/simpleSuite', '../utility/array'], (suite, array) ->



	before = Date.now()
	cb = (t) ->

		console.log Date.now() - before

	frames.nextTick cb
	frames.nextTick cb
	frames.nextTick cb

	suite.add 'splice', ->

		do sp

		null

	suite.add 'injectInIndex', ->

		do injectInIndex

		null