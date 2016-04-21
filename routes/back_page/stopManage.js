var express = require('express');
var router = express.Router();
var permission = require('./permission');
var query = require('../../model/query');
var del = require('../../model/delete');
var update = require('../../model/update');

router.get('/',function(req, res, next){
    // 检查登陆情况
    permission.checkLogin(req, res, function(){
        // 获取所有线路
        console.log('dd');
        query.getAllStops(function(stops){
            res.render('back_page/stopManage',{
                username: req.session.admin.username,
                breadcrumb: '站点管理',
                breadcrumbSub: '对各个站点进行删除，修改等操作',
                stops: stops
            });
        });
    });
});
router.get('/del', function(req, res, next){
    permission.checkLogin(req, res, function(){
        var delId = req.query.id;
        del.delStop(delId, function(){
            res.redirect('back');
        });
    });
});
router.get('/delroutestop', function(req, res, next){
    permission.checkLogin(req, res, function(){
        var route = req.query.route;
        var stop = req.query.stop;
        del.delRouteStop(route, stop, function(){
            res.redirect('back');
        });
    });
});
router.post('/stopmodify',function(req, res, next){
    permission.checkLogin(req, res, function(){
        var oldStop = req.body.oldStop;
        var newStop = req.body.newStop;
        update.updateStopName(oldStop, newStop, function(){
            res.end();
        });
    });
});
router.post('/stoporder',function(req, res, next){
    permission.checkLogin(req, res, function(){
        var route = req.body.route;
        var stop = req.body.stop;
        var oldOrder = req.body.oldOrder;
        var newOrder = req.body.newOrder;
        update.updateStopOrder(route, stop, oldOrder, newOrder, function(){
            res.end();
        });
    });
});

module.exports = router;