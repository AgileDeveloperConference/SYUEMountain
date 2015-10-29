var express = require('express');
var router = express.Router();
var promise = require('jquery-deferred');

/* src */
var freeWayData = require('../src/freewayData');
var highWayData = require('../src/highwayData');
var userData = require('../src/userData');
/* GET home page. */

router.get('/', function(req, res) {
  res.json('hello api');
});

router.get('/PathInfos',function(req,res){
	var result = [];
	var data1 = freeWayData.getSnowData();
	var data2 = highWayData.getHighwayData('北宜公路');
	var data3 = highWayData.getHighwayData('北橫公路');
	var data4 = highWayData.getHighwayData('濱海公路');
	promise.when(data1,data2,data3,data4).done(function(){
		var arg = arguments;
				argCount = arg.length;

		for (var i=0; i<argCount;i++){
			result.push(arg[i]);
		}
		console.log(result);
		res.json(result);
	})
});

router.post('/Users', function (req, res){
    var accessToken = req.body.accessToken;
	var result = {};
	var data1 = userData.getFBUID(accessToken);
	promise.when(data1).done(function(){
		var arg = arguments;
				argCount = arg.length;
		// console.log(arg[0]);
		res.json(arg[0]);
	})
});

module.exports = router;
