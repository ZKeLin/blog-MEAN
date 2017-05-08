var router = require('express').Router();

var mongodb = require('../models/index');

router.get('/',function(req,res){
	var zan = parseInt(req.query.zanNum);
	var id = req.query.id;
	var newObj = { $set:{zanNum:zan}}
	console.log('req.query',req.query);
	mongodb.connect(function(db){
		mongodb.update('blog',id,newObj,db,function(err,data){
			if(data) console.log('hfdsajfdsh',zan,id);
			res.send('keyi');
		});
	});
});

module.exports = router;