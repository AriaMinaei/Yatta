// Set background color in RGB
display.fillWith(200, 195, 190).enableAnimation(500);

// Number of circles
var count = 19;

// Center of the screen
var cX = centerX();
var cY = centerY();

var radius = 250;

var makeCircle = function(i){

	var animDuration = rand(400, 1200)

	var c1 = new Ellipse(40, 40);

	c1
	.setScaleAll(0.75)
	.fillWith(190, 120, 240)
	.rotateHue(50 * i)
	.setMovementX(radius * cos(PI * 2 / count * i) + cX)
	.setMovementY(radius * sin(PI * 2 / count * i) + cY)
	.z(10)
	.enableAnimation(animDuration);

	var c2 = c1.clone();

	c2.setScaleAll(0.5)
	.setSaturation(80)
	.z(9)
	.enableAnimation(animDuration + 200);

	var c3 = c1.clone();

	c3.setScaleAll(0.3)
	.setSaturation(70)
	.ease('ease-out')
	.z(8)
	.enableAnimation(animDuration + 400);


	every(900, function(){

		i += 1.5;


		c1
		.rotateHue(50 * i)
		.setMovementX(radius * cos(PI * 2 / count * i) + cX)
		.setMovementY(radius * sin(PI * 2 / count * i) + cY);


		c2
		.rotateHue(50 * i)
		.setMovementX((radius + param('C2 Radius', 11)) * cos(PI * 2 / count * i - param('C2 i', 0.07)) + cX)
		.setMovementY((radius + param('C2 Radius', 11)) * sin(PI * 2 / count * i - param('C2 i', 0.07)) + cY);

		c3
		.rotateHue(50 * i)
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