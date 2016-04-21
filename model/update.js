/**
 * Created by liuyuhang on 2016/4/19.
 */
var con = require('./connection');

var update = {
    // 更新线路名
    updateRouteName:function(oldName, newName, callback){
        var text = 'update bus_route set route_name = \''+newName+'\' where route_name = \''+oldName+'\'';
        con.query(text,function(err){
            if(err) throw err;
            text = 'update bus_route_stop set route_name = \''+newName+'\' where route_name = \''+oldName+'\'';
            con.query(text,function(err){
                if(err) throw err;
                callback();
            });
        });
    },
    updateStopName:function(oldName, newName, callback){
        var text = 'update bus_stop set stop_name = \''+newName+'\' where stop_name = \''+oldName+'\'';
        con.query(text,function(err){
            if(err) throw err;
            text = 'update bus_route_stop set stop_name = \''+newName+'\' where stop_name = \''+oldName+'\'';
            con.query(text,function(err){
                if(err) throw err;
                callback();
            });
        });
    },
    updateStopOrder:function(route, stop, oldOrder, newOrder, callback){
        var text = 'update bus_route_stop set route_stop_order = \''+newOrder+'\' where stop_name = \''+stop+'\''+'and route_name = \''+route+'\''+'and route_stop_order = \''+oldOrder+'\'';
        con.query(text,function(err){
            if(err) throw err;
            callback();
        });
    }
};

module.exports = update;