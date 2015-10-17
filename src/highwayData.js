'use strict';
	
//lib
var bing = require('../lib/binMap');
var http = require("http");

var promise = require('jquery-deferred');
//model
var model = require("./model/trafficModel");

var path = require('./model/pathData');


function downloadData(title,callback){
	var locations = path[title];
	console.log(title);
	console.log(locations);
	bing.getDrivingRoute(locations,function(err,response){
		callback(response);
	});
}

function getData(title){
	var deferred = new promise.Deferred();
	downloadData(title,function(data){
		if(!data)
			return;
	
		deferred.resolve(data);	
	});
	return deferred;
}


module.exports = {
	getHighwayData : function(title,name){
		return getData(title,name);
	}
}
