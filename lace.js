// Exports the lace object
// initial is the first function in the series
var lace = function(initial){
	var series = []; // Contains all of the function sets in the series
	var thread = {}; // A local created for each lace operation. 
	
	// Adds a set of functions to the series
	function add(){
		series.push(Array.prototype.slice.call(arguments));
		return add;
	}
	
	
	
	// setTimeout is used to let the outer scope finish execution before the initial function is invoked.
	// This lets the other function sets curry into the series before the initial function is called.
	// This is all possible because setTimeout is asynchronous and JS has only one thread of execution, thus can only process one function at a time.
	setTimeout(function(){
		lace = {};
		initial.call();
	}, 0);
	
	// Return the add function for currying more function sets into the series
	return add;
}

module.exports = lace;




var yarn = function(initial) {
	var clew = []; // clew is a series of sets of functions [[f, ...], ...]
	function next(i, clewIndex){
		i = i || 0;
		return function(){ clew[clewIndex][i].apply(makeNext(clewIndex+1), arguments); };
	}
	function makeNext(clewIndex){
		var f = function(i){ return next(i, clewIndex); };
		f.error = function(){ if (clew.error) clew.error.apply(null, arguments); };
		return f;
	}
	function add(){
		clew.push(Array.prototype.slice.call(arguments));
		return add;
	}
	add.error = function(cb){
		clew.error = cb;
	};
	
	setTimeout(function(){ initial.call(makeNext(0)); }, 0);
	return add;
};

if (module)
	module.exports = yarn;