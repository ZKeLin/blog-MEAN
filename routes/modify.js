var router = require('express').Router();
var moment = require('moment');

var mongodb = require('../models/index');


router.post('/',function(req,res,next){
	var body = req.body;
	console.log(body);
	mongodb.connect(function(db){
		var id = req.query.id;
		var newObj = {
			title: body.title,
			author: body.author,
			content: body.content,
			date: moment().format("YYYY-MM-DD,h:mm:ss")
		}
		mongodb.updateOneById('blog',id,newObj,db,function(err,result){
			if(err) console.log('err',err);
			res.send('修改成功');
			//res.send('修改成功');
		});
	});
});


module.exports = router;