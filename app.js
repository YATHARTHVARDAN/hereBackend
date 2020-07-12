var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mapRouter = require('./routes/hereMap');
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

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.get('/yay',(req,res) => {
  res.set('Access-Control-Allow-Origin', 'https://yatharthvardan.github.io');
  res.set('Access-Control-Allow-Credentials','true');
  res.setHeader('Content-Type','application/json')
  var z = {
    title: 'Yup It is working',
    name: 'The world will know',
    age:'19'
  }
  res.JSON(z);
})
app.use('/users', usersRouter);
app.use('/hereMap',mapRouter);

module.exports = app;
