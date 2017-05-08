var router = require('express').Router();

var mongodb = require('../models/index');

router.get('/',function(req,res,next){
	mongodb.connect(function(db){
		var page = req.query.page;
		mongodb.findPage('blog',db,page,10,function(err,docs){
			console.log(docs);
			res.send(docs);
		});
	})
});

module.exports = router;