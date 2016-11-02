/**
 * Created by Rain on 2016/11/2.
 */
var express = require('express');
var router = express.Router();

var KfAccount = require('../api/kfaccount');

router.post('/add.do', async(req, res)=> {
  var data = {
    "kf_account": "test1@test",
    "nickname": "客服1",
    "password": "pswmd5",
  };

  var result = await KfAccount.add(data);
  res.send(result);
});

module.exports = router;