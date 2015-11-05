#SnowMoutainApi
---

### PathInfos
說明

	取得前往宜蘭四條路線之資訊。
	* 雪山隧道
	* 北宜公路
	* 濱海公路
	* 北橫公路

Api Request

	Get http://snowmoutain-agiledc.rhcloud.com/pathInfos

Api Response

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
	
	
---

##使用者所選擇的路線
說明
	
	使用者所選擇的路線

Api Request

	Post http://snowmoutain-agiledc.rhcloud.com/path	
	{
	   "roadId" : "1",
	   "userId" : "1" //拿fbUid	
	}


user

userId , roadId, contributeValue,  DateStart , DateEnd  ,isSucess
  1			  1                       20150101    
	
---

##更新使用完成該路線狀態

說明
	
	使用者是否成功完成該路線檢查點
	
Api Request

	Post  http://snowmoutain-agiledc.rhcloud.com/checkPath
	
	{
		"userId" : "1",
		"roadId" : "1",
		"success" : true	,
		"contributeValue" : 80
	}

user

userId , roadId, contributeValue, DateStart , DateEnd ,isSucess
  1			  1				80			  20150101   20150102  true


---

##取得使用者捐記錄

說明

	取得使用者捐記錄
	
Api Request

	Get http://snowmoutain-agiledc.rhcloud.com/contribution?userId='1'

Api Response
	
	[	
		{
			"userId" : "1",
			"date" : 20150101,
			"receiver" : "紅十字",
			"contributeValue" : 100
		}
	]

---

## 使用者貢獻值記錄

說明

	查詢使用者貢獻值
	
Api Request

	Get http://snowmoutain-agiledc.rhcloud.com/UserInfo?userId='1'

Api Response

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




