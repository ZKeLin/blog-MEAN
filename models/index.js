var mongodb = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

var encryption = require('../controller/encrypt').encryption;
//数据库连接地址
var url = 'mongodb://127.0.0.1:27017/blog';
//数据库连接

exports.connect = function(cb){
	mongodb.connect(url,function(err,db){
		if(err){
			console.log('err is ' + err);
		}else{
			console.log('db connect success');
			cb(db);
			//console.log("index"+db);
		}
	});
}
/*
* collectionName 要插入到collection的名字  String 
* obj 要插入的对象  object 注意密码字段必须是password 不然没法加密,一个大坑
* db 连接数据库成功后的对象
* cb 回调函数 
* Updates an existing document or inserts a new document, depending on its document parameter
**/
exports.save = function(collectionName,obj,db,cb){
	var collection = db.collection(collectionName);
	//加密
	if(obj.password){
		obj.password = encryption(obj.password);
	}
	var cb = cb || function(){};
	collection.save(obj,cb);
	db.close();
}
/*
* collectionName 要插入到collection的名字  String 
* obj 要插入的对象 
* db 连接数据库成功后的对象
* cb 回调函数 
**/
exports.insertOne = function(collectionName,obj,db,cb){
	var collection = db.collection(collectionName);
	//var cb = function(){} || cb;
	collection.insertOne(obj,cb);
	db.close();
}
/*
* collectionName 要插入到collection的名字  String 
* obj 要插入的对象 
* db 连接数据库成功后的对象
* cb 回调函数 
**/
exports.insertOneById = function(collectionName,obj,db,cb){
	var collection = db.collection(collectionName);
	//var cb = function(){} || cb;
	var newObj = {};
	for(var key in obj){
		if(key == '_id'){
			newObj[key] = new ObjectID(obj[key]);
		}
		newObj[key] = obj[key];
	}
	console.log(newObj);
	collection.insertOne(newObj,cb);
	db.close();
}
/*
* collectionName 要查找到collection的名字  String 
* obj 要查找的对象  
* db 连接数据库成功后的对象
* cb 回调函数 function(err,doc){}
**/
exports.findOne = function(collectionName,obj,db,cb){
	var collection = db.collection(collectionName);
	collection.findOne(obj,cb);
	db.close();
}
/*
* collectionName 要查找到collection的名字  String 
* id 要查找的id 
* db 连接数据库成功后的对象
* cb 回调函数 function(err,doc){}
**/
exports.findOneById = function(collectionName,id,db,cb){
	var collection = db.collection(collectionName);
	console.log('id',id);
	var objectId = new ObjectID(id);
	var obj = { _id: objectId };
	collection.findOne(obj,cb);
	db.close();
}
/*
* collectionName 要查找到collection的名字  String 
* db 连接数据库成功后的对象
* cb 回调函数 function(err,docs){}
**/
exports.findAll = function(collectionName,db,cb){
	var collection = db.collection(collectionName);
	collection.find({}).toArray(cb);
	db.close();
}
/*
* collectionName 要查找到collection的名字  String 
* id 要删除的id
* db 连接数据库成功后的对象
* cb 回调函数
**/
exports.deleteOneById = function(collectionName,id,db,cb){
	var collection = db.collection(collectionName);
	var objectId = new ObjectID(id);
	var obj = { _id: objectId };
	collection.deleteOne(obj,cb);
	db.close();
}
/*
* collectionName 要查找到collection的名字  String 
* oldObj 要更改的对象
* newObj 新的对象
* db 连接数据库成功后的对象
* cb 回调函数
* newObj 将会完全代替 oldObj
**/
exports.updateOneById = function(collectionName,oldId,newObj,db,cb){
	var collection = db.collection(collectionName);
	var objectId = new ObjectID(oldId);
	var oldObj = { _id: objectId }
	collection.findOneAndUpdate(oldObj,newObj,cb);
}
/*
* 更新collection的数据将原来的基础上加上更新的数据
*
*newObj = {$inc:{ 'zan': 1}} 原来的数据加1
*
*/

exports.update = function(collectionName,oldId,newObj,db,cb){
	var collection = db.collection(collectionName);
	var objectId = new ObjectID(oldId);
	var oldObj = { _id: objectId }
	collection.update(oldObj,newObj,true);
}

/*
	collection.drop(function(err,reply){})   删除collection（相当于table）

*/

/*
* 获取blog collection中的符合obj的数据总数 默认为{}获取全部数据个数
* cb 回调函数 function(err,count){}	
*
*/
exports.countAll = function(collectionName,db,cb,obj){
	var collection = db.collection(collectionName);
	var obj = obj || {};
	collection.count(obj,cb);
};

/*
*	查询制定数目的数据
*	page 制定skip跳过的数量page*num
*	num 查询的每页的数量
*/
exports.findPage = function(collectionName,db,page,num,cb){
	var collection = db.collection(collectionName);
	collection.find().skip((page-1)*num).limit(num).toArray(cb);
}
