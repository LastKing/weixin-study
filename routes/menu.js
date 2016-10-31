/**
 * Created by Rain on 2016/10/31.
 */
var express = require('express');
var router = express.Router();

var Menu = require('../api/menu');

/////  获取  菜单
router.get('/getMenu', async(req, res) => {
  var result = await Menu.getMenu();
  res.send(result);
});

router.post('/createMenu', async(req, res)=> {
  var menuTxt = require('./menu.json');
  var result = await Menu.createMenu(menuTxt);
  res.send(result);
});

module.exports = router;