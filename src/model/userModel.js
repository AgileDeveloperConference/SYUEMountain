var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uriUtil = require('mongodb-uri');
var config = require('../../config');

// DB stuff
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       
var mongodbUri = config.dbURL;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

// Connect to the db

if(mongoose.connection.readyState == 0){
  mongoose.connect(mongooseUri, options);
}

console.log(mongoose.connection.readyState);
module.exports = mongoose.model('User',new Schema({
		fbUID : String,
		name : String,
		email : String,
		contributeValue : Number,
		roadId : Number,
		DateStart:Number,
		DateEnd :Number,
		isSuccess:Boolean,
		createTime : Number
}));
