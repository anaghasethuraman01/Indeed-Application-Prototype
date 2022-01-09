'use strict'
const express = require('express')
const router = express.Router()
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");

router.get('/jobPosted', checkAuth,(req, res) => {
    console.log("Employer Analytics Chart One.....")
   let chrt = {};
   chrt.route = "getEmpChartOne";
   chrt.query = req.query;
    kafka.make_request("employer", chrt, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
          //  console.log(results)
           res.status(200).json(results)
           
       }
   });
});

router.get('/applicantsDetail', checkAuth, (req, res) => {
    console.log("Employer Analytics Chart Two.....")
   let chrt = {};
   chrt.route = "getEmpChartTwo";
   chrt.query = req.query;
    kafka.make_request("employer", chrt, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results,err:err});
       }
       else {
          //  console.log(results)
           res.status(200).json(results)
           
       }
   });
});

module.exports = router