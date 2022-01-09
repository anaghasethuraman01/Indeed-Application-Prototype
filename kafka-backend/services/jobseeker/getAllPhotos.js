const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");
//const { checkAuth } = require("../config/passport");

const getAllPhotos = async (req, callback) => {
  let response = {};
  let error = {};
  const query = JSON.parse(req.data);
  const photoAdminReviewedStatus = query.photoAdminReviewedStatus;
  const companyId = query.companyId;
  const postsPerPage = 16;
  const currentPage = query.currentPage;

  try {
    Photo.find({
      companyId: companyId,
      photoAdminReviewedStatus: photoAdminReviewedStatus,
    })
      .limit(postsPerPage)
      .skip(postsPerPage * (currentPage - 1))
      .then((result) => {
        Photo.find({
          companyId: companyId,
          photoAdminReviewedStatus: photoAdminReviewedStatus,
        })
          .count()
          .then((r1) => {
            response.status = 200;
            response.photos = result;
            response.count = r1;
            return callback(null, response);
          });
      })
      .catch((err) => {
        console.log("Error occured while querying");
        error.status = 500;
        error.message = "Error occurred while retrieving all photos";
        error.data = err;
        return callback(error, null);
      });
  } catch {
    (err) => {
      error.status = 500;
      error.message = "Error";
      error.data = err;
      return callback(error, null);
    };
  }
};

exports.getAllPhotos = getAllPhotos;
