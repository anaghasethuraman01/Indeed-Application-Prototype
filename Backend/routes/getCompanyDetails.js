const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");

router.get('/getCompanyDetails', checkAuth, function (req, res) {
    let msg = {};
    msg.route = "getCompanyDetails";
    msg.body = req.body;
    kafka.make_request("company", msg, function (err, results) {
        if (err) {
            console.log(err);
            return res.send({ ...results, err: err });
        }
        else {
            res.status(200).end(results);

        }
    });
});

router.get('/getCompanyDetailsPaginated', checkAuth, function (req, res) {
    let msg = {};
    msg.route = "getCompanyDetailsPaginated";
    msg.query = req.query;
    kafka.make_request("company", msg, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(err.status).send({ ...results, err: err });
        }
        else {
            console.log("getting company data")
            res.status(results.status).json({ companyDtls: results.companyDtls, count: results.count });

        }
    });
});

// search company details using company name for admin page 
router.get('/searchAdminCompany', checkAuth, function (req, res) {
    let msg = {};
    msg.route = "searchAdminCompany";
    msg.query = req.query;
    kafka.make_request("company", msg, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(err.status).send({ ...results, err: err });
        }
        else {
            res.status(results.status).json({ companyDtls: results.companyDtls });
        }
    });
});

router.get('/companyJobStatistics', checkAuth, function (req, res) {
    let msg = {};
    msg.route = "companyJobStatistics";
    msg.query = req.query;
    kafka.make_request("company", msg, function (err, results) {
        if (err) {
            console.log(err);
            return res.status(400).send({ ...results, err: err });
        }
        else {
            console.log(results)
            res.status(200).json({ hired: results.hired, rejected: results.rejected });
        }
    });
});

module.exports = router;