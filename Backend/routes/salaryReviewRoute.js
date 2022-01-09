'use strict'
const express = require('express')
const router = express.Router()
const kafka = require('../kafka/client');
const { checkAuth } = require('../config/passport')

router.get('/jobSeeker/getSalaryReview', checkAuth,(req, res) => {
    console.log("Get Salary Review.....")
    let chrt = {};
    chrt.route = "getSalaryReview";
    chrt.query = req.query;
    kafka.make_request("company", chrt, function (err, results) {
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

router.post('/jobSeeker/postSalaryReview',checkAuth, (req, res) => {
    console.log("Add Salary Review.....")
    let chrt = {};
    chrt.route = "addSalaryReview";
    chrt.body = req.body;
    kafka.make_request("company", chrt, function (err, results) {
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