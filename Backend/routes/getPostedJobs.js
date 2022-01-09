//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
var mysql = require("mysql");

router.post('/getPostedJobs', function (req, res) {
    console.log("req.body");
    console.log(req.body);
    const companyId = req.body.companyId;
    const userId = req.body.userId;
    let get_job = "SELECT j.jobId, count(a.jobId) AS applicantsNo, jobTitle, jobPostedDate, jobType FROM Job j " +
        " LEFT OUTER JOIN AppliedJobs a on a.jobId = j.jobId " +
        "AND j.companyId = " + mysql.escape(companyId) + " WHERE j.companyId =  " + mysql.escape(companyId) + 
        " AND j.id = " + mysql.escape(userId) + " Group By 1";
console.log
    let job_query = connection.query(get_job, (error, result) => {

        if (error) {
            console.log(error.message)
            res.status(400).send("Server Error. Please Try Again! ");
        }
        else {
            //console.log(result)
            res.status(200).send(JSON.stringify(result));
        }
    });


});

module.exports = router;






