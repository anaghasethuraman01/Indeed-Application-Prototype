//job seeker API for viewing company reviews
const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");

router.get("/allReviews", (req, res) => {

    let msg = {};
    msg.route = "allReviews";

    kafka.make_request("jobseeker", msg, function (err, results) {
        if (err) {
            res.writeHead(401, {
                'Content-Type': 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if (results.status === '200') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            console.log("Review data : ", JSON.stringify(results.data));
            res.end(JSON.stringify(results.data));

        } else {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });
});

router.post("/searchReview", (req, res) => {

    let msg = {};
    msg.route = "searchReview";
    msg.body = req.body;

    kafka.make_request("jobseeker", msg, function (err, results) {
        if (err) {
            res.writeHead(401, {
                'Content-Type': 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if (results.status === '200') {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            console.log("Review data : ", JSON.stringify(results.data));
            res.end(JSON.stringify(results.data));

        } else {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });
});

module.exports = router;