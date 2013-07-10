define(['./benchmark/simpleSuite', '../utility/array'], function(suite, array) {
  var ifffi, mahyar;

  mahyar = function(num, whole) {
    return (
			whole *
			(
				floor(num / whole) % 2
			)
		) +
		(
			(num % whole) *

			(
				-1 *
				(
					2 *
					(
						floor(num/whole) % 2
					) - 1
				)
			)
		);
  };
  ifffi = function(num, whole) {
    
		var f = (floor(num/whole) % 2);
		return (whole * f) + (-2 * f + 1) * (num % whole);;
  };
  console.log(mahyar(1, 5), ifffi(1, 5));
  console.log(mahyar(2, 5), ifffi(2, 5));
  console.log(mahyar(5, 5), ifffi(5, 5));
  console.log(mahyar(11, 5), ifffi(11, 5));
  console.log(mahyar(6, 5), ifffi(6, 5));
  suite.add('mahyar', function() {
    for(var i = 0; i < 10000; i++){
			mahyar(i, 3000);
		};
  });
  return suite.add('ifffi', function() {
    for(var i = 0; i < 10000; i++){
			ifffi(i, 3000);
		};
  });
});
