[![Build Status](https://travis-ci.org/AgileDeveloperConference/SYUEMountain.svg)](https://travis-ci.org/AgileDeveloperConference/SYUEMountain)

#SnowMoutain RESTFul Api

##Content-type:application/x-www-form-urlencoded 
=======

#SnowMoutain RESTFul Api 
---
## Post: /Users
###說明

	新增使用者，回應是否已成功
	
###Api Request

	Post http://snowmoutain-agiledc.rhcloud.com/Users
	{
			"accessToken" : CAAXeZCZBfea8cBAGwfothTMzL3PW5N1O53HjkhZCZBrNLjbA0aO1LvsvBCSy0ZBnZAcGZAPhtKFhYEMgi6vsekGtNNYpz8KOaNLb8PsXIoVZBxwGyg8iTbpYs9lHZB0x7nQZBYC4J1ZBRukcY2a4ASDni0tC0tBpJzEpxt6hM2mLRwUR7sJH8oh8E1viK82E2ee0VXm2SBM13LTQv4pstShbZAh3
	}
	

###Api Response
	
	Success 
	{
		"fbUID": "628531240583653",
		"name": "郭君君",
		"resultCode": S01,
		"resultmsg" : "Suceess"
	}
	
	Error{
		"resultCode": E01,
		"resultmsg" : "account already exist"
	}

###備註

	S01 : Success.
	E01 : Account already exit.
	E02 : Fb Token has expired.
		
---

## GET: /PathInfos
###說明

	取得前往宜蘭四條路線之資訊。
	* 雪山隧道
	* 北宜公路
	* 濱海公路
	* 北橫公路

###Api Request

	Get http://snowmoutain-agiledc.rhcloud.com/pathInfos

###Api Response

	[
		{
		 "roadId" : "1"
		 "title":"北宜公路",
		 "name":"台九線",
		 "spendTime":90,
		 "distance":75,
		 "speed":50,
		 "trafficStatus":"G",
		 "contributeValue":80,
		 "checkPoints":[
		 					{"x":24.952895,"y":121.54285},
		 					{"x":24.935089,"y":121.705532}
		 				]
		 }
	]

###備註
	
	roadId = {
		"北宜公路":"1",
		"濱海公路":"2",
		"北橫公路":"3",
		"雪山隧道":"4"
	}
	
---

##POST: /Users/{fbUID}/Paths
###說明
	
	使用者設定所選擇的路線

###Api Request

	Post http://snowmoutain-agiledc.rhcloud.com/Users/10203564158293237/Paths	
	{
		"roadId" : "1"
	}

###Api Response

	{
		"resultCode": S01,
		"resultmsg" : "Suceess"
	}

###備註

	S01:Success
	E03:FbUID isn't exist
	E04:Invaild roadId


###User(Collection)	

| fbUID           | name  | contributeValue  | roadId  | DateStart   | DateEnd      | isSucess | createTime    |
| :-------------: |:-----:|:----------------:| :------:| -----------:| :-----------:| :-------:| :------------:|
| 628531240583652 | 陳湯尼 |     50           |  1      | 1446880480  | 1446885080   |  true    | 1446884080    |


---

##POST: /Users/{fbUID}/Paths/{roadId}

###說明
	
	更新使用者路線檢查點狀態
	
###Api Request

	Post  
	http://snowmoutain-agiledc.rhcloud.com/Users/{fbUID}/Paths/{roadId}
	
	{
		"success" : true	,
		"contributeValue" : 80
	}

###Api Response

	{
		"resultCode": S01,
		"resultmsg" : "Suceess"
	}

###備註

	S01:Success
	E01:Fail

---
##POST: /Users/{fbUID}/Donate

###說明
	
	新增使用者捐獻
	
###Api Request

	Post  
	http://snowmoutain-agiledc.rhcloud.com/Users/{fbUID}/Donate
	
	{
		"charityID" : "1"	,
		"contributeValue" : 80
	}

###Api Response

	{
		"resultCode": S01,
		"resultmsg" : "Suceess"
	}

###備註

	S01:Success
	E01:Fail
	
	慈善機構ID對照表
		ID	機構
		1	紅十字會
		2	伊甸園
		3	陽光
		
---

##Get : /Users/{fbUID}/DonateHistorys

###說明

	查詢使用者捐記錄
	
###Api Request

	Get 
	http://snowmoutain-agiledc.rhcloud.com/Users/1/DonateHistorys

###Api Response
	
	[	
		{
			"fbUID" : "1",
			"date" : 20150101,
			"charityID" : "1",
			"contributeValue" : 100
		}
	]

###備註
	
	備註
	
	慈善機構ID對照表
		ID	機構
		1	紅十字會
		2	伊甸園
		3	陽光

---

## Get: /Users/{fbUID}/ContributeHistorys

###說明

	查詢使用者貢獻值
	
###Api Request

	Get 
	http://snowmoutain-agiledc.rhcloud.com/Users/1/ContributeHistorys

###Api Response

	{
		contributeValueTotal: 1000,
		path :[
			{
				"Date" : 20150101,
				"pathName" : "台二線",
				"contributeValue" : 1000	
			}
		
		] 
	
	}

###備註
	
	備註




