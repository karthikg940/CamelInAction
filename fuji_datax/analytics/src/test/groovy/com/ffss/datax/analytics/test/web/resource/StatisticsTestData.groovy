package com.ffss.datax.analytics.test.web.resource

class StatisticsTestData {

	static token = 'eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MTAwMSwidXNlck5hbWUiOiJqb2hudyIsIm9yZ0lkIjoxfQ.h5LJZRT1ATUM9Exl9yE73CsqkFaYE9qejEAcnoFfU6B4nEVsstppJofs0OynEyn31jDfeQOvSVr-V3uYtXm4Zg'

	static widgetTestData1=[results:[
			[id:'mystudies',type:'My Studies',total:0,status:['Assigned', 'In-Progress', 'Signed'],value:[0, 0, 0]],
			[id:'allstudies',type:'All Studies',total:6,status:['New','Assigned', 'In-Progress', 'Signed','QA-Assigned','QA-UnAssigned','Qa-InProgress','Submitted-to-EMR'],value:[0, 0, 1, 1, 1, 0, 0, 0]],
			[id:'qastudies',type:'My QA Reviews', total:0, status:['QA-Assigned','QA-InProgress'], value:[0, 0]]
		]]
	
	static widgetTestData2=[results:[
		[id:'mystudies',type:'My Studies',total:0,status:['Assigned', 'In-Progress', 'Signed'],value:[1, 0, 0]],
		[id:'allstudies',type:'All Studies',total:5,status:['New','Assigned', 'In-Progress', 'Signed','QA-Assigned','QA-UnAssigned','Qa-InProgress','Submitted-to-EMR'],value:[1, 0, 0, 0, 1, 1, 0, 0]],
		[id:'qastudies',type:'My QA Reviews', total:0, status:['QA-Assigned','QA-InProgress'], value:[0, 0]]
	]]
	
	static widgetTestData3=[results:[
		[id:'mystudies',type:'My Studies',total:0,status:['Assigned', 'In-Progress', 'Signed'],value:[0, 0, 0]],
		[id:'allstudies',type:'All Studies',total:0,status:['New','Assigned', 'In-Progress', 'Signed','QA-Assigned','QA-UnAssigned','Qa-InProgress','Submitted-to-EMR'],value:[0, 0, 0, 0, 0, 0, 0, 0]],
		[id:'qastudies',type:'My QA Reviews', total:0, status:['QA-Assigned','QA-InProgress'], value:[0, 0]]
	]]
}

