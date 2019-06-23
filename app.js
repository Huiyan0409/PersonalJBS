var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



// AUTHENTICATION MODULES
session = require("express-session"),
bodyParser = require("body-parser"),
User = require( './models/User' ),
flash = require('connect-flash')
// END OF AUTHENTICATION MODULES

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

//connect to mongodb
const mongoose = require( 'mongoose' );
mongoose.connect( 'mongodb://localhost/tutorMatching' );
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we are connected!")
});

const tutorCommentController = require('./controllers/tutorCommentController')
const tuteeCommentController = require('./controllers/tuteeCommentController')
const profileController = require('./controllers/profileController')

// Authentication
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// here we set up authentication with passport
const passport = require('passport')
const configPassport = require('./config/passport')
configPassport(passport)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

/*************************************************************************
     HERE ARE THE AUTHENTICATION ROUTES
**************************************************************************/

app.use(session({ secret: 'zzbbyanana' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));


// here is where we check on their logged in status
app.use((req,res,next) => {
  res.locals.title="PersonalJBS"
  res.locals.loggedIn = false
  if (req.isAuthenticated()){
    if (req.user.googleemail.endsWith("@brandeis.edu") ||
          req.user.googleemail.endsWith("@gmail.com"))
          {
            console.log("user has been Authenticated")
            res.locals.user = req.user
            res.locals.loggedIn = true
          }
    else {
      res.locals.loggedIn = false
    }
    console.log('req.user = ')
    console.dir(req.user)
    // here is where we can handle whitelisted logins ...
    if (req.user){
      if (req.user.googleemail=='nicolezhang@brandeis.edu'){
        console.log("Owner has logged in")
        res.locals.status = 'owner'
      } else {
        console.log('A user has logged in')
        res.locals.status = 'user'
      }
    }
  }
  next()
})



// here are the authentication routes

app.get('/loginerror', function(req,res){
  res.render('loginerror',{})
})

app.get('/login', function(req,res){
  res.render('login',{})
})



// route for logging out
app.get('/logout', function(req, res) {
        req.session.destroy((error)=>{console.log("Error in destroying session: "+error)});
        console.log("session has been destroyed")
        req.logout();
        res.redirect('/');
    });


// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));


app.get('/login/authorized',
        passport.authenticate('google', {
                successRedirect : '/',
                failureRedirect : '/loginerror'
        })
      );


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    console.log("checking to see if they are authenticated!")
    // if user is authenticated in the session, carry on
    res.locals.loggedIn = false
    if (req.isAuthenticated()){
      console.log("user has been Authenticated")
      res.locals.loggedIn = true
      return next();
    } else {
      console.log("user has not been authenticated...")
      res.redirect('/login');
    }
}

// we require them to be logged in to see their profile
app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile')
    });
app.get('/editProfile', isLoggedIn, function(req, res){
  res.render('editProfile')
});

app.get('/showProfiles', profileController.getAllProfiles)
app.get('/showProfile/:id', profileController.getOneProfile)
app.post('/updateProfile',profileController.update)



//app.use(function(req,res,next){
      //console.log("about to look for post routes!!!")
    //next()
//});


// END OF THE AUTHENTICATION ROUTES

//add page for editProfile and views
//add router for updateProfile and send browser to profile

//add here to create the logic of new page, new page in views
app.use(function(req,res,next){
  console.log("about to look for routes!!!")
  //console.dir(req.hearers)
  next()
});

app.get('/', function(req, res, next) {
  res.render('index',{title:"TutorMatching Demo"});
});

app.get('/tutorForm', function(req, res, next) {
  res.render('tutorForm',{title:"Tutor Comment"});
});

function processTutorData(req,res,next){
  //console.dir(req.body)
  res.render('tutorProcess',
    {title:"Form Data", tutorName:req.body.tutorName, coms:req.body.comment, score:req.body.inlineRadioOptions, tuteeName:req.body.tuteeName});
}
app.post('/tutorProcess', tutorCommentController.saveTutorComment)

app.get('/showtutorComment', tutorCommentController.getAllTutorComments)
app.get('/showtutorComments/:id', tutorCommentController.getOneTutorComment)

app.use(function(req,res,next){
  //console.log("about to look for post routes!!!")
  next()
});


app.get('/tuteeForm', function(req, res, next) {
  res.render('tuteeForm',{title:"Tutee Comment"});
});


function processTuteeData(req,res,next){
  //console.dir(req.body)
  res.render('tuteeProcess',
    {title:"Form Data", tutorName1:req.body.tutorName1, coms1:req.body.comment1, scoreStudent:req.body.inlineRadioOptionsStudent, scoreParent:req.body.inlineRadioOptionsParent, tuteeName1:req.body.tuteeName1});
}
app.post('/tuteeProcess', tuteeCommentController.saveTuteeComment)

app.get('/showtuteeComment', tuteeCommentController.getAllTuteeComments)

app.get('/showtuteeComments/:id', tuteeCommentController.getOneTuteeComment)
app.use(function(req,res,next){
  //console.log("about to look for post routes!!!")
  next()
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

module.exports = app;
