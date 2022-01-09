const mongoose = require("mongoose");
require('../../models/Message');
const Message = mongoose.model("Message");
const conn = require("../../config/mysql_connection");

const addNewMessage = async (req, callback) => {
  let response = {};
  let error = {};
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    response.status = 200;
    response.savedMessage = savedMessage;
    return callback(null, response);
  } catch (err) {
    error.status = 500;
    error.message = "Error occurred while adding new message";
    error.data = err;
    return callback(error, null);
  }
};

const getMessagesByConversationId = async (req, callback) => {
  let response = {};
  let error = {};
  try {
    const messages = await Message.find({
      conversationId: req.conversationId,
    });
    console.log(messages);
    response.status = 200;
    response.messages = messages;
    return callback(null, response);
  } catch (err) {
    error.status = 500;
    error.message =
      "Error occurred while retrieving message by conversation id";
    error.data = err;
    return callback(error, null);
  }
};

const getAllJobSeekers = async (req, callback) => {
  let response = {};
  let error = {};
  console.log("inside get all job seekers services")
  const query = "select name as label, id as value from JobSeeker";
  conn.query(query, async function (err, rows) {
    if (err) {
      console.log("Error occurred while retreiving job seekers");
      error.status = 400;
      error.message = "Error occurred while getting dishes";
      error.data = err;
      return callback(error, null);
    }
    console.log("Query executed: ", rows);
    response.status = 200;
    response.details = rows;
    return callback(null, response);
  });
};

module.exports = {getAllJobSeekers, getMessagesByConversationId, addNewMessage}
