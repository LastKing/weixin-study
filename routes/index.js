/**
 * Created by Rain on 2016/10/31.
 */
var express = require('express');
var router = express.Router();

var fs = require('fs');

var weixin = require('../common/weixin-api');
require('../api/weixin');

router.get('/', function (req, res) {
  // 签名成功
  if (weixin.checkSignature(req)) {
    res.status(200).send(req.query.echostr);
  } else {
    res.status(200).send('fail');
  }
});

router.post('/', function (req, res) {
  // loop
  weixin.loop(req, res);
});

router.get('/index.html', function (req, res) {
  var result = {};

  result.AccessToken = require('../api/accessToken').get();

  res.render('index', result);
});

module.exports = router;