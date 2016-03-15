/**
 * Created by liuyuhang on 2016/3/13.
 */

var express = require('express');
var router = express.Router();

router.get('/',function(req, res){
   res.render('bus-routes',{
       title: '路线查询',
       current: 1
   })
});
router.post('/',function(req, res){
    var busRoute = req.body['bus-route'];

});

module.exports = router;