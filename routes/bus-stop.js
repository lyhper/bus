var express = require('express');
var router = express.Router();

router.get('/',function(req, res){
    res.render('bus-stop',{
        title: '站点查询',
        current: 2
    })
});

module.exports = router;