'use strict'
const express = require('express')
const router = express.Router()
const kafka = require('../kafka/client');

router.get('/findSalaries', (req, res) => {
    console.log("Details of find salary page.....")
    let chrt = {};
    chrt.route = "findSalDisplay";
    chrt.query = req.query;
    kafka.make_request("jobseeker", chrt, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(400).send({ ...results, err: err });
        }
        else {
            //  console.log(results)
            res.status(200).json(results)

        }
    });
});

router.get('/findSalByTitle/:jobTitles', (req, res) => {
    console.log("Find salary by title.....")
    let chrt = { "jobTitles": req.params.jobTitles };
    chrt.route = "findSalByTitleDisplay";
    chrt.query = req.query;
    kafka.make_request("jobseeker", chrt, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(400).send({ ...results, err: err });
        }
        else {
            //  console.log(results)
            res.status(200).json(results)

        }
    });
});

module.exports = router