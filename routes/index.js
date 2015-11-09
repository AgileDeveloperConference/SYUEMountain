var express = require('express');
var router = express.Router();
var promise = require('jquery-deferred');

/* src */
var freeWayData = require('../src/freewayData');
var highWayData = require('../src/highwayData');
var contribute = require('../src/contribute');
var userData = require('../src/userData');
var contributeHistoryData = require('../src/contributeHistoryData');
var donateData = require('../src/donateData');
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

router.post('/Users/:fbUID/Paths', function (req, res){
	//For Test -> Jack's fbUID = 10203564158293237;
	var fbUID = req.params.fbUID;
  	var roadId = req.body.roadId;
	var result = {};
	console.log(roadId);
	if(roadId === null || roadId === undefined ){
		result = {
		    "resultCode": "E01",
		    "resultmsg" : "Error Params"
		};	
		res.json(result);
	}else{
		var data1 = userData.setPath(fbUID, roadId);
		promise.when(data1).done(function(){
			var arg = arguments;
			res.json(arg[0]);
		})		
	}
});

router.post('/Users/:userId/Paths/:roadId', function (req, res){
	var fbUID = req.params.userId;
  	var roadId = req.params.roadId;
  	var contributeValue = req.body.contributeValue;
	var result = {};
	if(contributeValue === null || contributeValue=== undefined ){
		result = {
		    "resultCode": "E01",
		    "resultmsg" : "Error Params"
		};	
		res.json(result);
	}else{
  		var dateStart = userData.getStartTime(fbUID);
	 	promise.when(dateStart).done(function(){
			var arg = arguments;
			if(arg[0].resultCode === "S01"){
				var data1 = contributeHistoryData.saveContributeHistory(fbUID, contributeValue, roadId, arg[0].DateStart);
				promise.when(data1).done(function(){
					var arg = arguments;
					argCount = arg.length;
					res.json(arg[0]);
				});				
			}else{
				res.json(arg[0]);
			}
		}); 		
	}
});
router.post('/Users/:fbUID/Donate', function(req, res) {
	var fbUID = req.params.fbUID;
	var charityID = req.body.charityID;
	var contributeValue = req.body.contributeValue;
	var result = {};

	// prevent stupid input
	if(fbUID === null || fbUID === undefined){
		result = {
		    "resultCode": "E01",
		    "resultmsg" : "Error Params"
		};
		res.json(result);	
	}else{
		var donate = donateData.saveData(fbUID,charityID,contributeValue);

		promise.when(donate).done(function(){
			var arg = arguments,
				argCount = arg.length;
			res.json(arg[0]);
		});
	}
});
router.get('/Users/:fbUID/DonateHistorys', function(req, res){
	var fbUID = req.params.fbUID;
	var result = {};
	//prevent stupid input
	if(fbUID === null || fbUID === undefined){
		result = {
		    "resultCode": "E01",
		    "resultmsg" : "Error Params"
		};
		res.json(result);	
	}else{
		var donate = donateData.queryData(fbUID);

		promise.when(donate).done(function(){
			var arg = arguments,
				argCount = arg.length;
			res.json(arg[0]);
		});
	}
});
router.get('/Users/:fbUID/ContributeHistorys', function(req, res) {
	var fbUID = req.params.fbUID;
	var result = {};
	var data1 = contributeHistoryData.getContributeHistorys(fbUID);

	promise.when(data1).done(function(){
		var arg = arguments;
				argCount = arg.length;
		// console.log(arg[0]);
		res.json(arg);
	})
});


module.exports = router;
