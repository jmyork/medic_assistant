var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const connectDB = require('./config/database');
connectDB()

var router = require('./route/index');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const cors = require('cors');
app.use(cors({
  origin: '*', // ou especifique o domínio do frontend, ex: 'http://localhost:3000'
  credentials: true
}));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(404).json({ message: 'Resource not found' });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.status(400).json({ message: err.message });
});

module.exports = app;
