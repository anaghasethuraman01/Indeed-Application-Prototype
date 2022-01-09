//job seeker API for viewing company reviews
const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");
const redisClient = require("../config/redisClient");

router.get("/companyReviewsPaginated", checkAuth, (req, res) => {

    let msg = {};
    msg.route = "companyReviewsPaginated";
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

router.get("/companyReviewsRatingSort", checkAuth, (req, res) => {
    let msg = {};
    msg.route = "companyReviewsRatingSort";
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

router.get("/companyReviewsDateSort", checkAuth, (req, res) => {

    let msg = {};
    msg.route = "companyReviewsDateSort";
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

router.get("/companyReviewsHelpfulSort", checkAuth, (req, res) => {

    let msg = {};
    msg.route = "companyReviewsHelpfulSort";
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

router.get("/companyReviewsRatingFilterTotal", checkAuth, (req, res) => {

    let msg = {};
    msg.route = "companyReviewsRatingFilterTotal";
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

router.get("/companyReviewsRatingFilter", checkAuth, (req, res) => {

    let msg = {};
    msg.route = "companyReviewsRatingFilter";
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

router.get("/companyReviews", checkAuth, (req, res) => {

    let msg = {};
    msg.route = "companyReviews";
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

router.post("/updateHelpfulCount", checkAuth, (req, res) => {

    let msg = {};
    msg.route = "updateHelpfulCount";
    msg.body = req.body;

    kafka.make_request("jobseeker", msg, function (err, results) {
        if (err) {
            res.writeHead(401, {
                'Content-Type': 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end("Helpful count updated successfully");
        }
    });
});

router.post("/saveReview", checkAuth, (req, res) => {

    let msg = {};
    msg.route = "saveReview";
    msg.body = req.body;

    kafka.make_request("jobseeker", msg, function (err, results) {
        if (err) {
            res.writeHead(401, {
                'Content-Type': 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else {
            const key = "/api/snapshot/" + req.body.companyId;
            redisClient.del(key);
            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            res.end("Review added successfully");
        }
    });
});

module.exports = router;