const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const https = require('https');

const logger = require('./Logger.js');
const Util = require('./Util.js');
const CONSTANTS = require('./Constants.js');
const UserAuthentication = require('./UserAuthentication');

const router = express.Router();
const CheckUserAuthenticated = UserAuthentication.CheckUserAuthenticated;
const LogRequest= Util.LogRequest

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());

/* Makes call to Lucidworks for Index related APIs*/
router.post('/lcudiApi', LogRequest , CheckUserAuthenticated, function(req, res){
    const environment = req.body.environment;
    const api = req.body.api;
    if((environment == CONSTANTS._ENV_PROD || environment == CONSTANTS._ENV_PROD)){
        if(!api.includes(CONSTANTS._BUTTON_API_HISTORY) && api!=CONSTANTS._BUTTON_SEARCH_QUERY) {
            return res.jsonp(CONSTANTS._ERROR_PROD_NOT_AUTHORIZED);	
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