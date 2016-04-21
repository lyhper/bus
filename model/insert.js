/**
 * Created by liuyuhang on 2016/4/21.
 */
var con = require('./connection');

module.exports = {
    insertRoute: function(route,callback){
        var text = 'insert into bus_route (route_name) values('+route+')';
        con.query(text, function(err){
            if(err) throw err;
            callback();
        });
    },
    insertStop: function(route, stop, order, callback){
        var text = 'insert into bus_stop (stop_name) values(\''+stop+'\')';
        con.query(text, function(err){
            if(err) throw err;
            text= 'insert into bus_route_stop (route_name, stop_name, route_stop_order) values('+route+',\''+stop+'\','+order+')';
            con.query(text, function(err){
                if(err) throw err;
                callback();
            });
        });
    }
};