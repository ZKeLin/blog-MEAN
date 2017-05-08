var router = require('express').Router();

var mongodb = require('../models/index');
var encryption = require('../controller/encrypt').encryption;

exports.getlogin = router.get('/',function(req,res,next){
	console.log("session",req.session.managerName);
	if(req.session.managerName){
		res.render('admin',{ name: req.session.managerName },function(err,html){
			if(err) {
				console.log(err);
			}else{
				res.send(html);
			}
		});
	}else{
		res.render('login');
	}
	
});

exports.postlogin = router.post('/',function(req,res,next){
	console.log(req.body);
	if(req.body.password || req.body.managerName){
		mongodb.connect(function(db){
			var obj = { managerName: req.body.managerName }
			if(req.body.password){
				//密码加密
				var enPassword = encryption(req.body.password);
			}
			mongodb.findOne('manager',obj,db,function(err,data){
				if(err) throw err;
				console.log(data);
				if(!data){
					res.send('用户名不存在');
				}else{
					//console.log(enPassword);
					if(req.body.password){
						if(enPassword === data.password){
							req.session.managerName = req.body.managerName;
							res.redirect('/admin');
						}else{
							//console.log(data[0].password);
							res.send('密码错误');
						}
					}else{
						res.send('ddd');
					}
				}
			});
		});
	}else{
		//res.redirect('/login');
		next();
		res.send('用户名，密码为空')
		console.log("用户名，密码为空");
	}
});

