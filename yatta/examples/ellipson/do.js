// Set background color in RGB
display.setBgColor(100, 200, 200);

// Number of circles
var count = 20;

// Center of the screen
var cX = centerX();
var cY = centerY();

var radius = 250;

// Makes pnme
var makeCircle = function(i){
	// Make a new Ellipse(width, height)
	var c1 = new Ellipse(40, 40);

	// Fill it with a random RGB color
	c1.fillWith(190, rand(100, 200), rand(90, 240));

	// Put it around a circle
	c1.setMovementX(radius * cos(PI * 2 / count * i) + cX);
	c1.setMovementY(radius * sin(PI * 2 / count * i) + cY);

	// Everything done to this element from now on, will be animated.
	c1.enableAnimation(rand(300, 1000))

	// After 1000 milliseconds:
	wait(1000, function(){

		var newI = i + floor(count / 3);

		// Put it around another circle
		c1.setMovementX(radius * cos(PI * 2 / count * newI) + cX);
		c1.setMovementY(radius * sin(PI * 2 / count * newI) + cY);

		// Change its color
		c1.fillWith(rand(50, 150), rand(150, 250), rand(90, 240));

		// Get a clone
		var c2 = c1.clone();
		c2.setMovementX((radius - 40) * cos(PI * 2 / count * i + 2) + cX);
		c2.setMovementY((radius - 40) * sin(PI * 2 / count * i + 2) + cY);
		c2.setScaleAll(0.5);

		// Another clone
		var c3 = c1.clone();
		c3.setMovementX((radius + 40) * cos(PI * 2 / count * i + 2) + cX);
		c3.setMovementY((radius + 40) * sin(PI * 2 / count * i + 2) + cY);
		c3.setScaleAll(0.5);

	});
}

// Make the circles
for (i = 0; i <= count; i++) {
	makeCircle(i);
}

// Change BG color in one second
wait(1000, function(){
	display.setBgColor(150, 150, 150);
});