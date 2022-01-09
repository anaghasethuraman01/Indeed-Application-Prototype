//edit company details
const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");
const redisClient = require("../config/redisClient");

router.post('/editCompanyDetails', checkAuth, function (req, res) {
    console.log("editCompanyDetails.....")
    let msg = {};
    msg.route = "editCompanyDetails";
    msg.body = req.body;
    //msg = req.body;
    kafka.make_request("employer", msg, function (err, results) {
        if (err) {
            console.log(err);
            return res.send({ ...results, err: err });
        }
        else {
            const key = "/api/snapshot/" + req.body.companyId;
            redisClient.del(key);
            res.status(200).end("Company Details Edited!");

        }
    });
});

module.exports = router;