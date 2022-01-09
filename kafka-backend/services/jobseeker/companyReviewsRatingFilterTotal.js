const connection = require("../../config/mysql_connection");
var mysql = require("mysql");
const url = require('url');
let companyReviewsRatingFilterTotal = async (req, callback) => {
    try {
        const queryObject = url.parse(req.url,true).query;
        const adminReviewStatus = 'APPROVED';
        const rating = queryObject.ratingSel;
        let sql = '';
        let data = [];
        if(rating != null && rating !== '' && rating !== undefined){
            sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.isFeatured=1 and r.adminReviewStatus=? and rating=?' ;
            data = [adminReviewStatus, rating];
        }else{
            sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.isFeatured=1 and r.adminReviewStatus=?' ;
            data = [adminReviewStatus];
        }
        console.log(sql);
        connection.query(sql, data, (err, results) => {
            if (err) {
                callback(err, null);
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
exports.companyReviewsRatingFilterTotal = companyReviewsRatingFilterTotal;



