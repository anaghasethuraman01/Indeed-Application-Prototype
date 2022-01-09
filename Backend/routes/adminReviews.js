"use strict";
const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");

router.get('/api/getAdminReviews', checkAuth, function (req, res) {
   let msg = {};
   msg.route = "getAdminReviews";
   msg.query = req.query;
   kafka.make_request("admin", msg, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results, err: err});
       }
       else {
           res.status(200).json({ reviews: results.reviews, count: results.count});  
       }
   });
});

router.post('/api/setReviewStatus', checkAuth, function (req, res) {
   let msg = {};
   msg.route = "setReviewStatus";
   msg.body = req.body;
   kafka.make_request("admin", msg, function (err, results) {
       if (err) {
           console.log(err);
           return res.status(400).send({...results, err:err});
       }
       else {
          return res.status(200).json({ reviews: results.reviews});
       }
   });
});
  
module.exports = router;