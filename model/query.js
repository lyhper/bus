/**
 * Created by liuyuhang on 2016/3/19.
 */
var connection = require('./connection');

var Query = {
  select: function(stopName, callback){
      var text = 'SELECT route_name FROM bus_route_stop WHERE stop_name = \''+stopName+'\'';
      connection.query(text,function(err, rows){
          if (err) throw err;
          console.log(rows);
          callback(rows);
      });
  }
};

module.exports = Query;


