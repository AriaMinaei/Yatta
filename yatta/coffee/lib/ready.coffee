define [
	'./display', './el/rectangle', './el/ellipse', './el/type', './el/image', './el/container', './math', './tools'
	], (display, Rectangle, Ellipse, Type, Image, Container, math, tools) ->

	window.display = display

	window.Rectangle = Rectangle

	window.Ellipse = Ellipse

	window.Container = Container

	window.Type = Type

	window.Image = Image

	for key of math

		window[key] = math[key]

	window.wait = tools.wait
	window.count = tools.count
	window.onFrame = tools.onFrame
	window.centerX = tools.centerX
	window.centerY = tools.centerY