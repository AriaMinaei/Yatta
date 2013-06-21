if typeof define isnt 'function' then define = require('amdefine')(module)


# Little helper for mixins from CoffeeScript FAQ,
# courtesy of Sethaurus (http://github.com/sethaurus)
define implementing = (mixins..., classReference) ->

  for mixin in mixins

    for key, value of mixin::

      classReference::[key] = value

  classReference