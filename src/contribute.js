
'use strict';


function setContributes(result){
	var snowMoutain = findTarget("雪山隧道",result);
	if(snowMoutain.speed <= 40){
		calcContributes(result);
	}else{
		noContributes(result);
	}	
}

function calcContributes(result){
	var count = result.length,
			score = 100;
	result.sort(sortNumber);
	console.log(result);
	for (var i=0;i<count;i++){
		if(result[i].title !== "雪山隧道"){
			result[i].contributeValue = score - 20;
			score = score - 20;
		}
	}
	console.log(result);
}

function sortNumber(a,b){
	return b.speed - a.speed;
}

function noContributes(result){
	var count = result.length;
	for (var i=0;i<count;i++){
		result[i].contributeValue = 0;
	}
}

function findTarget(title,result){
	var count = result.length;
	for (var i=0;i<count;i++){
		if(result[i].title == title)
			return result[i];
	}
}

module.exports = {
	setContributes:function(result){
		return setContributes(result);
	}
};
