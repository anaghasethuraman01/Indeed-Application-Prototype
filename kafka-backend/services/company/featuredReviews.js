const conn = require("../../config/mysql_connection");
let featuredReviews = async (req, callback) => {
    let respData =  {
        code: '200',
        msg: 'success'
    }
    try {
        const cid = req.companyId;
        conn.query('SELECT reviewTitle, reviewerRole, city, state, postedDate, rating, reviewComments, pros, cons FROM Review WHERE companyId=? AND isFeatured=? ORDER BY rating',[cid,true],(err,reviews)=> {
            if(err) {
                console.log(err);
                respData.code = '203';
                respData.msg =  'Failed to fetch featured reviews';
                return callback('Failed to fetch featured reviews',respData);
            } else {
                if(reviews.length<=5) {
                    respData.row = reviews;
                    return callback(null, respData);
                }
                else {
                    const highest = reviews.slice(0,4);
                    const lowest = reviews[reviews.length-1];
                    highest.push(lowest);
                    respData.row = highest;
                    return callback(null, respData);
                }
            }
        })
        
    }
    catch (error) {
        console.log("ERROR!!!!!" +error);
        return res.status(400).send("Failed to get featured reviews of the company");
    }
};
exports.featuredReviews = featuredReviews;