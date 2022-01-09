"use strict";
require("../../models/Photo");
const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");

let getAdminPhotos = async (req, callback) => {
  try {
    let response = {};
    let error = {};
    const query = JSON.parse(req.query.data);
    const photoAdminReviewedStatus = query.photoAdminReviewedStatus;
    const postsPerPage = 5;
    const currentPage = query.currentPage;
    Photo.find({ photoAdminReviewedStatus: photoAdminReviewedStatus })
      .limit(postsPerPage)
      .skip(postsPerPage * (currentPage - 1))
      .then((result) => {
        Photo.find({ photoAdminReviewedStatus: photoAdminReviewedStatus })
          .count()
          .then((r1) => {
            response.photos = result;
            response.count = r1;
            response.status = 200;
            callback(null, response);
          });
      })
      .catch((err) => {
        console.log("Error occured while querying");
        error.status = 500;
        error.message = "Error occurred";
        error.data = err;
        callback(error, null);
      });
  } catch (err) {
    callback("Cannot get company photos", err);
  }
};

exports.getAdminPhotos = getAdminPhotos;