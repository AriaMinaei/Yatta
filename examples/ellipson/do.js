// Set background color in RGB
display.fill.withRgb(200, 195, 190)
display.enableTransition(500);

// Number of circles
var count = 19;

// Center of the screen
var cX = centerX();
var cY = centerY();

var radius = 250;

var makeCircle = function(i){

	var animDuration = rand(400, 800)

	var c1 = new Ellipse(40, 40);

	c1.fill.withRgb(220, 190, 120).rotateHue(5 * i)

	c1
	.setScaleAll(0.75)
	.setMovementX(radius * cos(PI * 2 / count * i) + cX)
	.setMovementY(radius * sin(PI * 2 / count * i) + cY)
	.z(10)
	.ease('cubic.easeOut')
	.enableTransition(animDuration);

	var c2 = c1.clone();
	c2.fill.lighten(10);

	c2.setScaleAll(0.5)
	.z(9)
	.enableTransition(animDuration + 200);

	var c3 = c1.clone();

	c3.fill.lighten(20);

	c3.setScaleAll(0.3)
	.z(8)
	.enableTransition(animDuration + 400);


	every(1000, function(){

		i += 1.5;


		c1
		// .rotateHue(50 * i)
		.setMovementX(radius * cos(PI * 2 / count * i) + cX)
		.setMovementY(radius * sin(PI * 2 / count * i) + cY);


		c2
		// .rotateHue(50 * i)
		.setMovementX((radius + param('C2 Radius', 11)) * cos(PI * 2 / count * i - param('C2 i', 0.07)) + cX)
		.setMovementY((radius + param('C2 Radius', 11)) * sin(PI * 2 / count * i - param('C2 i', 0.07)) + cY);

		c3
		// .rotateHue(50 * i)
		.setMovementX((radius + param('c3 Radius', 18)) * cos(PI * 2 / count * i - param('c3 i', 0.12)) + cX)
		.setMovementY((radius + param('c3 Radius', 18)) * sin(PI * 2 / count * i - param('c3 i', 0.12)) + cY);
	});
}

// Make the circles
for (i = 0; i < count; i++) {
	makeCircle(i);
}

every(1000, function(){
	radius += rand(-100, 100)
})