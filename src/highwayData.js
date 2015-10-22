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
		console.log(model);		
		model.title = title;
		model.name = highwayInfo.name;
		model.spendTime =Math.round((data.resourceSets[0].resources[0].travelDuration)/60);
		model.trafficStatus =getTrafficStatusBySpeed(((data.resourceSets[0].resources[0].travelDistance)/model.spendTime)*60);
		model.contributeValue = 100;
		deferred.resolve(model);	
	});
	return deferred;
}

function getTrafficStatusBySpeed(speed){

	if(speed >= 50)
		return "暢";
	if(speed >= 30)
		return "可";
	if(speed >= 20)
		return "微";
	if(speed < 20)
		return "塞";

}


module.exports = {
	getHighwayData : function(title){
		return getData(title);
	}
}
