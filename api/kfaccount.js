/**
 * Created by Rain on 2016/11/2.
 */
var Token = require('./accessToken');
var request = require('superagent');

var baseUrl = 'https://api.weixin.qq.com/customservice/kfaccount';

function add(data) {
  var url = `${baseUrl}/add`;

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: Token.get()})
        .send(JSON.stringify(data))
        .end((err, result)=> {
          err ? reject(err) : resolve(result.body);
        });
  });
}

module.exports = {add};