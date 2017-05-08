var router = require('express').Router();

var mongodb = require('../models/index');

router.get('/',function(req,res){
	var id = req.query.id;
	mongodb.connect(function(db){
		mongodb.findOneById('blog',id,db,function(err,doc){
			//console.log(id);
			if(err) throw err;
			console.log(doc.zanNum);
			res.send(doc.zanNum);
		});
	});
});

module.exports = router;