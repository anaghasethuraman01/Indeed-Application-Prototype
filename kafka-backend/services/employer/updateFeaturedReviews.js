const connection = require("../../config/mysql_connection");
var mysql = require("mysql");
const url = require('url');
require('../../models/Company');

const mongoose = require("mongoose");
const Company = mongoose.model("Company");
let updateFeaturedReviews = async (req, callback) => {
    try {
        let sql = 'UPDATE Review SET isFeatured = 1 WHERE reviewId = ?';
        let data = [req.body.reviewId];
        
        connection.query(sql, data, (err, results) => {
            if (err) {
                callback(err, null);
            }
            else{
                var res = {};
                res.data= "Featured review updated successfully";
                res.status = '200';
                callback(null, res);
            }
        });
    
    } catch(err) {
        
        callback('Cannot get reviews',err);
    }

};
exports.updateFeaturedReviews = updateFeaturedReviews;



