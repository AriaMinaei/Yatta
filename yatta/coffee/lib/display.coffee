define ['./tools'], (tools) ->

	body = document.body

	display = 

		setBgColor: (r, g, b) ->

			tools.setBgColor body, r, g, b