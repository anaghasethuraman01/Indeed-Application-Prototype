"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
let updateJobSeekerStatus = async (req, callback) => {
    try {
         const id = req.body.id;
         const status = req.body.status;
         const jobId = req.body.jobId;

         let sql1 = "UPDATE AppliedJobs SET  status= " +mysql.escape(status)
        
         +" WHERE id = "+mysql.escape(id)+" AND jobId = "+mysql.escape(jobId);
         console.log(sql1);
         let query = conn.query(sql1, (error, result) => {
             if (error) {
                callback(error,null)
             } else {
                callback(null,"Success");
                // res.status(200).end(" Job Seeker status updated");
             }            
         });


        
    } catch(err) {
      
        callback('Cannot update status',err);
    }

};
exports.updateJobSeekerStatus = updateJobSeekerStatus;

