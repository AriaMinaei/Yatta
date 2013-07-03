define [
	'../el/el'
	'../el/rectangle'
	'../el/ellipse'
	'../el/type'
	'../el/image'
	'../el/container'
	], (El, Rectangle, Ellipse, Type, Image, Container) ->

	window.display = new El document.body

	window.Rectangle = Rectangle
	window.Ellipse = Ellipse
	window.Container = Container
	window.Type = Type
	window.Image = Image
	window.display = display