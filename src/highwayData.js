'use strict';
	
//lib
var bing = require('../lib/binMap');
var http = require("http");
var promise = require('jquery-deferred');

//model
var model = require("./model/trafficModel")();
var path = require('./model/pathData');

//Main

function downloadData(locations,callback){
	bing.getDrivingRoute(locations,function(err,response){
		callback(response);
	});
}

function getData(title){
	var highwayInfo = path[title],
			locations = highwayInfo.locations,
			deferred = new promise.Deferred();
	downloadData(locations,function(data){
		if(!data)
			return;
		model = {};
		model.roadId = highwayInfo.roadId;
		model.title = title;
		model.name = highwayInfo.name;
		model.spendTime =Math.round((data.resourceSets[0].resources[0].travelDuration)/60);
		//1 英哩等於 1.609344公里
		model.distance = Math.round((data.resourceSets[0].resources[0].travelDistance)*1.609344);
		model.speed = Math.round((model.distance/model.spendTime)*60);
		model.trafficStatus =getTrafficStatusBySpeed((model.distance/model.spendTime)*60);
		model.contributeValue = 100;
		model.checkPoints = [];
		var locationsCount = data.resourceSets[0].resources[0].routeLegs.length;	
		for (var i=0; i< locationsCount-1 ;i++){
			var point = data.resourceSets[0].resources[0].routeLegs[i].actualEnd.coordinates;
			var checkPoint = {x:point[0],y:point[1]};
			model.checkPoints.push(checkPoint);	
		}
		deferred.resolve(model);	
	});
	return deferred.promise();
}

function getTrafficStatusBySpeed(speed){

	if(speed >= 50)
		return "G";
	if(speed >= 30)
		return "Y";
	if(speed < 30)
		return "R";

}


module.exports = {
	getHighwayData : function(title){
		return getData(title);
	}
}
