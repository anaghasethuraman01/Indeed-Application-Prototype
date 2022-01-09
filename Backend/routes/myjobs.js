"use strict";
const express = require("express");
const router = express.Router();
const conn = require("./../config/mysql_connection");
const kafka = require('../kafka/client');
const JobSeeker = require('../models/JobSeeker');

router.get("/api/savedjobs/:userId", async (req, res) => {
    let msg = {};
    //msg.re = req.params.customerId;
    msg.route = "savedjobs";
    msg.jobSeekerId = req.params.userId;
    kafka.make_request("jobseeker", msg, function (err, results) {
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

router.get("/api/appliedjobs/:userId", (req, res) => {
    let msg = {};
    //msg.re = req.params.customerId;
    msg.route = "appliedjobs";
    msg.userId = req.params.userId;
    kafka.make_request("jobseeker", msg, function (err, results) {
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
