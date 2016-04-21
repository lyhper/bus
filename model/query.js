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
    // 获取某一线路的所有站点
    getRoute: function(routeName, callback){
        var text = 'SELECT stop_name,route_stop_order FROM bus_route_stop WHERE route_name = \''+ routeName +'\' ORDER BY route_stop_order';
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
    },
    // 查询站点与路线数量
    getCount:function(callback){
        connection.query('select count(*) from bus_route', function(err, routeCount){
            if(err) throw err;
            connection.query('select count(*) from bus_stop', function(err, busCount){
                if(err) throw err;
                callback(routeCount[0]['count(*)'], busCount[0]['count(*)']);
            });
        });
    },
    // 获取所有线路，包含线路名，起始站点
    getAllRoutes:function(callback){
        var _this = this;
        var result = [];
        connection.query('select route_name from bus_route', function(err, routes){
            if(err) throw err;
            routes.forEach(function(route, index){
                var length = routes.length;
                var route = route.route_name;
                var data = {};
                data.name = route;
                // 获取所有站点
                _this.selectRoute(route, function(rows){
                    if(rows.length > 0){
                        data.start = rows[0].stop_name;
                        data.end = rows[rows.length - 1].stop_name;
                    }
                    result.push(data);
                    //返回结果
                    if(index === length - 1){
                        callback(result);
                    }
                })
            });
        });
    },
    getAllStops:function(callback){
        var result = [];
        connection.query('select stop_name from bus_stop',function(err, rows, fields){
            if(err) throw err;
            rows.forEach(function(row){
                result.push(row.stop_name);
            });
            callback(result);
        });
    }

};

module.exports = Query;


