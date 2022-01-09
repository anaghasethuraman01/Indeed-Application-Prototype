"use strict";
require("../../models/Photo");
const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");

let setPhotoStatus = async (req, callback) => {
  try {
    let response = {};
    const { _id, photoAdminReviewedStatus } = req.body;
    Photo.findByIdAndUpdate(_id, {
      $set: {
        photoAdminReviewedStatus: photoAdminReviewedStatus,
      },
    })
      .then((result) => {
        response.status=200;
        response.photos = result;
        callback(null, response);
      })
      .catch((err) => {
        console.log("Error occurred while setting photo status");
        error.status = 500;
        error.message = "Error occured while setting photo status";
        error.data = err;
        callback(error, null);
      });
  } catch (err) {
    callback("Error occurred while setting company photo status", err);
  }
};

exports.setPhotoStatus = setPhotoStatus;