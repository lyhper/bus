var express = require('express');
var router = express.Router();
var transfer = require('../model/transfer');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: '换乘查询',
    current: 0,
    transferTimes: req.flash('transferTimes'),
    transferMethods: req.flash('transferMethods')
  });
});
router.post('/',function(req, res){
  var startStop = req.body['start-stop'];
  var endStop = req.body['end-stop'];
  transfer(startStop, endStop, function(transferTimes, transferMethods){
    switch(transferTimes){
      case 0:
          req.flash('transferTimes',transferTimes);
          req.flash('transferMethods',transferMethods);
          console.log(transferMethods);
          break;
      case 1:
          break;
      case 2:
          break;
    }
      res.redirect('/');
  });
});
module.exports = router;
