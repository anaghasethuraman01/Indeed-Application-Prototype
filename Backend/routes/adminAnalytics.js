'use strict'
const express = require('express')
const router = express.Router()
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");

router.get('/revPerDay', checkAuth, (req, res) => {
    console.log("Admin Analytics Chart One.....")
    let chrt = {};
    chrt.route = "getChartOne";
    chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
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

router.get('/mostRevComp', checkAuth, (req, res) => {
    console.log("Admin Analytics Chart Two.....")
    let chrt = {};
    chrt.route = "getChartTwo";
    chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
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

router.get('/topAvgRatingComp', checkAuth, (req, res) => {
    console.log("Admin Analytics Chart Three.....")
    let chrt = {};
    chrt.route = "getChartThree";
    chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
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

router.get('/acceptedRev', checkAuth, (req, res) => {
    console.log("Admin Analytics Chart Four.....")
    let chrt = {};
    chrt.route = "getChartFour";
    chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
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

router.get('/ceoRating', checkAuth, (req, res) => {
    console.log("Admin Analytics Chart Five.....")
    let chrt = {};
    chrt.route = "getChartFive";
    chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
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

router.get('/countPerDay', checkAuth, (req, res) => {
    console.log("Admin Analytics Chart Six.....")
    let chrt = {};
    chrt.route = "getChartSix";
    chrt.query = req.query;
    kafka.make_request("admin", chrt, function (err, results) {
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

module.exports = router;