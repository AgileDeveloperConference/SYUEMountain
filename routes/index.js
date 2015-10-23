var express = require('express');
var router = express.Router();
var promise = require('jquery-deferred');

/* src */
var freeWayData = require('../src/freewayData');
var highWayData = require('../src/highwayData');

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

router.get('/SaveUser', function (req, res){
	res.json({
		succed:true
	});
});

module.exports = router;
