// search company details using company name for admin page
"use strict";
const conn = require("../../config/mysql_connection");

let searchAdminCompany = async (req, callback) => {
  try {
    let response = {};
    let error = {};
    const searchTerm = "%" + req.query.data + "%";
    const query = "SELECT * FROM Company WHERE companyName LIKE ?";
    conn.query(query, [searchTerm], (err, rows) => {
      if (err) {
        error.status = 500;
        error.message = "Error occured while searching for company";
        error.data = err;
        callback(error, null);
      } else {
        response.status = 200;
        response.companyDtls = rows;
        callback(null, response);
      }
    });
  } catch (err) {
    callback(err, null);
  }
};

exports.searchAdminCompany = searchAdminCompany;
