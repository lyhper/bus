var query = require('./query');

function transfer(startStop, endStop, callback){
    // 换乘次数

    var transferTimes = -1;
    // 换乘方案
    var transferMethods = [];
    query.selectStop(startStop, function(startStopRoutes){
        if(startStopRoutes.length > 0){
            query.selectStop(endStop, function(endStopRoutes){
                if(endStopRoutes.length> 0){
                    // 直达方案
                    startStopRoutes.forEach(function(startStopRoute){
                        endStopRoutes.forEach(function(endStopRoute){
                            if (startStopRoute.route_name === endStopRoute.route_name){
                                transferTimes = 0;
                                transferMethods.push(startStopRoute.route_name);
                            }
                        });
                    });
                    if(transferTimes === 0){
                        callback(null,transferTimes,transferMethods);
                    }else{

                        // 换乘1次
                        // 起点站线路能到达的站点
                        var startStopRouteStops = [];
                        // 终点站线路能到达的站点
                        var endStopRouteStops = [];
                        startStopRoutes.forEach(function(startStopRoute,index){
                            query.selectRoute(startStopRoute.route_name,function(rows){
                                // 遍历线路经过的所有站点，除去起点站存入数组
                                rows.forEach(function(row){
                                    if(row.stop_name != startStop){
                                        startStopRouteStops.push({
                                            route: startStopRoute.route_name,
                                            stopName:row.stop_name
                                        });
                                    }
                                });
                                // 判断起点是否遍历完成
                                if(index === startStopRoutes.length-1){
                                    // 遍历经过终点站的线路
                                    endStopRoutes.forEach(function(endStopRoute, index){
                                        query.selectRoute(endStopRoute.route_name,function(rows){
                                            // 遍历线路经过的所有站点，除去起点站存入数组
                                            rows.forEach(function(row){
                                                if(row.stop_name != endStop){
                                                    endStopRouteStops.push({
                                                        route: endStopRoute.route_name,
                                                        stopName:row.stop_name
                                                    });
                                                }
                                            });
                                            if(index === endStopRoutes.length - 1){
                                                // 比较两个数组是否有相同的站点
                                                startStopRouteStops.forEach(function(startStopRouteStop){
                                                    endStopRouteStops.forEach(function(endStopRouteStop){
                                                        if(startStopRouteStop.stopName === endStopRouteStop.stopName && startStopRouteStop.route !== endStopRouteStop.route){
                                                            transferTimes = 1;
                                                            transferMethods.push({
                                                                // 第一次乘坐的线路
                                                                firstBus: startStopRouteStop.route,
                                                                // 第二次乘坐的线路
                                                                secondBus: endStopRouteStop.route,
                                                                // 第一次换乘的公交站
                                                                transferStop: startStopRouteStop.stopName
                                                            });
                                                        }
                                                    });
                                                });
                                                if(transferTimes === 1){
                                                    callback(null,transferTimes, transferMethods);
                                                }else{
                                                    // 换乘2次
                                                    startStopRouteStops.forEach(function(startStopRouteStop, startIndex){
                                                        endStopRouteStops.forEach(function(endStopRouteStop, endIndex){
                                                            // secondStopRoutes即通过第二个站点的线路
                                                            query.selectStop2(startStopRouteStop.stopName,function(secondStopRoutes){
                                                                query.selectStop2(endStopRouteStop.stopName,function(thirdStopRoutes){
                                                                    secondStopRoutes.forEach(function(secondStopRoute){
                                                                        thirdStopRoutes.forEach(function(thirdStopRoute){
                                                                            if(secondStopRoute === thirdStopRoute){
                                                                                transferTimes = 2;
                                                                                transferMethods.push({
                                                                                    // 第一次乘坐的线路
                                                                                    firstBus: startStopRouteStop.route,
                                                                                    // 第二次乘坐的线路
                                                                                    secondBus: secondStopRoute,
                                                                                    thirdBus: endStopRouteStop.route,
                                                                                    // 第一次换乘的公交站
                                                                                    transferFirstStop: startStopRouteStop.stopName,
                                                                                    transferSecondStop: endStopRouteStop.stopName
                                                                                });
                                                                            }
                                                                        });
                                                                    });
                                                                    if(startIndex === startStopRouteStops.length - 1 && endIndex === endStopRouteStops.length - 1){
                                                                        if(transferTimes === 2){
                                                                            callback(null, transferTimes, transferMethods);
                                                                        }else{
                                                                            callback('未查询到换乘方案!');
                                                                        }
                                                                    }
                                                                });
                                                            });
                                                        });
                                                    });
                                                }
                                            }

                                        });
                                    });
                                }
                            });
                        });
                    }
                }else{
                    //没有终点站
                    callback('未查询到此终点站！')
                }
            });
        }else{
            //没有起点站
            callback('未查询到此起点站！');
        }
    });
}

module.exports = transfer;