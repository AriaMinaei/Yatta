define [
	'../el/el'
	'../el/rectangle'
	'../el/ellipse'
	'../el/type'
	'../el/image'
	'../el/container'
	'../el/cube'
	'../el/display'
	'../el/camera'
	'../el/_axis'
	'../el/audier'
	], (El, Rectangle, Ellipse, Type, Image, Container, Cube, Display, Camera, _Axis, Audier) ->

	display = new Display document.body

	window.El = El
	window.Rectangle = Rectangle
	window.Ellipse = Ellipse
	window.Type = Type
	window.Image = Image
	window.Container = Container
	window.Cube = Cube
	window._Axis = _Axis
	window.display = display
	window.Camera = Camera
	window.Audier = Audier
