var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Passport/authentication configuration
require('dotenv').config(); // Load environment variables from .env file

// Database connection and model registration must happen before Passport loads models
require('./app_api/models/db');
require('./app_api/config/passport'); // Passport configuration

var passport = require('passport');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var mealsRouter = require('./app_server/routes/meals');

var apiRouter = require('./app_api/routes/index');


var handlebars = require('hbs');

// Database connection
require('./app_api/models/db');

var app = express();

// Register handlebars partials
handlebars.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Register handlebars helpers
handlebars.registerHelper('eq', function(a, b) {
    return a === b;
});

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS for API routes
app.use('/api', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // Allow specific origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allow specific headers
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Wire routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/meals', mealsRouter);

// API routes
app.use('/api', apiRouter);

// wire up Passport middleware for authentication
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

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

// catch unauthorized errors from Passport authentication
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({"message": err.name + ": " + err.message});
  }
});

module.exports = app;
