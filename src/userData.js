'use strict';

var http = require("http");
var FB = require('fb');
var promise = require('jquery-deferred');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

// DB stuff
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       
var mongodbUri = 'mongodb://tony:tony123@ds045464.mongolab.com:45464/agilemount';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

// Connect to the db
mongoose.connect(mongooseUri, options);
var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));
var User = mongoose.model('User',{
	fbUID : String,
	name : String
});

function saveUser(fbUID,name){
	process.nextTick(function() {
	    User.findOne({ fbUID: fbUID }, function(err, user) {
			if(err) { console.log(err); }
			console.log(user);
			if (!err && user != null) {
				done(null, user);
			} else {
				console.log("start storing...");
				var user = new User({
					fbUID: fbUID,
					name: name,
					created: Date.now()
				});

				user.save(function(err) {
					if(err) {
						console.log(err);
					} else {
						console.log("saving user ...");
						done(null, user);
					};
				});
			};
		});
	});
}	

function getFBUID(accessToken){
	var deferred = new promise.Deferred();
	FB.api('me', { fields: ['id', 'name'], access_token: accessToken }, function (res) {
	    saveUser(res.id,res.name);
	    deferred.resolve(res);
	});
	return deferred;
}

module.exports = {
	getFBUID:function(accessToken){
		return getFBUID(accessToken);
	}
};
