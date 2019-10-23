'use strict'

var express = require('express');
var Router = new express.Router();

Router.get('/get/:data', async (req, res, next) => {

	try {

        let success = req.params.data.toLowerCase() === 'success';
        let result = {
            status: 401,
            message: 'Unauthorized'
        }

        if (success) {
            result = {
                status: 200,
                message: 'Happy Path'
            }
        }

        return res.status(result.status).send(result);

    } catch(e) {
        return res.send({
            status: 500,
            message: 'Something went terribly wrong'
        })
    }

});

module.exports = Router