/**
 * Created by Rain on 2016/11/1.
 */
var request = require('superagent');
var accessToken = require('./accessToken');

function getAll() {
  var url = 'https://api.weixin.qq.com/cgi-bin/user/get';

  return new Promise((resolve, reject)=> {
    request.get(url)
        .query({access_token: accessToken.get()})
        // .query({next_openid: accessToken.get()})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        })
  });
}

module.exports = {getAll};