// Set background color in RGB
display.enableAnimation(300).fillWith(100, 200, 200).go3d();

// Number of circles
var count = 20;

// Center of the screen
var cX = centerX();
var cY = centerY();

var radius = 250;

var container = new Container

// Makes pnme
var makeCircle = function(i){
	// Make a new Ellipse(width, height)
	var c1 = new Ellipse(40, 40);

	c1.putIn(container);

	c1.setScaleAll(0.75);

	// Fill it with a random RGB color
	c1.fillWith(190, rand(100, 200), rand(90, 240));

	// Put it around a circle
	c1.setMovementX(radius * cos(PI * 2 / count * i) + cX);
	c1.setMovementY(radius * sin(PI * 2 / count * i) + cY);

	var animDuration = rand(300, 1000)

	// Everything done to this element from now on, will be animated.
	c1.enableAnimation(animDuration);

	// var c2 = c1.clone();
	// c2.setScaleAll(0.5)
	// .setSaturation(90)
	// .enableAnimation(animDuration);

	var c3 = c1.clone();
	c3.setScaleAll(0.35)
	.setSaturation(80)
	.enableAnimation(animDuration);

	// Every 1000 milliseconds:
	every(1000, function(){

		i += 1 //floor(count / 4);

		c1.setMovementX(radius * cos(PI * 2 / count * i) + cX);
		c1.setMovementY(radius * sin(PI * 2 / count * i) + cY);


		// c2
		// .setMovementX((radius + 10) * cos(PI * 2 / count * i - 0.04) + cX)
		// .setMovementY((radius + 10) * sin(PI * 2 / count * i - 0.04) + cY);


		c3
		.setMovementX((radius + param('C3 Radius', 15)) * cos(PI * 2 / count * i + param('C3 i', -0.09)) + cX)
		.setMovementY((radius + param('C3 Radius', 15)) * sin(PI * 2 / count * i + param('C3 i', -0.09)) + cY);


	});
}

// Make the circles
for (i = 0; i < count; i++) {
	makeCircle(i);
}

// Change BG color in one second
wait(2000, function(){
	display
	.fillWith(200, 195, 190)
	// .enableAnimation(10000)
	// .setPerspective(400)
	// .rotateY(rad(170))
});