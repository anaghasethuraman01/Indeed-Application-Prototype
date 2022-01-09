const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
router.get('/getAllUsrReviews', function (req, res) {
    console.log('I am here')
    let msg = {};
    //msg.re = req.params.customerId;
    msg.route = "getAllUsrReviews";

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