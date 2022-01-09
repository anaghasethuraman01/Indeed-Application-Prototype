//job seeker API for viewing company reviews
const { checkAuth } = require("../config/passport");
const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');

router.get("/reviewsByProfilePaginated", checkAuth, (req, res) => {

    let msg = {};
    msg.route = "reviewsByProfilePaginated";
    msg.url = req.url;

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

        }
        else {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });
});

router.get("/reviewsByProfile", checkAuth, (req, res) => {

    let msg = {};
    msg.route = "reviewsByProfile";
    msg.url = req.url;

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

            console.log("Review data length: ", JSON.stringify(results.data.length));
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
