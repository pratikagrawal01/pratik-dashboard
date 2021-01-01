const envJson = require('../public/json/env.json');
const enpoints = require('../public/json/endpoints.json');
const logger = require('./Logger.js');

const CreateRequestParam = (req) => {
	
	const site = req.body.site;
	const environment = req.body.environment;
	const location = req.body.location;
	const api = req.body.api;
	const queryParam = req.body.queryparam;	
	
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