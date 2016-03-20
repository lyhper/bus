/**
 * Created by liuyuhang on 2016/3/19.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '19940814',
    database: 'bus'
});

module.exports = connection;