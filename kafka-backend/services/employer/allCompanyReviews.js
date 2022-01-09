const connection = require("../../config/mysql_connection");
var mysql = require("mysql");
const url = require('url');
require('../../models/Company');

const mongoose = require("mongoose");
const Company = mongoose.model("Company");
let allCompanyReviews = async (req, callback) => {
    try {
        const queryObject = url.parse(req.url,true).query;
        const adminReviewStatus = 'APPROVED';
        let sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.adminReviewStatus=?' ;
        console.log(sql);
        connection.query(sql, [adminReviewStatus], (err, results) => {
            if (err) {
                callback(error, null);
            }
            else if(results.length > 0){
                var res = {};
                res.data= results;
                res.status = '200';
                console.log("results :"+results);
                callback(null, res);
            }else{
                var res = {};
                res.data= "No reviews available";
                res.status = '400';
                callback(null, res);
            }
        });	
  
    } catch(err) {
        
        callback('Cannot get reviews',err);
    }

};
exports.allCompanyReviews = allCompanyReviews;



