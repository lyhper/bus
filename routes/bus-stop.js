var express = require('express');
var router = express.Router();
var query = require('../model/query');
router.get('/',function(req, res){
    res.render('bus-stop',{
        title: '站点查询',
        current: 2,
        busStop: req.flash('busStop'),
        result: req.flash('result'),
        error: req.flash('error')
    });
});
router.post('/',function(req, res){
    var busStop = req.body['bus-stop'];
    query.selectStop(busStop, function(rows){
        if(rows.length > 0){
            query.selectStartEndStop(rows,function(result){
                req.flash('result', result);
                res.redirect('/busstop');
            });
            req.flash('busStop',busStop);
        }else{
            req.flash('error','未查询到此站点！');
            res.redirect('/busstop');
        }

    });
});

module.exports = router;