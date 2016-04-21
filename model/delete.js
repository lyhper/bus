/**
 * Created by liuyuhang on 2016/4/18.
 */
var con = require('./connection');

module.exports = {
    delRoute : function(delId, callback){
        var text = 'delete from bus_route where route_name = \''+delId+'\'';
        con.query(text, function(err){
            if(err) throw err;
            text = 'delete from bus_route_stop where route_name = \''+delId+'\'';
            con.query(text, function(err){
                if(err) throw err;
                callback();
            });
        });
    },
    delStop : function(delId, callback){
        var text = 'delete from bus_stop where stop_name = \''+delId+'\'';
        con.query(text, function(err, result){
            if(err) throw err;
            text = 'delete from bus_route_stop where stop_name = \''+delId+'\'';
            con.query(text, function(err){
                if(err) throw err;
                callback();
            });
        });
    },
    // 删除某条线路上的站点
    delRouteStop:function(route,stop,callback){
        var text = 'delete from bus_route_stop where stop_name = \''+stop+'\' and route_name = \''+route+'\'';
        con.query(text, function(err){
            if(err) throw err;
            callback();
        });
    }
}