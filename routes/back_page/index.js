/**
 * Created by liuyuhang on 2016/4/7.
 */
var express = require('express');
var router = express.Router();
var permission = require('./permission');

router.get('/',function(req, res){
   permission.checkLogin(req, res, function(){
      res.render('back_page/index', {
         username: req.session.admin.username
      });
   });
});

module.exports = router;