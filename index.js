'use strict'

var express  	= require('express');
var app      	= express();

const ROOT_DIR = process.env.ROOT_DIR = __dirname;

app.use((req, res, next) => {

	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	res.removeHeader('x-powered-by');
	next();

});

var rate_limiter = require(`${ROOT_DIR}/api/middleware/RateLimiter`);
app.use(rate_limiter.limiter);

var apiRoutes = require(`${ROOT_DIR}/api/routes/ALTRRoutes`);

app.use('/', apiRoutes);

app.listen('8080');
console.log('Magic happens on port 8080');
exports = module.exports = app;

