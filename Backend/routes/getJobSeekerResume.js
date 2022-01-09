//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
const jobSeeker = require('../models/JobSeeker');

router.post('/getJobSeekerResume', function (req, res) {
    //var res = {status: '', jobseekerData : []};
    var jobseekerData = [];
    const jobSeekerId = req.body.id;
    console.log(req.body.id)

    jobSeeker.find({ jobSeekerId: req.body.id }, (error, getresume) => {

        if (error) {
            res.status = '500';
            callback(null, res)
        }
        if (getresume) {
            res.status(200).send(getresume[0].resumeUrl)
            //console.log(getresume[0].resumeUrl)
        }
    })

});
module.exports = router;






