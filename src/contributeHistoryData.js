
'use strict';

var promise = require('jquery-deferred');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var contributeHistoryModel = require('./model/contributeHistoryModel');

function saveContributeHistory(userId,contributeValue,roadId,dateStart){
	var res = {};
	var deferred = new promise.Deferred();
	var contributeHistory = new contributeHistoryModel({
		fbUID : userId,
		contributeValue : contributeValue,
		roadId:roadId,
		DateStart : dateStart,
		DateEnd : Date.now(),
		iscuccess : true		
  	});
  	contributeHistoryModel.findOne({ DateStart: dateStart },function(err, user){
  		if(user !== null){
  			console.log(user);
			res = {
				resultCode:"S01",
				resultmsg:"Suceess and Exit!"
			};
			deferred.resolve(res);
  		}else{
			contributeHistory.save(function(err){
				if(err) {
					console.log(err);
					res = {
						resultCode:"E01",
						resultmsg:err
					};
				} else {
					console.log("saving user succed Contribute...");
					res = {
						resultCode:"S01",
						resultmsg:"Suceess"
					};
					deferred.resolve(res);
				};
		  	});
  		}
  	});
	return deferred;
}
function deleteContributeHistory(userId){
	contributeHistoryModel.remove({fbUID:userId},function(err,user){
		if(err){
			console.log(err);
 		}else{
			console.log('Success delete history');
    	}
	});
	
}

function getContributeHistorys(fbUID){
	var deferred = new promise.Deferred();
	contributeHistoryModel.find({fbUID:fbUID},function(err,user){
	    var allContributeValue = [];
	    var length = user.length;
	    user.map(function(e,i) {
	    	allContributeValue.push(e.contributeValue);
	    	
			if(i == length-1){
				deferred.resolve(allContributeValue);
			}
	    });
	});
	return deferred;
}

module.exports = {
	saveContributeHistory:function(userId,contributeValue,roadId,dateStart){
		return saveContributeHistory(userId,contributeValue,roadId,dateStart);
  	},
	deleteContributeHistory:function(userId){
		deleteContributeHistory(userId);
  	},
	getContributeHistorys: function(fbUID){
		return getContributeHistorys(fbUID);
	}
}

