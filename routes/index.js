var express = require('express');
var router = express.Router();
var transfer = require('../model/transfer');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('front_page/index', {
      title: '换乘查询',
      current: 0,
      error: req.flash('error'),
      startStop: req.flash('startStop'),
      endStop: req.flash('endStop'),
      transferZeroTime: req.flash('transferZeroTime'),
      transferOneTime: req.flash('transferOneTime'),
      transferTwoTime: req.flash('transferTwoTime')
  });
});
router.post('/',function(req, res){
    var startStop = req.body['start-stop'];
    var endStop = req.body['end-stop'];
    req.flash('startStop',startStop);
    req.flash('endStop',endStop);
    transfer(startStop, endStop, function(err, transferTimes, transferMethods){
        if(!err){
            switch(transferTimes){
                case 0:
                    req.flash('transferZeroTime',transferMethods);
                    break;
                case 1:
                    req.flash('transferOneTime',transferMethods);
                    break;
                case 2:
                    req.flash('transferTwoTime',transferMethods);
                    break;
            }
        }else{
            req.flash('error',err);
        }

        res.redirect('/');
    });
});
module.exports = router;
