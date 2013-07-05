define [
	'./el/el'
	'./el/rectangle'
	'./el/ellipse'
	'./el/type'
	'./el/image'
	'./el/container'
	'./math'
	'./tools'
	'./tools/param'
	], (El, Rectangle, Ellipse, Type, Image, Container, math, tools, Param) ->

	window.display = new El document.body

	window.Rectangle = Rectangle

	window.Ellipse = Ellipse

	window.Container = Container

	window.Type = Type

	window.Image = Image

	for key of math

		window[key] = math[key]

	window.wait = tools.wait
	window.every = tools.every
	window.count = tools.count
	window.onFrame = tools.onFrame
	window.centerX = tools.centerX
	window.centerY = tools.centerY

	p = new Param

	window.param = ->

		p.param.apply p, arguments

	window._param = returnLazily ->

		p.param.apply p, arguments