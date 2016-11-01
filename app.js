/**
 * Created by Rain on 2016/10/27.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

//router
var routes = require('./routes/index');
var token = require('./routes/token');
var menu = require('./routes/menu');
var user = require('./routes/user');

// 模版设定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', routes);  //管理页面和
app.use('/token', token);//token 管理
app.use('/menu', menu);//菜单管理
app.use('/user', user);//用户管理


app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  if (app.get('env') === 'development') err = {};
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;