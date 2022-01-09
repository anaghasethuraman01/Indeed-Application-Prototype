// search company details using company name for admin page
"use strict";
const conn = require("../../config/mysql_connection");

let companyJobStatistics = async (req, callback) => {
  try {
    let response = {};
    const companyId = Number(req.query.data);
    const hired = "Hired";
    const reject = "Rejected";
    const countQuery =
      "SELECT COUNT(*) as count, YEAR(appliedDate) as year FROM AppliedJobs WHERE companyId=? AND status=? GROUP BY YEAR(appliedDate)";
    conn.query(countQuery, [companyId, hired], (error, rows) => {
      if (error) {
        console.log(error);
        callback(error, null);
      } else {
        conn.query(countQuery, [companyId, reject], function (err, rows2) {
          if (err) {
            console.log("Error occured while querying" + err);
            callback(err, null);
          }
          response.hired = rows;
          response.rejected = rows2;
          callback(null, response);
        });
      }
    });
  } catch (err) {
    callback(err, null);
  }
};

exports.companyJobStatistics = companyJobStatistics;
