var mongodb = require('../models/index');
var moment = require('moment');

//mongodb.connect(function(db){

	// mongodb.findOne('manager',{},db,function(err,docs){
	// 	if(err) console.log(err);
	// 	console.log(docs);
	// });
	// mongodb.insert('manager',{managerName:'kelin',password:'kelinkelin',createTime:new Date().getTime(),version: 1},db,function(err,data){
	// 	console.log(data);
	// });
	// var oldObj = { managerName: 'kelin' };
	// var newObj = { managerName: 'keina' };
	// mongodb.updateOne('manager',oldObj,newObj,db,function(err,result){
	// 	console.log(result);
	// })
//});
// mongodb.connect(function(db){
// 		console.log("ahahhah");
// 		mongodb.findOne('blog',{_id: '58e9d1b1340f2d03c07a32a9'},db,function(err,doc){
// 			console.log("doc",doc);
// 			if(err) throw err;
// 		});
// 	});
// mongodb.connect(function(db){
// 		mongodb.deleteOneById('blog','58e9d233277b190448b7e92b',db,function(err,result){
// 			if(err)  throw err;
// 			if(result){
// 				mongodb.findAll('blog',db,function(err,docs){
// 					if(err) throw err;
// 					console.log("docs"+docs);
// 					res.send(docs);
// 				});
// 			}
// 		});
		
// 	});
// mongodb.connect(function(db){
// 		var id = '58ec3aa8bcc21b10e4621d50';
// 		var newObj = {
// 			title: 't1234567890-=',
// 			author: 'body.titlegfdsgdsfdgf',
// 			content: 'body.content4444444444444444444444',
// 			modifyDate: moment().format("YYYY-MM-DD,h:mm:ss")
// 		}
// 		mongodb.updateOneById('blog',id,newObj,db,function(err,result){
// 			if(err) throw err;
			
// 			console.log(result);
// 		})
// 	})
// console.log(moment().format('MMMM Do YYYY, h:mm:ss'));
// console.log(moment().format('dddd'));
// console.log(moment().format("YYYY-MM-DD,h:mm:ss"));
// mongodb.connect(function(db){
// 		mongodb.countAll('blog',db,function(err,count){
// 			if(err) { console.log(err) }
// 			console.log(count);
// 		});
// 	});

mongodb.connect(function (db) {
	mongodb.findPage('blog',db,2,10,function(err,docs){
		console.log(docs);
	});
});

