var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
	//req.session.managerName = null;
	res.render('main');
});

module.exports = router;