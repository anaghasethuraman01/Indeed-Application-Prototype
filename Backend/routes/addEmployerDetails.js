//add employer profile
const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");

router.post('/addEmployerDetails',checkAuth, function (req, res) {
   console.log("addEmployerDetails.....")
    let msg = {};
    msg.route = "addEmployerDetails";
    msg.body = req.body;
    //msg = req.body;
    kafka.make_request("employer", msg, function (err, results) {
        if (err) {
            console.log(err);
            return res.send({...results,err:err});
        }
        else {
            res.status(200).end("Employer Details Added!");
            
        }
    });
});

module.exports = router;
