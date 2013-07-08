define [
	'../el/el'
	'../el/rectangle'
	'../el/ellipse'
	'../el/type'
	'../el/image'
	'../el/container'
	'../el/cube'
	'../el/display'
	], (El, Rectangle, Ellipse, Type, Image, Container, Cube, Display) ->

	display = new Display document.body

	window.Rectangle = Rectangle
	window.Ellipse = Ellipse
	window.Type = Type
	window.Image = Image
	window.Container = Container
	window.Cube = Cube
	window.display = display