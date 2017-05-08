var app = require('../app');

app.post('/manLogin',function(req,res){
	console.log(req.body);
});

module.exports = app;