const express = require("express");
const router = express.Router();
const kafka = require("../kafka/client");
const { checkAuth } = require("../config/passport");

router.get("/api/getAllReviewsByCompanyId", checkAuth, function (req, res) {
  console.log("getAllReviewsByCompanyId.....");
  let msg = {};
  msg.route = "getAllReviewsByCompanyId";
  msg.query = req.query;
  kafka.make_request("company", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(400).send({ ...results, err: err });
    } else {
      console.log("all review by ID:" + JSON.stringify(results.reviews))
      res.status(200).json({ reviews: results.reviews, count: results.count });
    }
  });
});

module.exports = router;