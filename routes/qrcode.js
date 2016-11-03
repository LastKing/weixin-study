/**
 * Created by Rain on 2016/11/3.
 */
var express = require('express');
var router = express.Router();

var Qrcode = require('../api/qrcode');

router.post('/createTemp.do', async function (req, res) {
  var data = {"expire_seconds": 604800, "action_name": "QR_SCENE", "action_info": {"scene": {"scene_id": 123}}};
  var result = await Qrcode.createTemp(data);

  res.send(result);
});

router.post('/createStatic.do', async function (req, res) {
  var data = {"action_name": "QR_LIMIT_SCENE", "action_info": {"scene": {"scene_id": 123}}};
  var result = await Qrcode.createStatic(data);

  res.send(result);
});

router.get('/get.do', async function (req, res) {
  var ticket = 'gQE58DoAAAAAAAAAASxodHRwOi8vd2VpeGluLnFxLmNvbS9xL01rendVUTdsZW1rRGNXV3J2V0pJAAIE7dwaWAMEgDoJAA==';
  var result = await Qrcode.get(ticket);

  bufferToTemp(ticket, result);

  res.send('/temp/' + ticket + '.png');
});

function bufferToTemp(media_id, buffer) {
  var fs = require('fs');
  var writerStream = fs.createWriteStream(`temp/${media_id}.png`);
  writerStream.write(buffer);
  writerStream.end();
}


module.exports = router;