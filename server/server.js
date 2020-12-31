const express = require('express');
const { addColors } = require('winston/lib/winston/config');
const app = express();
const PORT= process.env.PORT || 5000;
const logger = require('./routes/Logger.js'); 

const IndexRouter = require('./routes/lucid-index-api');
const AuthenticationRouter = require('./routes/UserAuthentication');
app.use(IndexRouter);
app.use(AuthenticationRouter.Router);

app.get('/',  function(req, res){
	res.send('<h1>Welcome to the node backend server!!!<br/>Please visit the Frontend server.</h1>');
});


app.listen(PORT, function() {
	logger.info(`node started to listen in ${PORT}`);	
});

