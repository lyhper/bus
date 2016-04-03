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
    selectRoute: function(routeName, callback){
        var text = 'SELECT stop_name FROM bus_route_stop WHERE route_name = \''+ routeName +'\' ORDER BY route_stop_order';
        connection.query(text, function(err, rows){
            if(err) throw err;
            callback(rows);
        });
    },
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
    }
};

module.exports = Query;


