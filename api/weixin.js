/**
 * Created by Rain on 2016/10/31.
 */
var weixin = require('../common/weixin-api');
var config = require('../config/development.json');

weixin.token = config.token;

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
      break;
    default:
      // 返回文本消息
      resMsg = {
        fromUserName: msg.toUserName,
        toUserName: msg.fromUserName,
        msgType: "text",
        content: "您说啥，我听不懂。。。",
        funcFlag: 0
      };
  }
  weixin.sendMsg(resMsg);

});

// 监听图片消息
weixin.imageMsg(function (msg) {
  console.log("imageMsg received");
  console.log(JSON.stringify(msg));

  var resMsg = {
    fromUserName: msg.toUserName,
    toUserName: msg.fromUserName,
    msgType: "text",
    content: "您发来的图片 我们收到了",
    funcFlag: 0
  };
  weixin.sendMsg(resMsg);
});

// 监听位置消息
weixin.locationMsg(function (msg) {
  console.log("locationMsg received");
  console.log(JSON.stringify(msg));
  var resMsg = {
    fromUserName: msg.toUserName,
    toUserName: msg.fromUserName,
    msgType: "text",
    content: "您发来的位置我们收到了",
    funcFlag: 0
  };
  weixin.sendMsg(resMsg);
});

// 监听链接消息
weixin.urlMsg(function (msg) {
  console.log("urlMsg received");
  console.log(JSON.stringify(msg));
  var resMsg = {
    fromUserName: msg.toUserName,
    toUserName: msg.fromUserName,
    msgType: "text",
    content: "您发来的URL 我们收到了",
    funcFlag: 0
  };
  weixin.sendMsg(resMsg);
});

// 监听事件消息
weixin.eventMsg(function (msg) {
  console.log("eventMsg received");
  if (msg.event === 'subscribe') {
    var resMsg = {
      fromUserName: msg.toUserName,
      toUserName: msg.fromUserName,
      msgType: "text",
      content: "hello 欢迎来到DanWi",
      funcFlag: 0
    };
    weixin.sendMsg(resMsg);
  }

  console.log(JSON.stringify(msg));
});