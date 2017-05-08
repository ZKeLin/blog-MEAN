var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

//var index = require('./routes/index');
var users = require('./routes/users');
var main = require('./routes/main');
var admin = require('./routes/admin');
var manage = require('./routes/manage');
var login = require('./routes/login');
var addblog = require('./routes/addblog');
var blogOne = require('./routes/blogOne');
var deleteblog = require('./routes/deleteblog');
var modify = require('./routes/modify');
var pageNum = require('./routes/pageNum');
var tabPage = require('./routes/tabPage');
var addZan = require('./routes/addZan');
var zanNum = require('./routes/zanNum');
var exit = require('./routes/exit');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));s
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat' ,cookie: {} }));

app.use('/', main);
app.use('/admin',admin);
app.use('/managemsg',manage);
app.use('/login',login.getlogin);
app.use('/manlogin',login.postlogin);
app.use('/add',addblog.add);
app.use('/blogList',addblog.findAll);
app.use('/blogOne',blogOne);
app.use('/delete',deleteblog);
app.use('/modify',modify);
app.use('/pageNum',pageNum);
app.use('/tabPage',tabPage);
app.use('/addZan',addZan);
app.use('/zanNum',zanNum);
app.use('/exit',exit);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//post 请求




module.exports = app;
