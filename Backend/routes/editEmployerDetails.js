//edit employer profile
const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");

router.post('/editEmployerDetails', checkAuth,function (req, res) {
   console.log("editEmployerDetails.....")
    let msg = {};
    msg.route = "editEmployerDetails";
    msg.body = req.body;
    //msg = req.body;
    kafka.make_request("employer", msg, function (err, results) {
        if (err) {
            console.log(err);
            return res.send({...results,err:err});
        }
        else {
            res.status(200).end("Employer Details Edited!");
            
        }
    });
});

module.exports = router;