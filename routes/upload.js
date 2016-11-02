/**
 * Created by Rain on 2016/11/2.
 */
var express = require('express');
var router = express.Router();

var Upload = require('../api/upload');

router.post('/tempUpload.do', async function (req, res) {
  var result = await  Upload.tempUpload();
  res.send(result);
});

router.get('/getTempUpload.do', async function (req, res) {
  var media_id = 'nqFC99dbI6FovRTm-pf0cZHDnV4CgtPdjWt49aRLXgqhP1hQ4j_VKmXxxUYhZjSJ';
  var result = await Upload.getTempUpload(media_id);
  bufferToTemp(media_id, result);
  res.send(result);
});


/**
 * 永久素材
 */
//增加图文素材
router.post('/addNews.do', async function (req, res) {
  var result = await  Upload.tempUpload();
  res.send(result);
});

//增加其他素材
router.post('/add_material.do', async function (req, res) {
  var result = await  Upload.tempUpload();
  res.send(result);
});

//获得
router.get('/get_material.do', async function (req, res) {
  var media_id = '9l7kQ1cL-XvyxuDEGWO2CJ0ChIO6ajHMs56RGYHGWhvKjOKA0ugN4HxsN2Imcw_J';
  var result = await Upload.get_material(media_id);
  // bufferToTemp(media_id, result);
  res.send(result);
});

router.get('/getStaticCount.do', async function (req, res) {
  var result = await  Upload.getStaticCount();
  res.send(result);
});

function bufferToTemp(media_id, buffer) {
  var fs = require('fs');
  var writerStream = fs.createWriteStream(`temp/${media_id}.png`);
  writerStream.write(buffer);
  writerStream.end();
}

module.exports = router;