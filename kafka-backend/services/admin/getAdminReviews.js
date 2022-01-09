"use strict";
const conn = require("../../config/mysql_connection");
require("../../models/Photo");

let getAdminReviews = async (req, callback) => {
  try {
    let response = {};
    let error = {};
    const params = JSON.parse(req.query.data);
    const postsPerPage = 5;
    const currentPage = params.currentPage;
    const offset = 5 * (currentPage - 1);
    const condition = "PENDING_APPROVAL";
    const query =
      "SELECT r.*, c.companyName FROM Review r, Company c WHERE r.companyId = c.companyId and r.adminReviewStatus = ? order by r.postedDate LIMIT ?,?";
    const count =
      "SELECT COUNT(*) AS total FROM Review WHERE adminReviewStatus = ?";
    conn.query(query, [condition, offset, postsPerPage], function (err, rows) {
      if (err) {
        console.log("Error occured while querying for admin reviews" + err);
        error.status = 500;
        error.message = "Error occured while querying for admin reviews";
        error.data = err;
        callback(error, null);
      } else {
        conn.query(count, condition, function (err, rows2) {
          if (err) {
            console.log("Error occured while querying for admin reviews" + err);
            error.message="Error occured while querying for admin reviews"
            callback(error, null);
          }
          response.status = 200;
          response.reviews = rows;
          response.count = rows2[0].total;
          callback(null, response);
        });
      }
    });
  } catch (err) {
    callback("Unable to get company reviews", err);
  }
};

exports.getAdminReviews = getAdminReviews;