// Crafts a lacing (series of function sets) using currying.
// initial is the first function in the lacing.
var craft = function(initial){
	var lacing = [[initial]]; // Contains a series of all of the function sets, starting with the set of one initial function.
	var index = 0; // Used to determine where the execution is in the lacing.
	
	var lace = craft; // A local created for each function in the lacing. 
	lace.outer = lacer; // Reference the outer scope
	
	// Executes the first function in the next function set in the lacing.
	lace.next = function(){
		// Set the exported variable (lacer) to the internal local (lace)
		lacer = lace;
		// Invoke the next function in the set
		lacing[index++][0].apply(this, arguments);
		// Set lacer back to the outer scope
		lacer = lace.outer;
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
	setTimeout(lace.next, 0);
	
	// craft returns the add function for currying more function sets into the lacing.
	return add;
}

// lacer is the exported variable, initially set to the craft function.
// lacer will be recursively set to a internal local within the craft function (lace) during the lacing execution.
var lacer = craft;

module.exports = lacer;