# lace

Lace is a control flow library that doesn't get in your way. Here's how it works:

	// Require the lib
	var lace = require('lace');

	// Call lace. Create a lacing (series of functions).
	lace
	(function(){
		// Within each of these functions are some helpers contained in the lace global.
		lace.next(); // This calls the next function in the series.
	}) // Lace uses currying to create the lacing.
	(function(){
		// Helpers are also available here.
		// All arguments are directly from the invocation of the previous lace.next (no appending or prepending of helper arguments).
		// The `this` context will be what lace.next was applied to.
		
		// Inner lacings are supported
		lace
		(function(){
			// Helpers will reference the inner lacing
			lace.next();
		})
		(function(){
			// Access to the outer lace helper is done through the lace.outer helper property
			lace.outer.next();
		});
	})
	(function(){
		// This was called from the lace.outer.next.
		// Everything should just work, without getting in your way.
	});

Lace is all about asynchronous control flow. You can pass lace.next to asynchronous function such as setTimout, database query callbacks, etc.

Another thing to keep in mind, is that the first function is called asynchronously:

	console.log('A');
	
	lace
	(function(){
		console.log('C');
	})
	
	console.log('B')
	
	// Will output A B C


## Terminology

### Lace

Library name. Global exported object and helper.

### Lacing

The lacing is the series of functions or function sets. A lacing function is one of the "steps" in the control flow.