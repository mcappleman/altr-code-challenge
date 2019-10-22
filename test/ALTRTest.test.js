'use strict';

var chai 		= require('chai');
var chaiHttp 	= require('chai-http');
var app         = require('../index');
var should      = chai.should();

chai.use(chaiHttp);

describe('GET /get/:data', () => {

    it('should return status of 200 for data=success', (done) => {

        chai.request(app)
            .get('/get/success')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        
    });

    it('should return status of 401 for data=failure', (done) => {

        chai.request(app)
            .get('/get/failure')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        
    });

});