var router = require('express').Router();

var mongodb = require('../models/index');
router.get('/',function(req,res,next){
	if(req.session.managerName){
		res.render('managemsg');
	}else{
		res.render('login');
	}
});

module.exports = router;