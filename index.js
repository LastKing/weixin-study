/**
 * Created by Rain on 2016/10/27.
 */
var express = require('express');
var weixin = require('./weixin-api');
var request = require('superagent');

var menuTxt = require('./menu');

var app = express();

// 接入验证
app.get('/', function (req, res) {
  console.log('test');

  // 签名成功
  if (weixin.checkSignature(req)) {
    res.status(200).send(req.query.echostr);
  } else {
    res.status(200).send('fail');
  }
});

// config 根据自己的实际配置填写
weixin.token = 'qbtest';

// 监听文本消息
weixin.textMsg(function (msg) {
  console.log("textMsg received");
  console.log(JSON.stringify(msg));

  var resMsg = {};

  switch (msg.content) {
    case "文本" :
      // 返回文本消息
      resMsg = {
        fromUserName: msg.toUserName,
        toUserName: msg.fromUserName,
        msgType: "text",
        content: "这是文本回复",
        funcFlag: 0
      };
      break;

    case "音乐" :
      // 返回音乐消息
      resMsg = {
        fromUserName: msg.toUserName,
        toUserName: msg.fromUserName,
        msgType: "music",
        title: "音乐标题",
        description: "音乐描述",
        musicUrl: "音乐url",
        HQMusicUrl: "高质量音乐url",
        funcFlag: 0
      };
      break;

    case "图文" :

      var articles = [];
      articles[0] = {
        title: "PHP依赖管理工具Composer入门",
        description: "PHP依赖管理工具Composer入门",
        picUrl: "http://weizhifeng.net/images/tech/composer.png",
        url: "http://weizhifeng.net/manage-php-dependency-with-composer.html"
      };

      articles[1] = {
        title: "八月西湖",
        description: "八月西湖",
        picUrl: "http://weizhifeng.net/images/poem/bayuexihu.jpg",
        url: "http://weizhifeng.net/bayuexihu.html"
      };

      articles[2] = {
        title: "「翻译」Redis协议",
        description: "「翻译」Redis协议",
        picUrl: "http://weizhifeng.net/images/tech/redis.png",
        url: "http://weizhifeng.net/redis-protocol.html"
      };

      // 返回图文消息
      resMsg = {
        fromUserName: msg.toUserName,
        toUserName: msg.fromUserName,
        msgType: "news",
        articles: articles,
        funcFlag: 0
      };
  }
  weixin.sendMsg(resMsg);

});

// 监听图片消息
weixin.imageMsg(function (msg) {
  console.log("imageMsg received");
  console.log(JSON.stringify(msg));
});

// 监听位置消息
weixin.locationMsg(function (msg) {
  console.log("locationMsg received");
  console.log(JSON.stringify(msg));
});

// 监听链接消息
weixin.urlMsg(function (msg) {
  console.log("urlMsg received");
  console.log(JSON.stringify(msg));
});

// 监听事件消息
weixin.eventMsg(function (msg) {
  console.log("eventMsg received");
  console.log(JSON.stringify(msg));
});

var appId = 'wx752daac4ef847b71';
var token = 'qbtest';
var appSecret = 'd4624c36b6795d1d99dcf0547af5443d';

var AccessToken = 'FQG12_thrAKU-io8rNRX0Zgkze-psOxlI8PftGCnw3yVfQVIGW2eJzUmWpQErDk2NpYokevkgC9i-xkQfoK-JSomeActhNnDV2kfByfUsjtBn4-AgDVw_t9cqO8BRWBMBUFdACAOHS';

function getAccessToken() {
  var url = `https://api.weixin.qq.com/cgi-bin/token`;

  request.get(url)
      .set('Content-Type', 'application/json')
      .query({"grant_type": "client_credential"})
      .query({"appid": appId})
      .query({"secret": appSecret})
      .end(function (err, result) {
        token = result;
        console.log(result);
      })
}
// getAccessToken();

function createMenu() {
  var url = `https://api.weixin.qq.com/cgi-bin/menu/create`;

  request.post(url)
      .set('Content-Type', 'application/json')
      .query({access_token: AccessToken})
      .send({"body": menuTxt})
      .end(function (err, result) {
        console.log(err);
        console.log(result);
      })
}
createMenu();

// Start
app.post('/', function (req, res) {

  // loop
  weixin.loop(req, res);

});

app.listen(80);