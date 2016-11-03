/**
 * Created by Rain on 2016/11/3.
 */
var Token = require('./accessToken');
var request = require('superagent');

var baseUrl = 'https://api.weixin.qq.com/datacube';


function getUserSummary(time) {
  var url = `${baseUrl}/getusersummary`;

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: Token.get()})
        .send(JSON.stringify(time))
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        });
  });
}

module.exports = {getUserSummary};