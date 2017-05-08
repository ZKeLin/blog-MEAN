var router = require('express').Router();

var mongodb = require('../models/index');
router.get('/',function(req,res,next){
	var isresult = null;
	mongodb.connect(function(db){
		mongodb.deleteOneById('blog',req.query.id,db,function(err,result){
			if(err)  throw err;
			if(result){
				isresult = result;
			}
		});
	});
	setTimeout(function() {
		if(isresult){
			mongodb.connect(function(db){
				mongodb.findAll('blog',db,function(err,docs){
					if(err) throw err;
					res.send(docs);
				});
			});
		}
	}, 1000);
	
	
});

module.exports = router;