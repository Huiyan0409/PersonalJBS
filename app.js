var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//add here to create the logic of new page, new page in views
app.use(function(req,res,next){
  console.log("about to look for routes!!!")
  //console.dir(req.hearers)
  next()
});

app.get('/', function(req, res, next) {
  res.render('index',{title:"TutorMatching Demo"});
});

app.get('/tutorcomment', function(req, res, next) {
  res.render('tutorcomment',{title:"Tutor Comment"});
});

app.use(function(req,res,next){
  console.log("about to look for post routes!!!")
  next()
});

function processFormData(req,res,next){
  console.dir(req.body)
  res.render('process',
    {title:"Form Data", tutorName:req.body.tutorName, coms:req.body.comment, score:req.body.inlineRadioOptions, tutee:req.body.tuteeName});
}

app.post('/process', processFormData);

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

module.exports = app;
