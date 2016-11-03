/**
 * Created by Rain on 2016/11/3.
 */
var express = require('express');
var router = express.Router();

var DataCube = require('../api/datacube');

router.post('/getUserSummary.do', async(req, res)=> {
  var time = {
    "begin_date": "2016-11-01",
    "end_date": "2016-11-02"
  };
  var result = await  DataCube.getUserSummary(time);

  res.send(result);
});

module.exports = router;