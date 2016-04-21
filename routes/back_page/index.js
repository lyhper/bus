/**
 * Created by liuyuhang on 2016/4/7.
 */
var express = require('express');
var router = express.Router();
var permission = require('./permission');
var query = require('../../model/query');

router.get('/',function(req, res){
   permission.checkLogin(req, res, function(){
      query.getCount(function(routeCount, busCount){
         res.render('back_page/index', {
            username: req.session.admin.username,
            breadcrumb: '首页',
            breadcrumbSub: '数据统计',
            routeCount: routeCount,
            busCount: busCount
         });
      });
   });
});

module.exports = router;