'use strict'

// Assert Library
var chai = require('chai');
var expect = chai.expect;

// "lib"
var freewayData = require('../src/freewayData');

describe("Get Remote data and parse to model",function(){
	if("Get Remote Data",function(done){
		var getData = freewayData.getSnowData();
		getData.done(function(data){
			console.log("Success");
			assert.equal(1,0);
			done();
		})
	});
});
