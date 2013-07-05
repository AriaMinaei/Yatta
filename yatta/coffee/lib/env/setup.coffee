define [
	'../visuals/animation/frames'
	'../el/tools/css/color'
	'../utility/generals'
	], (frames, CSSColor) ->

	window.CSSColor = CSSColor

	do frames.start

	window.frames = frames

	null