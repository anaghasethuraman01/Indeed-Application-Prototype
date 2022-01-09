const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");
const { checkAuth } = require("../config/passport");

router.get("/api/getAllPhotos/", checkAuth, async (req, res) => {
  let msg = {};
  msg.route = "getAllPhotos";
  msg.data = req.query.data;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      return res
        .status(results.status)
        .json({ photos: results.photos, count: results.count });
    }
  });
});

module.exports = router;