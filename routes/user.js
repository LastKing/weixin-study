/**
 * Created by Rain on 2016/11/1.
 */
var express = require('express');
var router = express.Router();

var User = require('../api/user');

router.get('/get.do', async function (req, res) {
  var user = await User.getAll();

  res.send(user);
});

module.exports = router;