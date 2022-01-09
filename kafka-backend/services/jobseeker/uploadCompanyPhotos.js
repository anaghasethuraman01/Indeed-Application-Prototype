const mongoose = require("mongoose");
require("../../models/Photo");
const Photo = mongoose.model("Photo");

const uploadCompanyPhotos = async (req, callback) => {
  let response = {};
  let error = {};
  try {
    const { jobSeekerId, companyId, companyName, imageLocation, photoAdminReviewedStatus } =
      req.body;
    console.log(req.body);
    const photoDtls = new Photo({
      jobSeekerId,
      companyId,
      companyName,
      imageLocation,
      photoAdminReviewedStatus,
    });
    photoDtls
      .save()
      .then((result) => {
        console.log(photoDtls);
        response.status = 200;
        response.photoDtls = photoDtls;
        console.log("photo dtls" + response.photoDtls);
        return callback(null, response);
      })
      .catch((err) => {
        error.status = 500;
        error.message = "Error while inserting photo details";
        error.data = err;
        return callback(error, null);
      });
  } catch (err) {
    error.status = 500;
    error.message = "Error";
    error.data = err;
    return callback(error, null);
  }
};

exports.uploadCompanyPhotos = uploadCompanyPhotos;
