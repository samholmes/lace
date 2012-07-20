// Crafts a lacing (series of function sets) using currying.
// initial is the first function in the lacing.
var craft = function(initial){
	var lacing = []; // Contains a series of all of the function sets
	var index = 0; // Used to determine where the execution is in the lacing.
	
	lace.outer = lace.helper; // Reference the outer scope.
	
	// Helper is a local created for each lacing.
	// It provides controls during the lacing invocation.
	var helper = {
		// Executes the first function in the next function set in the lacing.
		next: function(){
			// Set the exported variable (lace) to the internal local (lace)
			lace.helper = helper;
			// Invoke the next function in the set
			lacing[index++][0].apply(this, arguments);
			// Set lace back to the outer scope
			lace.helper = lace.outer;
		}
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

// To be used. Meant to merge helper properties directly into lace, so you can access lace.helper.next with lace.next
// lace.merge = function(obj){
// 	for (var property in obj)
// 	{
// 		this[property] = obj[property];
// 	}
// }

module.exports = lace;