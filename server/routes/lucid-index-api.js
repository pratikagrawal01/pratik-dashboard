const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const https = require('https');
const router = express.Router();
const logger = require('./Logger.js');
const Util = require('./Util.js');
const UserAuthentication = require('./UserAuthentication');
const CheckUserAuthenticated = UserAuthentication.CheckUserAuthenticated;
const LogRequest= Util.LogRequest

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());

/* Makes call to Lucidworks for Index related APIs*/
router.post('/lcudiApi', LogRequest , CheckUserAuthenticated, function(req, res){
    const environment = req.body.environment;
    const api = req.body.api;
    if((environment == 'PROD' || environment == 'PERF')){
        if(!api.includes('History') && api!='Query') {
            return res.jsonp('You are not authorized to make Perf and Prod API calls.');	
        }			
    }
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
    var dataString = '{"action": "start"}';
    const request = https.request(Util.CreateRequestParam(req), (response) => {	
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

module.exports = router;