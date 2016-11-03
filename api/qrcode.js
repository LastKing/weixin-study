/**
 * Created by Rain on 2016/11/3.
 */
var request = require('superagent');

var AccessToken = require('./accessToken');

const BaseUrl = 'https://api.weixin.qq.com/cgi-bin/qrcode';

function createTemp(data) {
  var url = `${BaseUrl}/create`;

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: AccessToken.get()})
        .send(JSON.stringify(data))
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        })
  });
}

function createStatic(data) {
  var url = `${BaseUrl}/create`;

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: AccessToken.get()})
        .send(JSON.stringify(data))
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        })
  });
}

function get(ticket) {
  var url = 'https://mp.weixin.qq.com/cgi-bin/showqrcode';

  return new Promise((resolve, reject)=> {
    request.get(url)
        .query({ticket: ticket})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        })
  });
}

module.exports = {createTemp, createStatic, get};
