const mongoose = require("mongoose");
require("../../models/Conversation");
const Conversation = mongoose.model("Conversation");
const conn = require("../../config/mysql_connection");

const saveConversation = async (req, callback) => {
  let response = {};
  let error = {};
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    response.status = 200;
    response.savedConversation = savedConversation;
    return callback(null, response);
  } catch (err) {
    error.status = 500;
    error.message = "Error occurred while saving conversation";
    error.data = err;
    return callback(error, null);
  }
};

const getConversationById = async (req, callback) => {
  let response = {};
  let error = {};
  try {
    const conversation = await Conversation.find({
      members: { $in: [Number(req.userId)] },
    });
    response.status = 200;
    response.details = conversation;
    return callback(null, response);
  } catch (err) {
    error.status = 500;
    error.message = "Error occurred while retrieving conversations";
    error.data = err;
    return callback(error, null);
  }
};

const getJobSeekerById = async (req, callback) => {
  let response = {};
  let error = {};
  const query = "select id, name from JobSeeker where id = ?";
  conn.query(query, [req.jobSeekerId], async function (err, rows) {
    if (err) {
      console.log("Error occurred while retreiving job seekers");
      error.status = 500;
      error.message = "Error occurred while retreiving job seekers";
      error.data = err;
      return callback(error, null);
    }
    console.log("Query executed: ", rows);
    response.status = 200;
    response.details = rows[0];
    console.log("sending response" + rows[0]);
    return callback(null, response);
  });
};

const getEmployerById = async (req, callback) => {
  let response = {};
  let error = {};
  const query = "select id, name from Employer where id = ?";
  conn.query(query, [req.employerId], async function (err, rows) {
    if (err) {
      console.log("Error occurred while retreiving employers");
      error.status = 500;
      error.message = "Error occurred while retreiving employers";
      error.data = err;
      return callback(error, null);
    }
    console.log("Query executed: ", rows);
    response.status = 200;
    response.details = rows[0];
    return callback(null, response);
  });
};

module.exports = {
  getEmployerById,
  getJobSeekerById,
  saveConversation,
  getConversationById,
};
