/**
 * Created by liuyuhang on 2016/3/13.
 */

var express = require('express');
var router = express.Router();
var query = require('../model/query');

router.get('/',function(req, res){
   res.render('bus-routes',{
       title: '路线查询',
       current: 1,
       error: req.flash('error'),
       busRoute: req.flash('busRoute'),
       busStops: req.flash('busStops')
   });
});
router.post('/',function(req, res){
    var busRoute = req.body['bus-route'];
    query.selectRoute(busRoute, function(data){
        if(data.length > 0){
            req.flash('busRoute', busRoute);
            req.flash('busStops', data);
            res.redirect('/busroutes');
        }else{
            req.flash('error', '未查询到此公交线路！');
            res.redirect('/busroutes');
        }
    });
});

module.exports = router;