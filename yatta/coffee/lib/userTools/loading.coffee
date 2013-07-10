define ->

	loading = {}

	loading.load = (items, cb) ->

		loaded = 0

		toLoad = items.length

		loadedCb = ->

			loaded++

			if loaded is toLoad

				do cb

		for item in items

			loadImg item, loadedCb

		return

	loading.loadWithIndicator = (items, cb) ->

		loading.load items, ->

			indicator.quit()
			do cb

		indicator = new Type 'LOADING'

		indicator.setFace '"HelveticaNeueLT Std Thin", Helvetica, Arial'

		indicator.moveX display.centerX - 60
		indicator.moveY display.centerY - 20

		indicator
		.setOpacity(0.5)
		.setScaleAll(0.95)
		.enableTransition(900)
		.setOpacity(1)
		.setScaleAll(1)
		.every(2500)
		.setOpacity(0.5)
		.setScaleAll(0.95)
		.wait(900)
		.setOpacity(1)
		.setScaleAll(1)

		return



	loadImg = (addr, cb) ->

		img = document.createElement 'img'
		img.src = addr

		img.addEventListener 'load', ->

			do cb

	loading