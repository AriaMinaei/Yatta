el = new Cube 300, 200, 50

el.onClick().moveX(_rand(10, 20))
el.onClick ->

	@moveX rand(10, 20)

el.onMouseOver().moveX(_rand(10, 20))
el.onMouseOver ->

	@moveX rand(10, 20)

el.onMouseOut().moveX(_rand(10, 20))
el.onMouseOut ->

	@moveX rand(10, 20)

el.wait(200).moveX(_rand(10, 20))
el.wait 200, ->

	@moveX rand(10, 20)

el.every(200).moveX(_rand(10, 20))
el.every 200, (cancel) ->

	@moveX rand(10, 20)

	if true then cancel()

el.everyAndNow(200).moveX(_rand(10, 20))
el.everyAndNow 200, (cancel) ->

	@moveX rand(10, 20)

	if true then cancel()

el.immediately().moveX(_rand(10, 20))
el.immediately ->

	@moveX rand(10, 20)

el.eachFrame().moveX(1)
el.eachFrame (t, cancel) ->

	@moveXTo t * 100

	if t > 200

		cancel()

el.wait(200).moveX(300).run ->

	console.log 'working!'