/**
 * Created by liuyuhang on 2016/4/7.
 */

var express = require('express');
var router = express.Router();
var query = require('../../model/query');
var permission = require('./permission');

router.get('/', permission.checkNotLogin);
router.get('/',function(req, res){
    res.render('back_page/login',{
        error: req.flash('error')
    });
});

router.post('/',function(req, res){
    var username = req.body.username.trim();
    var password = req.body.password.trim();

    query.getAdmin(username, function(admin){
        if(!admin){
            req.flash('error', '用户名不存在！');
            return res.redirect('/login');
        }
        if(password !== admin.password){
            req.flash('error','用户名与密码不匹配！');
            return res.redirect('/login');
        }
        req.session.admin = admin;
        res.redirect('back');
    });
});

module.exports = router;