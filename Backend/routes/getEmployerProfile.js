// get employer profile
const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");

router.post('/getEmployerProfile', checkAuth, function (req, res) {
    console.log("getEmployerProfile.....")
    let msg = {};
    msg.route = "getEmployerProfile";
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