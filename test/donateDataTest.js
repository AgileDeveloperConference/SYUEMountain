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
				//delete data just store
				donateData.deleteTestData(fbUID);

				done(); 

			});
		});
});
describe("Query donate record",function(){

		var data=[
			{"fbUID":"5678","charityID":1,"contributeValue":50},
			{"fbUID":"5678","charityID":2,"contributeValue":100}
		];

		it("Save data 1 donate record in mongodb",function(done){
			var dataPromise = donateData.saveData(data[0].fbUID,data[0].charityID,data[0].contributeValue);
			dataPromise.done(function(data){
				done(); 
			});
		});

		it("Save data 2 donate record in mongodb",function(done){
			var dataPromise = donateData.saveData(data[1].fbUID,data[1].charityID,data[1].contributeValue);
			dataPromise.done(function(data){
				done(); 
			});
		});

		// it("Compare the queryData is right or not",function(done){
		// 	var dataPromise = donateData.queryData(5678);
		// 	dataPromise.done(function(data){
		// 		//delete data just store
		// 		console.log(data)
		// 		done(); 
		// 	});
		// });
});