/**
 * Created by Rain on 2016/10/31.
 */
var express = require('express');
var router = express.Router();

var Menu = require('../api/menu');

router.get('/getMenu', async(req, res) => {
  var result = await Menu.getMenu();
  res.send(result);
});

router.post('/createMenu', async(req, res)=> {
  var menuTxt = require('./menu.json');
  var result = await Menu.createMenu(menuTxt);
  res.send(result);
});

router.get('/remove.do', async(req, res)=> {
  var result = await Menu.remove();
  res.send(result);
});

//自定义菜单，分地区
router.post('/addConditional.do', async(req, res)=> {
  var result = await Menu.addConditional(customButton);
  res.send(result);
});

router.post('/delconditional.do', async(req, res)=> {
  var menuId = req.body.menuId;
  var result = await Menu.delConditional(menuId);
  res.send(result);
});

var customButton = {
  "button": [
    {
      "type": "click",
      "name": "xxxxx",
      "key": "V1001_TODAY_MUSIC"
    },
    {
      "name": "菜单",
      "sub_button": [
        {
          "type": "view",
          "name": "搜索",
          "url": "http://www.soso.com/"
        },
        {
          "type": "view",
          "name": "视频",
          "url": "http://v.qq.com/"
        },
        {
          "type": "click",
          "name": "赞一下我们",
          "key": "V1001_GOOD"
        }]
    }],
  "matchrule": {
    "tag_id": "2",
    "sex": "1",
    "country": "中国",
    "province": "广东",
    "city": "广州",
    "client_platform_type": "2",
    "language": "zh_CN"
  }
};

module.exports = router;