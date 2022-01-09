"use strict";
const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");
const { checkAuth } = require("../config/passport");
const redisClient = require("../config/redisClient");

router.get("/api/snapshot/:companyId", (req, res) => {
    let msg = {};
    //msg.re = req.params.customerId;
    msg.route = "snapshot";
    msg.companyId = req.params.companyId;
    const key = "/api/snapshot/" + req.params.companyId;
    console.log("Key for redis: " + key);
    redisClient.get(key, async (err, data) => {
        // If value for key is available in Redis
        if (data) {
            // send data as output
            console.log("snapshot key in redis: "+key);
            console.log("snapshot data from redis: "+data);
            return res.send(data);
        }
        // If value for given key is not available in Redis
        else {
            kafka.make_request("company", msg, function (err, results) {
                console.log("inside kafka");
                if (err) {
                    console.log("inside error");
                    return res.send({ ...results, err: err });
                }
                else {
                    redisClient.setex(key, 36000, JSON.stringify(results));
                    return res.send(results);
                }
            });
        }
    });
});

router.get("/api/featuredReviews/:companyId", (req, res) => {
    let msg = {};
    //msg.re = req.params.customerId;
    msg.route = "featuredReviews";
    msg.companyId = req.params.companyId;
    kafka.make_request("company", msg, function (err, results) {
        console.log("inside kafka");
        if (err) {
            console.log("inside error");
            return res.send({ ...results, err: err });
        }
        else {
            return res.send(results);
        }
    });
});

module.exports = router;