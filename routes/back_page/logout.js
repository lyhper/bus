var express = require('express');
var router = express.Router();
var permission = require('./permission');

router.get('/', permission.checkLogin);
router.get('/', function(req, res, next){
    req.session.admin = null;
    req.flash('error', '注销成功！');
    res.redirect('/login');
});

module.exports = router;