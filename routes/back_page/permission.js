module.exports = {
    // 后台管理页面使用，判断是否已登录，如果未登录，跳转回登录页
    checkLogin:function(req, res, next){
        if(!req.session.admin){
            req.flash('error','请登录！');
            res.redirect('/login');
        }
        next();
    },
    // 登录页使用，判断是否未登录，如果已登录，跳转回管理页
    checkNotLogin:function(req, res, next){
        if(req.session.admin){
            res.redirect('/admin');
        }
        next();
    }
};