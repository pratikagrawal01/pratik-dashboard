const cron = require('node-cron');
const https = require('https');

const logger = require('../public/js/custom/Logger.js');
const Util = require('../public/js/custom/Util.js');
const EmailNotification = require('../public/js/custom/EmailNotification.js');

/* check schedule to monitor Indexing history for BC and BD*/
cron.schedule('*/15 * * * *',function() {	
	checkScheduleApiHistory('BC','US','Item-Api-History',1);
	checkScheduleApiHistory('BC','CA','Item-Api-History',1);
	checkScheduleApiHistory('BD','US','Item-Api-History',1);
	checkScheduleApiHistory('BD','CA','Item-Api-History',1);
});

/* check schedule to monitor Index Prop history for BC*/
cron.schedule('0 2,12 * * *',function() {
    let checkDay=new Date().getDay();
	let checkHour=new Date().getHours();
	if( (checkDay==6 || checkDay ==0) && (checkHour==12) ){
		logger.info('Stage prop monitor will not run for BC at day '+ checkDay + ' and hour '+checkHour);
	}else {		
	    checkScheduleApiHistory('BC','US','Item-Stg-Live-History',4);
	    checkScheduleApiHistory('BC','CA','Item-Stg-Live-History',4);
    }
});

/* check schedule to monitor Index Prop history for BD*/
cron.schedule('0 3,10 * * *',function() {	
    let checkDay=new Date().getDay();
	let checkHour=new Date().getHours();
	if( (checkDay==6 || checkDay ==0)){
		logger.info('Stage prop monitor will not run for BD at day '+ checkDay + ' and hour '+checkHour);
	}else {
	    checkScheduleApiHistory('BD','US','Item-Stg-Live-History',4);
	    checkScheduleApiHistory('BD','CA','Item-Stg-Live-History',4);
    }
});


function checkScheduleApiHistory(site,location,api,checkHour){
	var jsonBody = {
                        application: 'api',
                        site: site,
                        environment: 'PROD',
                        location: location,
                        api: api
					};
	
	process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
		var dataString = '{"action": "start"}';
		const request = https.request(Util.CreateRequestParam(jsonBody), (response) => {																
																var dataQueue = "";
																response.on('data', (data) => {
																	dataQueue += data;																	
																});
																let checkTime = new Date(new Date().setHours(new Date().getHours() - checkHour));
																response.on('end', function() {
																	var myJson=JSON.parse(dataQueue);
																	if(myJson=='undefined' ||  myJson.length==0 || new Date(myJson[0].endTime) < checkTime){
																		let endTime=checkTime;
																		if(!myJson=='undefined' ||  !myJson.length==0 ){
																			endTime=new Date(myJson[0].endTime);
																		}																			
																		logger.error('Lucidworks '+ api.replace('-History','') + jsonBody.environment + ' for ' + jsonBody.site +jsonBody.location +" is not running since " + endTime.toLocaleString());
																		EmailNotification.SendEmailNotiification(api,endTime,site,location,jsonBody.environment);
																	}else {
																		logger.info('Lucidworks '+ api.replace('History','') + jsonBody.environment + ' for ' + jsonBody.site +jsonBody.location +" is running fine at " + new Date().toLocaleString());
                                                                    }
																});
														});
		request.on('error', (error) => {
				logger.error(error);
		});		
		
		request.write(dataString);
		request.end();	
}