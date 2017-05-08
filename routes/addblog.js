var router = require('express').Router();
var moment = require('moment');


var mongodb = require('../models/index');

exports.add = router.post('/',function(req,res,next){
	var body = req.body;
	var obj = {
		title: body.title,
		author: body.author,
		content: body.content,
		date: moment().format("YYYY-MM-DD,h:mm:ss"),
		zanNum: 0
	}
	console.log('aaaa');
	mongodb.connect(function(db){
		mongodb.insertOne('blog',obj,db,function(err,r){
			console.log('aaaaa');
			if(err) throw err;
			console.log('data'+r);
			res.redirect('/admin');
		});
	});
});

exports.findAll = router.get('/',function(req,res,next){
	var blogList = null;
	mongodb.connect(function(db){
		mongodb.findAll('blog',db,function(err,docs){
			if(err) throw err;
			res.send(docs);
		});
	});
});

exports.findOne = router.get('/',function(req,res,next){
	var _id = req.query.id;
	console.log(_id);
	console.log("ahahhahppppp");
	mongodb.connect(function(db){
		console.log("ahahhah");
		mongodb.findOne('blog',{_id: _id},db,function(err,doc){
			console.log("doc",doc);
			if(err) throw err;
			res.send(doc);
		});
	});
});

exports.aaaa = router.get('/',function(req,res,next){
	console.log(req.body);
});