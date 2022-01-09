const connection = require("../../config/mysql_connection");
var mysql = require("mysql");
const url = require('url');
let companyReviews = async (req, callback) => {
    try {
        const queryObject = url.parse(req.url,true).query;
        console.log("company id : "+queryObject.companyId);
        const adminReviewStatus = 'APPROVED';
        let sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.isFeatured=1 and r.adminReviewStatus=?' ;
        console.log(sql);
        connection.query(sql, [adminReviewStatus], (err, results) => {
            if (err) {
                callback(err, null);
            }
            else if(results.length > 0){
                var res = {};
                console.log("results :"+results);
                res.data= results;
                res.status = '200';
                
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
exports.companyReviews = companyReviews;



