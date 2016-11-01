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

app.use('/', routes);
app.use('/token', token);
app.use('/menu', menu);
app.use('/user', user);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;