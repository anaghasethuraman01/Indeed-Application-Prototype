// get applicants name for a job


const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");

router.post('/getApplicantsName', checkAuth, function (req, res) {
    console.log("getApplicantsName.....")
    let msg = {};
    msg.route = "getApplicantsName";
    msg.body = req.body;
    //msg = req.body;
    kafka.make_request("employer", msg, function (err, results) {
        if (err) {
            console.log(err);
            return res.send({ ...results, err: err });
        }
        else {
            res.status(200).end(results);

        }
    });
});

module.exports = router;