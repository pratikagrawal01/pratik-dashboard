const envJson = require('../../json/env.json');
const enpoints = require('../../json/endpoints.json');
const logger = require('./Logger.js');

const CreateRequestParam = (jsonbody) => {
	
	const site = jsonbody.site;
	const environment = jsonbody.environment;
	const location = jsonbody.location;
	const api = jsonbody.api;
	const queryParam = jsonbody.queryParam;	
	var path=enpoints[site][location][api]['URL'];	
	var key = envJson[site][environment][location]['KEY'];

	if( typeof queryParam !== 'undefined' && api=='Query') {
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

module.exports.CreateRequestParam =  CreateRequestParam;
module.exports.LogRequest =  LogRequest;