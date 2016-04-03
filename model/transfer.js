var query = require('./query');

function transfer(startStop, endStop, callback){
    // 换乘次数，-1代表无线路
    var transferTimes = -1;
    // 换乘方案
    var transferMethods = [];
    query.selectStop(startStop, function(startStopRoutes){
        if(startStopRoutes.length > 0){
            query.selectStop(endStop, function(endStopRoutes){
                if(endStopRoutes.length> 0){
                    startStopRoutes.forEach(function(startStopRoute){
                        endStopRoutes.forEach(function(endStopRoute){
                            if (startStopRoute.route_name === endStopRoute.route_name){
                                transferTimes = 0;
                                transferMethods.push(startStopRoute.route_name);
                            }
                        });
                    });
                    callback(transferTimes, transferMethods);
                }else{
                    //没有终点站
                }
            });
        }else{
            //没有起点站
        }
    });


    //直达

    //一次换乘

    //二次换乘
}

module.exports = transfer;