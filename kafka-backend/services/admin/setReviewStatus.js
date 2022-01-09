"use strict";
const conn = require("../../config/mysql_connection");
require('../../models/Company');

const mongoose = require("mongoose");
const Company = mongoose.model("Company");

let setReviewStatus = async (req, callback) => {
  try {
    let response = {};
    let error = {};
    const { adminReviewStatus, reviewId, companyId } = req.body;
    const data = [adminReviewStatus, reviewId];

    const updateQuery =
      "update Review SET adminReviewStatus = ? WHERE reviewId = ?";
    conn.query(updateQuery, data, function (err, rows) {
      if (err) {
        console.log("Error occured while querying");
        error.status = 500;
        error.message = "Error occured while updating admin review status";
        error.data = err;
        callback(error, null);
      }
      if(adminReviewStatus === 'APPROVED'){
        let sql = 'select companyId,round(avg(Rating),1) as avgRating, round(avg(workHappinessScore),1) as avgWHScore, round(avg(learningScore),1) as avgLScore, round(avg(appraisalScore),1) as avgAppScore, round(avg(ceoApprovalRating),1) as avgCeoScore, count(Rating) as totalReviews from Review where companyId=?';
                conn.query(sql, [companyId], (err, results) => {
                    if (err) {
                        callback(err, null);
                    }
                    else if(results.length > 0){
                        console.log('update');
                        console.log(results[0].avgWHScore);
                        Company.updateOne({
                            companyId: companyId
                        }, {
                            $set: {
                                avgWorkHappinessScore: results[0].avgWHScore,
                                avgLearningScore: results[0].avgLScore,
                                avgAppreciationScore: results[0].avgAppScore,
                                noOfReviews: results[0].totalReviews,
                                companyAvgRating: results[0].avgRating,
                                ceoAvgRating: results[0].avgCeoScore
                            },
                        },{ upsert: true }, (error, data) => {
                    
                            if (error) {
                                console.log(error);
                            }else{
                                console.log('true');
                            }
                        });
                    }else{
                        console.log("no data");
                    }
                    console.log('Mongo DB success');
                  });
                }
      response.status = 200;
      response.reviews = rows;
      callback(null, response);
    });
  } catch (err) {
    callback("Unable to update admin review status", err);
  }
};

exports.setReviewStatus = setReviewStatus;