const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const https = require('https');

const logger = require('../public/js/custom/Logger.js');
const Util = require('../public/js/custom/Util.js');
const CONSTANTS = require('../public/js/custom/Constants.js');
const UserAuthentication = require('./UserAuthentication');

const contracts = require('../public/json/contracts.json');

const router = express.Router();
const CheckUserAuthenticated = UserAuthentication.CheckUserAuthenticated;
const LogRequest= Util.LogRequest

router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(cookieParser());

/* Makes call to Lucidworks for Index related APIs*/
router.post('/lucidApi', LogRequest , CheckUserAuthenticated, function(req, res){   
    if(!Util.isRequestAllowed(req)){
        return res.jsonp(CONSTANTS._ERROR_PROD_NOT_AUTHORIZED);	
    }
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    var dataString = '{"action": "start"}';
    const request = https.request(Util.CreateRequestParam(req.body), (response) => {	
                                                            var dataQueue = "";
                                                            response.on('data', (data) => {
                                                                dataQueue += data;
                                                            });
                                                            response.on('end', function() {
                                                                return res.jsonp(dataQueue);
                                                            });
                                                    });
    request.on('error', (error) => {
            logger.error(error);
    });		    
    request.write(dataString);
    request.end();		
});

/* Makes call to Lucidworks for Index related APIs*/
router.post('/getIndexCount', LogRequest , CheckUserAuthenticated, async function(req, res){
    if(!Util.isRequestAllowed(req)){
        return res.jsonp(CONSTANTS._ERROR_PROD_NOT_AUTHORIZED);	
    }   
    res.jsonp(await getIndexCallMediator(req));
});

async function getIndexCallMediator(req){     
    var outputData = [];            
    var contractList=contracts[req.body.site][req.body.location]['contracts']; 
    for(key in contractList){     
        var jsonData = {};  
        jsonData.Contract=contractList[key];           
        jsonData['Documents_en-'+req.body.location]=await getIndexCountApiCall(req,contracts[req.body.site][req.body.location]['queryParam1'],contractList[key]);
        if(req.body.location=='CA'){
            jsonData['Documents_fr-'+req.body.location]=await getIndexCountApiCall(req,contracts[req.body.site][req.body.location]['queryParam2'],contractList[key]);
        }
        outputData.push(jsonData);
    }
    return JSON.stringify(outputData);
}

async function getIndexCountApiCall(req,queryParam,contract){   
    var requsetBodyTemplate = req.body;
    requsetBodyTemplate['queryParam']=queryParam.replace('contract',contract); 
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;    
    var dataString = '{"action": "start"}';    
    return new Promise((resolve,reject) => {  
        const request = https.request(Util.CreateRequestParam(requsetBodyTemplate), (response) => {
                                                                var dataQueue = "";
                                                                response.on('data', (data) => {																		
                                                                    dataQueue += data;																	
                                                                });
                                                                response.on('end', function() {
                                                                    var responseJson=JSON.parse(dataQueue);
                                                                    return resolve(responseJson["response"]["numFound"]);
                                                                });
                                                        });
            request.on('error', (error) => {
                    logger.error(error);
                    return reject('');
            });	
            request.write(dataString);
            request.end();	
    }).catch(function () {
        console.log("Promise Rejected");
   });;		     
}

module.exports = router;