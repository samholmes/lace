var lace = require('..')
	, test = require("testling")
	, foo = { foo: "bar" }

test('big ass chain', function (t) {

	lace
	(function(){
		lace.next(1, 2, 3);
	})
	(function(){
		t.deepEqual([1,2,3], arguments)
		lace.next.call(foo, 4, 5, 6);
	})
	(function(){
		t.equal(this, foo)
		t.deepEqual([4,5,6], arguments)
		
		lace
		(function(){
			lace.next(123);
		})
		(function(n){
			t.equal(n, 123)
			lace.next.call({foo:'bar'}, 456);
		})
		(function(m){
			t.equal(this.foo, 'bar')
			t.equal(m, 456)
			lace.outer.next('SUCCESS!!!');
		})
	})
	(function(test){
		t.equal(test, 'SUCCESS!!!')
		t.end()
	})
})