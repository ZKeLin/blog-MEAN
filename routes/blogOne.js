var express = require('express');
var router = express.Router();

var mongodb = require('../models/index')
/* GET home page. */
router.get('/',function(req,res,next){
	var _id = req.query.id;
	console.log("id:",req.originalUrl,_id);
	//console.log("ahahhahppppp");
	mongodb.connect(function(db){
		console.log("ahahhah");
		mongodb.findOneById('blog',_id,db,function(err,doc){
			console.log("doc",doc);
			if(err) throw err;
			res.send(doc);
		});
	});
});

module.exports = router;
