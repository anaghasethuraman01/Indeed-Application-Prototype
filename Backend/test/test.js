//sample test.js
var supertest = require("supertest");
var app = require("../server");
var server = supertest.agent("http://localhost:5000");
var chai = require("chai");
chai.use(require("chai-http"));
var assert = require('assert');
describe('Indeed', function () {
    describe("Employer get Applicants Name", () => {
        it('Applicants name List',(done) => {
          server.post("/getApplicantsName")
                .send({ jobId:25,companyId:68 })
                .then(function (res) {
                   assert.equal(res.status, 200);
                    done();
                })
                .catch(done);
        });
      });
    describe("Company Details", () => {
        it('Get Company Details',(done) => {
          
          server.get("/getCompanyDetails")
                .send({  })
                .then(function (res) {
                   assert.equal(res.status, 200);
                    done();
                })
                .catch(done);
        });
      });
    // describe("Employer Profile", () => {
    //   it('Get Employer Profile',(done) => { 
    //       server.get("/getCompanyDetails")
    //             .send({  })
    //             .then(function (res) {
    //                assert.equal(res.status, 200);
    //                 done();
    //             })
    //             .catch(done);
    //     });
    // });     
})