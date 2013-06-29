define [
	'../visuals/animation/frames'
	'../utility/generals'
	], (frames) ->

	do frames.start

	window.frames = frames

	null