const connection = require("../../config/mysql_connection");
var mysql = require("mysql");
const url = require('url');
let reviewsByProfilePaginated = async (req, callback) => {
    try {
        const queryObject = url.parse(req.url,true).query;
        const adminReviewStatus = 'APPROVED';
        const pageNumber = queryObject.currentPage;
        const limit = 5;
        const offset = (pageNumber - 1) * limit;
        let sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.jobSeekerId='+mysql.escape(queryObject.jobSeekerId)+ ' and r.companyId = c.companyId LIMIT ?,?' ;
        console.log(sql);
        connection.query(sql, [offset, limit], (err, results) => {
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
exports.reviewsByProfilePaginated = reviewsByProfilePaginated;



