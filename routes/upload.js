/**
 * Created by Rain on 2016/11/2.
 */
var express = require('express');
var router = express.Router();

var Upload = require('../api/upload');

router.post('/tempUpload.do', async function (req, res) {
  var result = await  Upload.uploadTemp();
  res.send(result);
});

router.get('/getTemp.do', async function (req, res) {
  var media_id = 'nqFC99dbI6FovRTm-pf0cZHDnV4CgtPdjWt49aRLXgqhP1hQ4j_VKmXxxUYhZjSJ';
  var result = await Upload.getTemp(media_id);
  bufferToTemp(media_id, result);
  res.send(result);
});


/**
 * 永久素材
 */
//增加图文素材
router.post('/addNews.do', async function (req, res) {
  var result = await  Upload.addNews();
  res.send(result);
});

//增加其他素材
router.post('/uploadMaterial.do', async function (req, res) {
  var result = await Upload.uploadMaterial();
  res.send(result);
});

//获得
router.get('/getMaterial.do', async function (req, res) {
  var media_id = 'aQ4HEezFmTssbaU2tS8kRNdKawMWcxZSqItk0OimfXQ';
  var result = await Upload.getMaterial(media_id);
  // bufferToTemp(media_id, result);
  res.send(result);
});

router.get('/getStaticCount.do', async function (req, res) {
  var result = await Upload.getStaticCount();
  res.send(result);
});

router.post('/getBatchMaterial.do', async function (req, res) {
  var result = await Upload.getBatchMaterial('image', 0, 20);
  res.send(result);
});

function bufferToTemp(media_id, buffer) {
  var fs = require('fs');
  var writerStream = fs.createWriteStream(`temp/${media_id}.png`);
  writerStream.write(buffer);
  writerStream.end();
}

module.exports = router;