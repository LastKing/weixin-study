/**
 * Created by Rain on 2016/10/31.
 */
var request = require('superagent');
var accessToken = require('./accessToken');

var baseUrl = 'https://api.weixin.qq.com/cgi-bin/menu';

function getMenu() {
  var url = `${baseUrl}/get`;

  return new Promise((resolve, reject)=> {
    request.get(url)
        .set('Content-Type', 'application/json')
        .query({access_token: accessToken.get()})
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
        .query({access_token: accessToken.get()})
        .send(JSON.stringify(menuTxt))
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        });
  });
}

function remove() {
  var url = `${baseUrl}/delete`;

  return new Promise((resolve, reject)=> {
    request.get(url)
        .query({access_token: accessToken.get()})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        })
  })
}

/* 个性化 菜单*/
function addConditional(customButton) {
  var url = `${baseUrl}/addconditional`;

  return new Promise((resolve, reject)=> {
    request.post(url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .query({access_token: accessToken.get()})
        .send(JSON.stringify(customButton))
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        })
  })
}

/* 删除个性化菜单 */
function delConditional(menuid) {
  var url = `${baseUrl}/delconditional`;

  return new Promise((resolve, reject)=> {
    request.post(url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .query({access_token: accessToken.get()})
        .send(JSON.stringify({menuid: menuid}))
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        })
  })
}

/* 测试 个性化菜单 匹配结果*/
function tryMatch(user_id) {
  var url = `${baseUrl}/trymatch`;

  return new Promise((resolve, reject)=> {
    request.post(url)
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .query({access_token: accessToken.get()})
        .send(JSON.stringify({user_id: user_id}))
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        })
  })
}

module.exports = {createMenu, getMenu, remove, addConditional, tryMatch,delConditional};