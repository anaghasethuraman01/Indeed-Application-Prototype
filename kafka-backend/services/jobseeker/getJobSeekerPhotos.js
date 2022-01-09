const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");
//const { checkAuth } = require("../config/passport");

const getJobSeekerPhotos = async (req, callback) => {
  let response = {};
  let error = {};
  const query = JSON.parse(req.data);
  const jobSeekerId = query.jobSeekerId;
  console.log(query);
  try {
    Photo.find({ jobSeekerId: jobSeekerId })
      .then((result) => {
        Photo.find({ jobSeekerId: jobSeekerId })
          .count()
          .then((r1) => {
            console.log(result);
            response.status = 200;
            response.photos = result;
            response.count = r1;
            return callback(null, response);
          });
      })
      .catch((err) => {
        console.log("Error occured while querying");
        error.status = 500;
        error.message =
          "Error occurred while retrieving photo details of jobSeeker";
        error.data = err;
        return callback(error, null);
      });
  } catch {
    (err) => {
      error.status = 500;
      error.message =
        "Error occurred while retrieving photo details of jobSeeker";
      error.data = err;
      return callback(error, null);
    };
  }
};

exports.getJobSeekerPhotos = getJobSeekerPhotos;
