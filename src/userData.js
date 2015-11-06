'use strict';

var http = require("http");
var FB = require('fb');
var promise = require('jquery-deferred');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var User = require('./model/userModel');

function saveUser(fbUID, name, email, dtd){
	User.findOne({ fbUID: fbUID }, function(err, user) {
	    	var res = {};
			if(err) { console.log(err); }
			// console.log(user);
			if (!err ) {

				if(user==null){
					// user not exist , sign up 
					console.log("user not exist");

					console.log("start storing...");
					var user = new User({
						fbUID: fbUID,
						name: name,
						email: email,
						//created: Date.now(),
						contributeValue : 0,
						roadId : 0,
						DateStart:0,
						DateEnd :0,
						isSuccess:false,
						created : Date.now()

					});

					user.save(function(err) {
						if(err) {
							console.log(err);
						} else {
							console.log("saving user ...");
							res = {
								fbUID:fbUID,
								name:name,
								email:email,
								succeed:true
							};
							dtd.resolve(res);
						};
					});

				}else{
					// user has exist 
					res = {
						errorMsg:"Already exist!",
						succeed:false
					};
					dtd.resolve(res);
			 
				}
			}
		});
}	
function setPath(fbUID, roadId){
	User.findOne({	fbUID : fbUID}, function(err, user){
			// catch error
			if(err) { console.log(err); }			
			else{
				// not error occur
				console.log("find fbUid!");

			}

	});
}
function getFBUID(accessToken){
	var deferred = new promise.Deferred();
	FB.api('me', { fields: ['id', 'name', 'email'], access_token: accessToken }, function (res) {
	    	saveUser(res.id,res.name,res.email,deferred);
			console.log(res);
	});
	return deferred;
}

module.exports = {
	getFBUID:function(accessToken){
		return getFBUID(accessToken);
	}
};
