'use strict';

var http = require("http");
var cheerio = require("cheerio");
var promise = require('jquery-deferred');

var model = require("./model/trafficModel")();
model.title = "雪山隧道";
model.name = "國道五號";
model.roadId = "4";

var url ="http://pda.freeway.gov.tw/m2/pdatraveltime/calc/r/1/fw/10050/fl/0/tw/10050/tl/38600";
var distance = 38.6;

function downloadData(url,callback){
	http.get(url,function(res){
		var data = "";
		res.on('data',function(chunk){
			data += chunk;
		});

		res.on('end',function(){
			callback(data);
		});
	}).on('error',function(){
		console.log('Error~~~');
	});
}


function getData(){
	var deferred = new promise.Deferred();
	downloadData(url,function(data){
		if(!data)
			return;
	
		var $ = cheerio.load(data);
		var tem_avg = 0;
		var count =0;
		$('.route_speed').each(function(i,e){
			count ++;
			tem_avg += parseInt($(e).text());
		});

		var avgSpeed = tem_avg/count;
		model.roadId = "4";
		model.trafficStatus = getTrafficStatusBySpeed(avgSpeed);
		model.contributeValue = contributeCalcu(avgSpeed);
		model.spendTime = Math.round( distance/(avgSpeed/60));
		model.speed = avgSpeed;
		deferred.resolve(model);	
	});
	return deferred;
}

function getTrafficStatusBySpeed(speed){

	if(speed >= 70)
		return "G";
	if(speed >= 40)
		return "Y";
	if(speed < 40)
		return "R";

}

function contributeCalcu(avgSpeed){
	return 0;
}

module.exports = {
	getSnowData:function(){
		return getData();
	}
};
