/**
 * Created by Rain on 2016/11/2.
 */
var request = require('superagent');

var AccessToken = require('./accessToken');

var tempUploadBaseUrl = 'https://api.weixin.qq.com/cgi-bin/media';

var staticUploadUrl = 'https://api.weixin.qq.com/cgi-bin/material';

function tempUpload() {
  var url = tempUploadBaseUrl + '/upload';

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: AccessToken.get()})
        .query({type: 'image'})
        .attach('media', 'public/angular.png')
        .end(function (err, result) {
          err ? reject(err) : resolve(result.text);
        });
  });
}

/**
 * 获取临时上传的素材
 * @param media_id
 * @returns {Promise} 返回的是一个   文件buffer流，而不是文件地址
 */
function getTempUpload(media_id) {
  var url = tempUploadBaseUrl + '/get';

  return new Promise((resolve, reject)=> {
    request.get(url)
        .query({access_token: AccessToken.get()})
        .query({media_id: media_id})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        });
  });
}

//  永久上传素材的素材

//1.上传图文素材
function addNews() {
  var url = staticUploadUrl + '/add_news';

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: AccessToken.get()})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.text);
        });
  });

}

function upload() {
  var url = staticUploadUrl + '/add_material';

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: AccessToken.get()})
        .query({type: 'image'})
        .attach('media', 'public/angular.png')
        .end(function (err, result) {
          err ? reject(err) : resolve(result.text);
        });
  });
}

function get_material(media_id) {
  var url = staticUploadUrl + '/get_material';

  return new Promise((resolve, reject)=> {
    request.get(url)
        .query({access_token: AccessToken.get()})
        .send(JSON.stringify({media_id: media_id}))
        .end(function (err, result) {
          err ? reject(err) : resolve(result.body);
        });
  });
}

function getStaticCount() {
  var url = staticUploadUrl + '/get_materialcount';

  return new Promise((resolve, reject)=> {
    request.get(url)
        .query({access_token: AccessToken.get()})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.text);
        });
  });
}

function getAll() {
  var url = staticUploadUrl + '/batchget_material';

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: AccessToken.get()})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.text);
        });
  });
}


module.exports = {tempUpload, getTempUpload, get_material, addNews, getStaticCount, getAll};