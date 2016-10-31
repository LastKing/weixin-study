/**
 * Created by Rain on 2016/10/31.
 */
var request = require('superagent');

var config = require('../config/development.json');

function create() {
  var url = `https://api.weixin.qq.com/cgi-bin/token`;

  return new Promise((resolve, reject)=> {
    request.get(url)
        .set('Content-Type', 'application/json')
        .query({"grant_type": "client_credential"})
        .query({appid: config.appId})
        .query({secret: config.appSecret})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        })
  });
}

function get() {
  var config = require('../config/development.json');

  return config.AccessToken;
}

module.exports = {create, get};