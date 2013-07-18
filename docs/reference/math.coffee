PI
floor
ceil
round
abs
cos
acos
sin
asin
tan
atan
pow
sqrt
random
rand(from, to, returnInteger = yes)
log
rad # Degrees to radians
deg # Radians to degrees

backAndForth # Example:
backAndForth 1, 5 # => 1
backAndForth 2, 5 # => 2
backAndForth 3, 5 # => 3
backAndForth 4, 5 # => 4
backAndForth 5, 5 # => 5
backAndForth 6, 5 # => 4
backAndForth 7, 5 # => 3
backAndForth 8, 5 # => 2
backAndForth 9, 5 # => 1
backAndForth 10, 5 # => 0
backAndForth 11, 5 # => 1
backAndForth 12, 5 # => 2

# All of these functions return instantly. For them to return lazily, prepend with '_':
_rand(10, 20)