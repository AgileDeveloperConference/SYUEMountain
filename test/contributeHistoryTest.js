


'use strict'

// Assert Library
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

// "lib"
var contributeHistoryModel = require('../src/contributeHistoryData');

describe("Set User complete path and Add contributeValue to History ",function(){
		var userId = "111111111",
				contributeValue = 80,
				roadId = "1",
				dateStart = Date.now();
	it("Save contributeHistory in mongodb",function(done){
		this.timeout(20000);
		contributeHistoryModel.deleteContributeHistory(userId);
		var historyPromise = contributeHistoryModel.saveContributeHistory(userId,contributeValue,roadId,dateStart);
		historyPromise.done(function(data){
			console.log('contribute history')
			console.log(data);
			if(data.resultCode){
				assert("S01",data.resultCode);	
				done();
			}						
		})
	});

});
