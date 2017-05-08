var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
	if(req.session.managerName){
		res.render('admin',{name: req.session.managerName});
	}else{
		res.render('login');
	}
	
});

module.exports = router;