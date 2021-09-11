const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = express.Router();
const logger = require('../public/js/custom/Logger.js');
const CONSTANTS = require('../public/js/custom/Constants.js');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());

const {OAuth2Client} = require('google-auth-library');
const { ConsoleTransportOptions } = require('winston/lib/winston/transports');
const CLIENT_ID='809312429334-6pqlrjvg3gnrmtlguge3akdk9155gt6e.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

router.post('/validateLogin',  function(req,res){	
    const token = req.body.token;
        async function verify() {
              const ticket = await client.verifyIdToken({
                  idToken: token,
                  audience: CLIENT_ID,  
              });
              const payload = ticket.getPayload();
              return ticket;
            }
            verify()
            .then((ticket)=>{
                const payload = ticket.getPayload();
                const domain =  payload['hd'];
                if(domain==CONSTANTS._DOMAIN){
                    res.cookie(CONSTANTS._SESSION_TOKEN, token);
                    res.cookie(CONSTANTS._AUTH_USER, payload['name']);
                    res.cookie(CONSTANTS._AUTH_PICTURE, payload['picture']);
                    res.cookie(CONSTANTS._AUTH_EMAIL, payload['email']);
                    res.jsonp(CONSTANTS._SUCCESS);
                }else {
                    res.jsonp(CONSTANTS._ERROR_AUTHENTICATION_FAILURE);
                }
            })
            .catch(console.error);		
    }); 

    
const CheckUserAuthenticated = (req,res,next) => {	
    const token = req.cookies[CONSTANTS._SESSION_TOKEN];
	async function verify() {
		  const ticket = await client.verifyIdToken({
			  idToken: token,
			  audience: CLIENT_ID,  
		  });
		  return ticket;
		}
		verify()
		.then((ticket)=>{
            const payload = ticket.getPayload();
            const domain =  payload['hd'];
            if(domain==CONSTANTS._DOMAIN){
                next();
            }else {
                res.jsonp(CONSTANTS._ERROR_AUTHENTICATION_FAILURE);
            }			
		})
		.catch(err=> {
			(console.error);		
			res.jsonp(CONSTANTS._ERROR_AUTHENTICATION_FAILURE);
		});	
};

    module.exports.Router = router;
    module.exports.CheckUserAuthenticated = CheckUserAuthenticated;