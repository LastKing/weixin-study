/**
 * Created by Rain on 2016/10/31.
 */
var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require('path');

var config = require('../config/development.json');

/////  获取  AccessToken
var AccessToken = require('../api/accessToken');
router.post('/getAccessToken', async function (req, res) {
  var result = await AccessToken.create();
  if (config.AccessToken !== result.access_token) {
    config.AccessToken = result.access_token;
    fs.writeFile(path.join(__dirname, '../config/development.json'), JSON.stringify(config));
  }

  res.send(result.access_token);
});

module.exports = router;