require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var { database } = require('./config/env');
var debug = require('debug')('accrawan-backend:app.js');
var passport = require('passport');

mongoose
  .connect(database.url, database.options)
  .then(function() {
    debug('DB connected');
  })
  .catch(function(err) {
    debug(err);
  });
var app = express();
// var expressWs = require('express-ws')(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

require('./config/passport')(passport);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// MONGOOSE DEFAULTS
mongoose.connection.on('connected', function() {
  debug('Mongoose default connection connected');
});
mongoose.connection.on('error', function(err) {
  debug('Mongoose default connection error:' + err);
});
mongoose.connection.on('disconnected', function() {
  debug('Mongoose default connection disconnected');
});
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    debug('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});
