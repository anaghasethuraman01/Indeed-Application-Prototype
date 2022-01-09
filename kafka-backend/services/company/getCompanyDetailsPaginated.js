// get company details for admin page
"use strict";
const conn = require("../../config/mysql_connection");

let getCompanyDetailsPaginated = async (req, callback) => {
  try {
    let response = {};
    const params = JSON.parse(req.query.data);
    const postsPerPage = 20;
    const currentPage = params.currentPage;
    const offset = 5 * (currentPage - 1);
    const query = "SELECT * FROM Company LIMIT ?, ?";
    const count = "SELECT COUNT(*) AS total FROM Company";
    conn.query(query, [offset, postsPerPage], (error, rows) => {
      if (error) {
        error.status = 500;
        error.message = "Error occured while getting company details";
        error.data = err;
        callback(error, null);
      } else {
        conn.query(count, function (err, rows2) {
          if (err) {
            error.status = 500;
            error.message = "Error occured while getting company details";
            error.data = err;
            callback(error, null);
          }
          response.status=200;
          response.companyDtls = rows;
          response.count = rows2[0].total;
          callback(null, response);
          //return res.status(200).json({ companyDtls: rows, count:rows2[0].total});
        });
      }
    });
  } catch (err) {
    callback(err, null);
  }
};
exports.getCompanyDetailsPaginated = getCompanyDetailsPaginated;

// router.get("/getCompanyDetailsPaginated", function (req, res) {
//     const params = JSON.parse(req.query.data)
//     const postsPerPage = 20;
//     const currentPage = params.currentPage;
//     const offset = 5*(currentPage-1)
//     const query = "SELECT * FROM Company LIMIT ?, ?";
//     const count = "SELECT COUNT(*) AS total FROM Company";
//     connection.query(query, [offset, postsPerPage], (error, rows) => {
//         if (error) {
//             res.status(400).send("Error occured while retrieving company details");
//         } else{
//             connection.query(count, function (err, rows2) {
//               if (err) {
//                 console.log("Error occured while querying"+err);
//                 return res.status(400).send("Error occurred while retrieving pending reviews");
//               }

//               return res.status(200).json({ companyDtls: rows, count:rows2[0].total});
//             })
//           }
//     });
// });
