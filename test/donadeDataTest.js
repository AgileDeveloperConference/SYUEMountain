'use strict'

// Assert Library
var chai = require('chai');
var expect = chai.expect;

// "lib"
var donateData = require('../src/donateData.js');

describe("Save donate record",function(){

		var fbUID = "1234",
			charityID = 1,
			contributeValue = 50;
		it("Save donate record in mongodb",function(done){
			var dataPromise = donateData.saveData(fbUID,charityID,contributeValue);
			dataPromise.done(function(data){
				//success
				done(); 
			});
		});
});