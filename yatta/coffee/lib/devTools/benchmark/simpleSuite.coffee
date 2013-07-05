define ['../../../../requirements/benchmark'], (Benchmark) ->

	# To quickly benchmark different possible approaches on stuff
	suite = new Benchmark.Suite

	suite.on 'cycle', (e) ->

		console.log String e.target

	suite.on 'complete', ->

		console.groupEnd 'Running benchmarks'

		console.log 'Fastest:',  @filter('fastest').pluck('name')[0]

	suite.on 'start', ->

		console.group 'Warming up'

		suite.forEach (benchmark) ->

			for i in [0..40]

				do benchmark.fn

			console.log "Done: #{benchmark.name}"

		console.groupEnd 'Warming up'

		console.group 'Running benchmarks'

	window.run = ->

		suite.run

			async: true

		return null

	suite