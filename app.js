var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var placeRouter = require('./routes/searchPlace');
var categoryRouter = require('./routes/searchCategory');
const config = require('./config');
const mongoose = require('mongoose');

var app = express();

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('\n Connected to the server \n');
},(err) =>{
  console.log(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/users', usersRouter);
app.use('/searchPlace',placeRouter);
app.use('/searchCategory',categoryRouter);

module.exports = app;
