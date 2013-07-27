// Let's start with a simple element:
s = new Ellipse(40);

s.fill.withRgb(rand(150, 230), rand(150, 230), rand(150, 230));
s.trans(500);


// ... and set some variables
r = 260;
cX = display.centerX;
cY = display.centerY;
i = 0;
steps = 30;

// Put the ellpise on a circle's perimeter:
s
.moveXTo(cX + (r * cos(PI * i * 2 / steps)))
.moveYTo(cY + (r * sin(PI * i * 2 / steps)));


// wait 500 milliseconds: (setTimeout() equivalent)
wait(500, function(){

	// and then every 200 milliseconds:
	every(200, function(){

		i++;

		s.fill.rotateHue(10);

		v = rand(15, 29);

		// Clone the ellipse and change its color:
		var clone = s.clone();
		clone
		.trans(350)
		.ease('linear')
		.everyAndNow(350)
		// ... move the clone away from the circle:
		.moveX((v * cos(PI * 2 * i / steps)))
		.moveY((v * sin(PI * 2 * i / steps)))
		// ... and lower its opacity:
		.adjustOpacity(-0.1);

		// Since we're gonna have too many clones in the screen,
		// we should quit the ones that aren't visible anymore:
		clone.wait(7000).quit();


		// As for the original ellipse itself, let's just move
		// it around the circle's perimeter:
		s
		.moveXTo(cX + (r * cos(PI * 2 * i / steps)))
		.moveYTo(cY + (r * sin(PI * 2 * i / steps)))
	});
});

display
.trans(20000)
.ease('linear')
.everyAndNow(20000).rotateZ(-PI * 2)