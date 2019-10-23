'use strict';

const RateLimiter   = require('../api/middleware/RateLimiter');

const chai 		    = require('chai');
const chaiHttp 	    = require('chai-http');
const app           = require('../index');
const should        = chai.should();

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
                res.should.have.status(401);
                done();
            });
        
    });

    it('should return status of 429 for the same endpoint and ip address after 10 tries', (done) => {

        for (let i = 0; i < 10; i++) {
            chai.request(app)
                .get('/get/nope')
                .end((err, res) => {
                    res.should.have.status(401);
            });
        }

        setTimeout(() => {
            chai.request(app)
                .get('/get/nope')
                .end((err, res) => {
                    res.should.have.status(429);
                    done();
            });
        }, 1000);

    });

    it('should return status of 401 again a minute after first 429', (done) => {

        
        chai.request(app)
            .get('/get/401')
            .end((err, res) => {
                res.should.have.status(401);
                setTimeout(() => {
                    chai.request(app)
                        .get('/get/401')
                        .end((err, res) => {
                            res.should.have.status(401);
                            done();
                        });
                }, (60*1000)+1);
        });
        for (let i = 0; i < 9; i++) {
            chai.request(app)
                .get('/get/401')
                .end((err, res) => {
                    res.should.have.status(401);
            });
        }

        setTimeout(() => {
            chai.request(app)
                .get('/get/401')
                .end((err, res) => {
                    res.should.have.status(429);
            });
        }, 1000);

    });

});

describe('Middleware RateLimiter', () => {

    it('should be a function', (done) => {

        let rate_limiter = RateLimiter.limiter;
        (typeof(rate_limiter)).should.equals('function');
        done();

    });

});