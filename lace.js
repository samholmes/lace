// Function extends a base object with properties from term
var extend = function(base, term){
	for (var property in term)
	{
		base[property] = term[property];
	}
}
// Function remove properties in a base object if present in term
var contract = function(base, term){
	for (var property in term)
	{
		if (base[property] === term[property])
			delete base[property];
	}
}
// Function returns properties in base object
var extract = function(base){
	var result = {};
	for (var property in base)
	{
		// console.log(property, ':', this[property])
		result[property] = base[property];
	}
	return result;
}


// Crafts a lacing (series of function sets) using currying.
// initial is the first function in the lacing.
var craft = function(initial){
	var lacing = []; // Contains a series of all of the function sets
	var index = 0; // Used to determine where the execution is in the lacing.
	
	// Helper is a local created for each lacing.
	// It provides controls during the lacing invocation.
	var helper = {
		// Executes the first function in the next function set in the lacing.
		next: function(){
			// Extract and cache the current lace
			var oldLace = extract(lace);
			// Give lace the properties of the local helper
			extend(lace, helper);
			// Invoke the next function in the set
			lacing[index++][0].apply(this, arguments);
			// Remove the properties of the local helper from lace
			contract(lace, helper);
			// Give lace it's previous properties
			extend(lace, oldLace);
		},
		 // Reference the outer scope.
		outer: extract(lace)
	};
	
	
	// Adds a set of functions to the lacing.
	function add(){
		// Push arguments (functions) into lacing as an array.
		lacing.push(Array.prototype.slice.call(arguments));
		// Return itself to continue currying recursivelly.
		return add;
	}
	
	
	// setTimeout is used to let the outer scope finish execution before the initial function is invoked.
	// This lets the other function sets curry into the lacing before the initial function is called.
	// This is all possible because setTimeout is asynchronous and JS has only one thread of execution, thus can only process one function at a time.
	setTimeout(helper.next, 0);
	
	// Add the initial function as the first function set in the lacing.
	add(initial);
	// craft returns the add function for currying more function sets into the lacing.
	return add;
}

// lace is the exported variable, initially set to the craft function.
// lace will be recursively set to a internal local within the craft function (lace) during the lacing execution.
var lace = craft;

module.exports = lace;