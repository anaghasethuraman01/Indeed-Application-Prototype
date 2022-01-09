const connection = require("../../config/mysql_connection");
var mysql = require("mysql");
const url = require('url');
require('../../models/Company');

const mongoose = require("mongoose");
const Company = mongoose.model("Company");
let saveReview = async (req, callback) => {
    try {
        console.log(req.body);
        let sql = 'INSERT INTO Review(reviewTitle, reviewerRole, city, state, postedDate, rating, workHappinessScore, learningScore, appraisalScore, reviewComments, pros, cons, ceoApprovalRating, howToPrepare, noHelpfulCount, yesReviewHelpfulCount, isFeatured, adminReviewStatus, jobSeekerId, companyId ) VALUES (?,?,?,?,now(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ';
        let data = [req.body.reviewTitle, req.body.reviewerRole, req.body.city, req.body.state, req.body.rating, req.body.workHappinessScore, req.body.learningScore, req.body.appreciationScore, req.body.reviewComments, req.body.pros, req.body.cons, req.body.ceoApprovalRating, req.body.howToPrepare, 0, 0, 0,'PENDING_APPROVAL', req.body.jobSeekerId, req.body.companyId];
        
        connection.query(sql, data, (err, results) => {
            if (err) {
                callback(err, null);
            }
            else{
                    var res = {};
                    res.data= "Review saved successfully";
                    res.status = '200';
                    callback(null, res);      
            }         
        });
        } catch(err) {
            
            callback('Cannot get reviews',err);
        }

};
exports.saveReview = saveReview;



