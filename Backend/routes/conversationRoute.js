const express = require("express");
const router = express.Router();
var kafka = require("../kafka/client");
const { checkAuth } = require("../config/passport");

router.post("/api/saveConversation", checkAuth, async (req, res) => {
  let msg = {};
  msg.route = "saveConversation";
  msg.body = req.body;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      return res.status(results.status).json(results.savedConversation);
    }
  });
});

router.get("/api/getConversationById/:userId", checkAuth, async (req, res) => {
  let msg = {};
  msg.route = "getConversationById";
  msg.userId = req.params.userId;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      return res.status(results.status).json(results.details);
    }
  });
});

router.get("/api/getJobSeekerById/:jobSeekerId", checkAuth, async (req, res) => {
  let msg = {};
  msg.route = "getJobSeekerById";
  msg.jobSeekerId = req.params.jobSeekerId;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      return res.status(results.status).send(results.details);
    }
  });
});

router.get("/api/getEmployerById/:employerId", checkAuth, async (req, res) => {
  let msg = {};
  msg.route = "getEmployerById";
  msg.employerId = req.params.employerId;
  kafka.make_request("jobseeker", msg, function (err, results) {
    if (err) {
      console.log(err);
      return res.status(err.status).send(err.message);
    } else {
      return res.status(results.status).send(results.details);
    }
  });
});

module.exports = router;