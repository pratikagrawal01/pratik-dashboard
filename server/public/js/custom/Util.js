const envJson = require('../../json/env.json');
const enpoints = require('../../json/endpoints.json');
const logger = require('./Logger.js');
const CONSTANTS = require('./Constants.js');

const CreateRequestParam = (jsonbody) => {
	
	const site = jsonbody.site;
	const environment = jsonbody.environment;
	const location = jsonbody.location;
	const api = jsonbody.api;
	const queryParam = jsonbody.queryParam;	
	var path=enpoints[site][location][api]['URL'];	
	var key=envJson[site][environment][location]['KEY'];

	if( typeof queryParam !== 'undefined' && (api=='Query' || api=='Mega-Menu')) {
		path+=queryParam;		
		key = envJson[site][environment][location]['SEARCH_KEY'];
	} 	
	var headers = {};
	headers = {
		'Content-Type':'application/json',
		'Authorization':'Basic '+key
	};
	var options = {
					host: envJson[site][environment][location]['HOST'],
					path: path,
					method: enpoints[site][location][api]['METHOD'],
					headers: headers,
					proxy: 'http://etvappproxy01.qa.costco.web:80',
					port: 443											
	};	  
	return options;
}

const LogRequest = (req,res,next) => {
    logger.info(`User ${req.cookies['auth-user']} requested for : ${JSON.stringify(req.body)}`);
    next();
}

const isRequestAllowed=(req) => {
    const environment = req.body.environment;
    const api = req.body.api;
    if((environment == CONSTANTS._ENV_PROD || environment == CONSTANTS._ENV_PROD)){
        if(!api.includes(CONSTANTS._BUTTON_API_HISTORY) && api!=CONSTANTS._BUTTON_SEARCH_QUERY && api!=CONSTANTS._BUTTON_MEGA_MENU) {
            return false;	
        }			
    }
    return true;
}

module.exports.CreateRequestParam =  CreateRequestParam;
module.exports.LogRequest =  LogRequest;
module.exports.isRequestAllowed =  isRequestAllowed;