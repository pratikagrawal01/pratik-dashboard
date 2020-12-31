const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = express.Router();
const logger = require('./Logger.js');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser());

const {OAuth2Client} = require('google-auth-library');
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
                if(domain=='costco.com'){
                    res.cookie('session-token', token);
                    res.cookie('auth-user', payload['name']);
                    res.jsonp('success');
                }else {
                    res.jsonp('Authentication Failure');
                }
            })
            .catch(console.error);		
    }); 

    
const CheckUserAuthenticated = (req,res,next) => {	
    const token = req.cookies['session-token'];
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
            if(domain=='costco.com'){
                next();
            }else {
                res.jsonp('Authentication Failure');
            }			
		})
		.catch(err=> {
			(console.error);		
			res.jsonp('Authentication Failure');
		});	
};

    module.exports.Router = router;
    module.exports.CheckUserAuthenticated = CheckUserAuthenticated;