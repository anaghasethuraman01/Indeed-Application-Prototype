"use strict";
const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');

router.post("/api/signup", (req, res) => {
  let msg = {};
  //msg.re = req.params.customerId;
  msg.route = "signup";
  msg.name = req.body.name;
  msg.email = req.body.email;
  msg.password = req.body.password;
  msg.accountType = req.body.accountType;
  kafka.make_request("user", msg, function (err, results) {
      console.log("inside kafka");
      if (err) {
          console.log("inside error");
          return res.send({...results,err:err});
      }
      else {
          return res.send(results);
      }
  });
});

router.post("/api/signupJobSeekerMongo", async (req, res) => {
  let msg = {};
  //msg.re = req.params.customerId;
  msg.route = "signupJobSeekerMongo";
  msg.jobSeekerId = req.body.jobSeekerId;
  msg.resumeUrl = req.body.resumeUrl;
  msg.jobPreference = req.body.jobPreference;
  msg.savedJobs = req.body.savedJobs;
  kafka.make_request("user", msg, function (err, results) {
      console.log("inside kafka");
      if (err) {
          console.log("inside error");
          return res.send({...results,err:err});
      }
      else {
          return res.send(results);
      }
  });
});


router.post("/api/createCompanyMongo", async (req, res) => {
  let msg = {};
  //msg.re = req.params.customerId;
  msg.route = "createCompanyMongo";
  msg.compid = req.body.compid;
  msg.companyname = req.body.companyname;
  msg.logo = req.body.logo;
  kafka.make_request("user", msg, function (err, results) {
      console.log("inside kafka");
      if (err) {
          console.log("inside error");
          return res.send({...results,err:err});
      }
      else {
          return res.send(results);
      }
  });  
});


module.exports = router;