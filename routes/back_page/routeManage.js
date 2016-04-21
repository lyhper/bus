var express = require('express');
var router = express.Router();
var permission = require('./permission');
var query = require('../../model/query');
var del = require('../../model/delete');
var update = require('../../model/update');
var insert = require('../../model/insert');

router.get('/',function(req, res, next){
    // 检查登陆情况
    permission.checkLogin(req, res, function(){
        // 获取所有线路
        query.getAllRoutes(function(routes){
            res.render('back_page/routeManage',{
                username: req.session.admin.username,
                breadcrumb: '线路管理',
                breadcrumbSub: '对各条线路进行删除，修改等操作',
                routes: routes
            });
        });
    });
});
router.get('/del', function(req, res, next){
    permission.checkLogin(req, res, function(){
        var delId = req.query.id;
        del.delRoute(delId, function(){
            res.redirect('back');
        });
    });
});
router.get('/routeedit', function(req, res, next){
    permission.checkLogin(req, res, function(){
        var routeName = req.query.id;
        query.getRoute(routeName, function(stops){
            res.render('back_page/routeEdit',{
                username: req.session.admin.username,
                breadcrumb: routeName,
                breadcrumbSub: '途经站点',
                stops: stops,
                route: routeName
            })
        });
    });
});
router.post('/routemodify',function(req, res, next){
    permission.checkLogin(req, res, function(){
        var oldRoute = req.body.oldRoute;
        var newRoute = req.body.newRoute;
        update.updateRouteName(oldRoute, newRoute, function(){
            res.end();
        });
    });
});
router.post('/routeadd',function(req, res, next){
    permission.checkLogin(req, res, function(){
        var route = req.body.route;
        insert.insertRoute(route, function(){
            res.end();
        });
    });
});
router.post('/routestopadd',function(req, res, next){
    permission.checkLogin(req, res, function(){
        var stop = req.body.stop;
        var order = req.body.order;
        var route = req.body.route;
        insert.insertStop(route, stop, order, function(){
            res.end();
        });
    });
});

module.exports = router;