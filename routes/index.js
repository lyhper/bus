var express = require('express');
var router = express.Router();
var data = require('../model/data');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '换乘查询',
    current: 0
  });
});
router.post('/',function(req, res){
  var origin = req.body['begin-stop'];
  var origin_region = '陕西';
  var destination = req.body['end-stop'];
  var destination_region = '陕西';
  var url = 'http://api.map.baidu.com/direction/v1?mode=transit&output=json&origin='+origin+'&destination='+destination+'&region=西安'+'&origin_region='+origin_region+'&destination_region='+destination_region;
  var json = data.getDirection(url);
  console.log(json);
})
module.exports = router;
