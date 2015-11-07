'use strict'

// Assert Library
var chai = require('chai');
var expect = chai.expect;

// "lib"
var freewayData = require('../src/freewayData');

describe("Get Remote data and parse to model",function(){
	it("Get Remote Data",function(done){
		this.timeout(20000);
		var getData = freewayData.getSnowData();
		getData.done(function(data){
			done();
		})
	});
});
