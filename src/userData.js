'use strict';

var http = require("http");
var FB = require('fb');
var promise = require('jquery-deferred');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var User = require('./model/userModel');

// // DB stuff
// var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
//                 replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       
// var mongodbUri = 'mongodb://tony:tony123@ds045464.mongolab.com:45464/agilemount';
// var mongooseUri = uriUtil.formatMongoose(mongodbUri);

// // Connect to the db
// mongoose.connect(mongooseUri, options);
// var conn = mongoose.connection;             
 
// conn.on('error', console.error.bind(console, 'connection error:'));
// var User = mongoose.model('User',{
// 	fbUID : String,
// 	name : String,
// 	email : String
// });

function saveUser(fbUID,name,email,dtd){
	    User.findOne({ fbUID: fbUID }, function(err, user) {
	    	var res = {};
			if(err) { console.log(err); }
			// console.log(user);
			if (!err) {
				res = {
					errorMsg:"Wrong!",
					succeed:false
				};
				dtd.resolve(res);
			} else {
				console.log("start storing...");
				var user = new User({
					fbUID: fbUID,
					name: name,
					email: email,
					created: Date.now()
				});

				user.save(function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log("saving user ...");
						res = {
							id:fbUID,
							name:name,
							email:email,
							succeed:true
						};
						dtd.resolve(res);
					};
				});
			};
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
