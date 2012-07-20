var lace = require('../lace.js');

function log(){
	console.log('');
	console.log.apply(console, arguments);
	console.log('');
}

log('before lace');

lace
(function(){
	log('initial');
	lace.next(1, 2, 3);
})
(function(){
	log('passed arguments: ', arguments);
	lace.next.call({foo:'bar'}, 4, 5, 6);
})
(function(){
	log('context and arguments: ', this, arguments);
	
	log('before inner lace');
	lace
	(function(){
		log('inner initial');
		lace.next(123);
	})
	(function(){
		log('inner passed arguments', arguments);
		lace.next.call({foo:'bar'}, 456);
	})
	(function(){
		log('inner context and arguments: ', this, arguments);
		lace.outer.next('SUCESS!!!');
	})
	log('after inner lace');
})
(function(test){
	log('back to outer: ', test);
})

log('after lace');