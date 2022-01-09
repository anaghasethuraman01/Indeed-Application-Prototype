const connection = require("../../config/mysql_connection");
var mysql = require("mysql");
const url = require('url');
let companyReviewsRatingSort = async (req, callback) => {
    try {
        const queryObject = url.parse(req.url,true).query;
        const adminReviewStatus = 'APPROVED';
        const pageNumber = queryObject.currentPage;
        const limit = 5;
        const offset = (pageNumber - 1) * limit;
        console.log("pageNumber" +pageNumber);
        console.log("offset" +offset);
        const ratingSel = queryObject.ratingSel;
        console.log(ratingSel);
        let sql = '';
        let data = [];
        if(ratingSel != null && ratingSel !== '' && ratingSel !== undefined){
            sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.isFeatured=1 and r.adminReviewStatus=? and r.rating=? ORDER BY rating DESC LIMIT ?,?' ;
            data = [adminReviewStatus, ratingSel, offset, limit];
        }else{
            sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.isFeatured=1 and r.adminReviewStatus=? ORDER BY rating DESC LIMIT ?,?' ;
            data = [adminReviewStatus, offset, limit];
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
exports.companyReviewsRatingSort = companyReviewsRatingSort;



