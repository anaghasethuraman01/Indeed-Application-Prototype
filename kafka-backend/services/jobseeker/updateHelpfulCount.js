const connection = require("../../config/mysql_connection");
var mysql = require("mysql");
const url = require('url');
let updateHelpfulCount = async (req, callback) => {
    try {
        console.log(req.body.yesReviewHelpfulCount);
        let sql = 'UPDATE Review SET yesReviewHelpfulCount = ?, noHelpfulCount = ? WHERE reviewId = ?';
        let data = [req.body.yesReviewHelpfulCount, req.body.noHelpfulCount, req.body.reviewId];
        
        connection.query(sql, data, (err, results) => {
            if (err) {
                callback(err, null);
            }
            else{
                var res = {};
                res.data= "Helpful count updated successfully";
                res.status = '200';
                callback(null, res);
            }
        });	
  
    } catch(err) {
        
        callback('Cannot get reviews',err);
    }

};
exports.updateHelpfulCount = updateHelpfulCount;



