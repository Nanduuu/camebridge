var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');
var fs = require('fs');
var app = express();
const formidable = require('express-formidable');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(formidable());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'files')));
//app.use(formidable());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
  timezone:'UTC',
  dateStrings:true,
});

con.connect(function(err){
if(err){
console.log(err);
}
});

if(con){
app.use(function(req,res,next){
req.db = con;
  next();
})
}

let routesPath = __dirname + '/routes';
console.log(routesPath)
fs.readdirSync(routesPath).forEach(function(file){
	if(file.indexOf('.js')){
		let route = require(routesPath + '/' + file)
		console.log(file)
		route.setRouter(app);
	}
})


app.use('/', function(req,res){
  res.sendFile(path.join(__dirname, '/files/index.js'))
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

//app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;
