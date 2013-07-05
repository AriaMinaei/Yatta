define ->

	tools = {}

	# As long as chrome hasn't implemented DirectWrite, text won't look
	# its best on windows. This function will tell you if you need to
	# apply a -webkit-text-stroke to make text look a bit smoother on
	# chrome/win.
	tools.needsTextStroke = do ->

		_needsTextStroke = null

		->

			if _needsTextStroke is null

				if navigator.appVersion.indexOf('Chrome') isnt -1 and navigator.appVersion.indexOf('Windows') isnt -1

					_needsTextStroke = yes

				else

					_needsTextStroke = no

			_needsTextStroke

	tools