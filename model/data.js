/**
 * Created by liuyuhang on 2016/3/13.
 */

var request = require('request');

var ak = 'nujdGfyYkNvASO0qa6pp12l5';
var data = {
  getDirection: function(url){
     request(url+'&ak='+ak,function(error, response, body){
        if(!error && response.status == 200){
            return body;
        }else{
            return response;
        }
     });
  }
};

module.exports = data;