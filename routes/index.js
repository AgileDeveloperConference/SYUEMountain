var express = require('express');
var router = express.Router();
var promise = require('jquery-deferred');

/* src */
var freeWayData = require('../src/freewayData');
var highWayData = require('../src/highwayData');
var contribute = require('../src/contribute');
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
	
		contribute.setContributes(result);
	
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

router.post('/Paths', function (req, res){
	//For Test -> Jack's fbUID = 10203564158293237;
	var fbUID = req.body.fbUID;
    var roadId = req.body.roadId;

	var result = {};
	var data1 = userData.setUserPath(fbUID, roadId);
	
	promise.when(data1).done(function(){
		var arg = arguments;
				argCount = arg.length;
		// console.log(arg[0]);
		res.json(arg[0]);
	})
});

module.exports = router;
