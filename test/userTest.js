

'use strict'

// Assert Library
var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

// "lib"
var userModel = require('../src/userData');

describe("Save user in mongodb and set selected Path",function(){
		var id = "111111111",
			name = "Test",
			email = "test@gmail.com"
	it("Save user in mongodb",function(done){
		this.timeout(20000);

		userModel.deleteUser(id);	
		var userPromise = userModel.saveUser(id,name,email);
		userPromise.done(function(data){
			console.log(data);
			if(data.resultCode){
				assert("S01",data.resultCode);	
				done();
			}						
		})
	});
	it("Set selected Path",function(){
		this.timeout(20000);
		var setUserPathPromise = userModel.setUserPath(id,"1");
		setUserPathPromise.done(function(data){
			if(data.resultCode){
				assert("S01",data.resultCode);
				done();
			}	
		
	  })

  });
});
