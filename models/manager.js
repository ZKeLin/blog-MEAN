var connect = require('index.js');

connect(function(db){
	var collection = db.collection('manager');
	collection.find({'managerName':'kelin'}).toArry(function(err,docs){
		if(err) console.log(err);
		console.log(docs);
	})
})