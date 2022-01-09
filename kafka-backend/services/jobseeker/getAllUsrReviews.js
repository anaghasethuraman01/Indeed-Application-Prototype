"use strict";
const redisClient = require("../../config/redisClient");
const conn = require("../../config/mysql_connection");
let getAllUsrReviews = async (req, callback) => {
    try {
        console.log('hey i am here to get reviews. Write a code for this route:',req.route);
        redisClient.get('companyReviewsTest', async (err, data) => {
            // If value for key is available in Redis
            if (data) {
                // send data as output
                console.log("from redis");
                callback(null,{reviews: data,code:'200'});
            } 
            // If value for given key is not available in Redis
            else {
                const query = "SELECT * FROM Review1 r";
                conn.query(query, null , function (err, rows) {
                    if (err) {
                        console.log("Error occured while querying");
                        callback(err, null);
                    } else{
                        //console.log('sucessfully returning reviews:',rows)
                        console.log("Fetching rows completed");
                        var res = {};
                        res.reviews= rows;
                        res.code = '200';
                        redisClient.setex('companyReviewsTest', 36000, JSON.stringify(rows));
                        callback(null, res);
                    }
                });
            }
        });
    } catch(err) {
        console.log('Cannot get user reviews',err)
        callback('Cannot get user reviews',err);
    }
};

exports.getAllUsrReviews = getAllUsrReviews;