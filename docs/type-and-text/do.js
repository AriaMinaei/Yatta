// This is how you put text in your work:
t = new Type('yatta');

// Types are actually elements, so:
t.setMovement(display.centerX - 90, display.centerY - 40, 0)
.rotateY(rad(-180))
.wait(500).enableTransition(300).rotateY(rad(360+180));

// And these methods are available to types, just like
// all other elements:
t.setFace('"HelveticaNeueLT Std Bold", Helvetica, Arial')
.setSize(70)
.setColor(255, 255, 255);

// You can of course, change the content of a type:
t.setText('YATTA!');

// Each letter in a type is actually an element of its own, which
// means types are just containers of a few letters:
t.each(function(letter, i){
	letter.enableTransition(200).wait(500).moveY(rand(-8, 8))
});

// As expected, each() supports chaining too:
t.each()
.setColor(
	_rand(180, 250), _rand(180, 250), _rand(180, 250)
);