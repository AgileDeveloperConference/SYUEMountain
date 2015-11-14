'use strict';

var promise = require('jquery-deferred');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var Donate = require('./model/donateModel');

function saveData(fbUID, charityID, contributeValue, deferred){
	var res = {};
	//contruct object

	var donate = new Donate ({
		fbUID: fbUID,
		date: Date.now(),
		charityID: charityID,
		contributeValue: contributeValue
	});

	donate.save(function(err){
		if(err){
			console.log(err);
		}else if(!err){
			res = {
				"resultCode": "S01",
				"resultmsg" : "Suceess"
			};
		deferred.resolve(res);
		}
	});
}
function deleteTestData(fbUID){
	Donate.remove({fbUID : fbUID},function(err){
	if(err){
		console.log(err);
	}else if(!err){
		//delete!
		console.log("test donate data has delete");
	}
	});
}
function queryData(fbUID, deferred){
	var res = {};
	Donate.find({fbUID:fbUID},function(err,data){
		if (err) {console.log(err)};

		var result = [],
				length = data.length;
	    data.map(function(e,i) {
	    	var obj = {};
				obj.fbUID = e.fbUID;
				obj.date = Date.parse(e.date)/1000;
				obj.charityId = e.charityID;
				obj.contributeValue =  e.contributeValue;
				result.push(obj);
			if(i == length-1){
				deferred.resolve(result);
			}
	    });
	});
}
module.exports = {
	saveData : function (fbUID, charityID, contributeValue){
		var deferred = new promise.Deferred();
		saveData(fbUID, charityID, contributeValue, deferred);
		return deferred;
	},
	deleteTestData : function (fbUID){
		deleteTestData(fbUID);
	},
	queryData : function (fbUID){
		var deferred = new promise.Deferred();
		queryData(fbUID, deferred);
		return deferred;
	}

};
