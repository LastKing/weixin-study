/**
 * Created by Rain on 2016/10/31.
 */
var request = require('superagent');
var AccessToken = require('../config/development.json').AccessToken;

var baseUrl = 'https://api.weixin.qq.com/cgi-bin/menu';

function getMenu() {
  var url = `${baseUrl}/get`;

  return new Promise((resolve, reject)=> {
    request.get(url)
        .set('Content-Type', 'application/json')
        .query({access_token: AccessToken})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        })
  });
}

function createMenu(menuTxt) {
  var url = `${baseUrl}/create`;

  return new Promise((resolve, reject)=> {
    request.post(url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .query({access_token: AccessToken})
        .send(JSON.stringify(menuTxt))
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        });
  });
}

module.exports = {
  createMenu: createMenu,
  getMenu: getMenu
};