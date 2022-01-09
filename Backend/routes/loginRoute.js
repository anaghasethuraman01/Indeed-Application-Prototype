"use strict";
const express = require("express");
const router = express.Router();
const { auth } = require("../config/passport");
const kafka = require('../kafka/client');
auth();

router.post("/api/login", (req, res) => {
    let msg = {};
    //msg.re = req.params.customerId;
    msg.route = "login";
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

module.exports = router;