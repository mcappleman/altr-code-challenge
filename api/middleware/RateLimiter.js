'use strict'

const ip_hits = {}

var limiter = function (req, res, next) {

    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let method = req.method;
    let url = req.url;

    // Set some sort of unique key for the endpoint and ip address combination
    let key = method+url+ip;

    if (ip_hits[key] === null || ip_hits[key] === undefined){
        ip_hits[key] = 0;
    }

    // If this IP has hit the same endpoint 10 times return error response
    if (ip_hits[key] >= 10) {

        return res.status(429).send({
            status: 429,
            message: "Too many requests, please try again later."
        });

    }

    // If IP has not been hit 10 times, add a point
    ip_hits[method+url+ip] += 1;

    // After 1 minute, remove the point that was just added
    setTimeout(() => {
        ip_hits[key] = ip_hits[key]-1;
    }, 60*1000)

    next();

}

module.exports = {

    limiter

}