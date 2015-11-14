var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var config = require('../../config');

var Schema = mongoose.Schema;

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };       
var mongodbUri = config.dbURL;
var mongooseUri = uriUtil.formatMongoose(mongodbUri);


if(mongoose.connection.readyState == 0){
  mongoose.connect(mongooseUri, options);
}
module.exports = mongoose.model('DonateHistory',new Schema({
		fbUID : String,
		date : Date,
		charityID : Number,
		contributeValue:Number
}));
