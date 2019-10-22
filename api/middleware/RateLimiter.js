'use strict'

module.exports = {

    limiter

}

const ip_hits = {}

const limiter = (req, res, next) => {

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let method = req.method;
    let url = req.url;

    console.log(`IP: ${url}\nMethod: ${method}\nURL: ${url}`);

    

}