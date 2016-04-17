/**
 * Created by liuyuhang on 2016/3/19.
 */
var connection = require('./connection');

var Query = {
    selectStop: function(stopName, callback){
        var text = 'SELECT route_name FROM bus_route_stop WHERE stop_name = \''+stopName+'\'';
        connection.query(text,function(err, rows){
            if (err) throw err;
            callback(rows);
        });
    },
    selectStop2: function(stopName, callback){
        var text = 'SELECT route_name FROM bus_route_stop WHERE stop_name = \''+stopName+'\'';
        connection.query(text,function(err, rows){
            if (err) throw err;
            var routes = [];
            rows.forEach(function(row){
                routes.push(row.route_name);
            });
            callback(routes);
        });
    },
    selectRoute: function(routeName, callback){
        var text = 'SELECT stop_name FROM bus_route_stop WHERE route_name = \''+ routeName +'\' ORDER BY route_stop_order';
        connection.query(text, function(err, rows){
            if(err) throw err;
            callback(rows);
        });
    },
    // 查询多条线路的起始站点
    //  参数：包含多条线路的数组
    selectStartEndStop:function(routesName,callback){
        var result = [];
        var _this = this;
        routesName.forEach(function(routeName, index){
            var data = {
                routeName: routeName.route_name
            };
            _this.selectRoute(routeName.route_name, function(rows){
                data.startStop = rows[0].stop_name;
                data.endStop = rows[rows.length-1].stop_name;
                result.push(data);
                if(index === routesName.length-1){
                    callback(result);
                }
            });
        });
    },
    // 查询管理员账户
    getAdmin:function(username, callback){
        var text = 'SELECT * FROM admin WHERE username = \''+username+'\''
        connection.query(text, function(err, result){
            if(err) throw err;
            if(result){
                callback(result[0]);
            }else{
                callback(null);
            }
        });
    }

};

module.exports = Query;


