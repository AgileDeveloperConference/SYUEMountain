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
module.exports = {
	saveData : function (fbUID, charityID, contributeValue){
		var deferred = new promise.Deferred();
		saveData(fbUID, charityID, contributeValue, deferred);
		return deferred;
	}
};