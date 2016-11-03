/**
 * Created by Rain on 2016/11/2.
 */
var request = require('superagent');

var AccessToken = require('./accessToken');

const TempUploadBaseUrl = 'https://api.weixin.qq.com/cgi-bin/media';
const StaticUploadUrl = 'https://api.weixin.qq.com/cgi-bin/material';

function uploadTemp() {
  var url = TempUploadBaseUrl + '/upload';

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
function getTemp(media_id) {
  var url = TempUploadBaseUrl + '/get';

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
  var url = StaticUploadUrl + '/add_news';

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: AccessToken.get()})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.text);
        });
  });
}

//2.修改图文素材
function updateNew(data) {
  var url = StaticUploadUrl + '/add_news';

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: AccessToken.get()})
        .send(JSON.stringify(data))
        .end(function (err, result) {
          err ? reject(err) : resolve(result.text);
        });
  });
}

//3.上传其他 素材
function uploadMaterial() {
  var url = StaticUploadUrl + '/add_material';

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

//4.获取上传素材
function getMaterial(media_id) {
  var url = StaticUploadUrl + '/get_material';

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: AccessToken.get()})
        .send({media_id: media_id})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.text);
        });
  });
}

//5.删除上传素材按钮
function delMaterial(media_id) {
  var url = StaticUploadUrl + '/del_material';

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: AccessToken.get()})
        .send({media_id: media_id})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.text);
        });
  });
}

//6.获取素材总数（只有永久素材）
function getStaticCount() {
  var url = StaticUploadUrl + '/get_materialcount';

  return new Promise((resolve, reject)=> {
    request.get(url)
        .query({access_token: AccessToken.get()})
        .end(function (err, result) {
          err ? reject(err) : resolve(result.text);
        });
  });
}

//7.批量获取  （只有永久素材）
function getBatchMaterial(type, offset, count) {
  var url = StaticUploadUrl + '/batchget_material';

  return new Promise((resolve, reject)=> {
    request.post(url)
        .query({access_token: AccessToken.get()})
        .send(JSON.stringify({type, offset, count}))
        .end(function (err, result) {
          err ? reject(err) : resolve(result.text);
        });
  });
}

module.exports = {
  uploadTemp,
  getTemp,
  addNews,
  updateNew,
  uploadMaterial,
  getMaterial,
  delMaterial,
  getStaticCount,
  getBatchMaterial
};