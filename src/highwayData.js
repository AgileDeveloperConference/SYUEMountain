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
		deferred.resolve(model);	
	});
	return deferred;
}


module.exports = {
	getHighwayData : function(title){
		return getData(title);
	}
}
