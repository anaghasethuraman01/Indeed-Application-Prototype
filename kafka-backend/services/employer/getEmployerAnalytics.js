"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");

let getEmpChartOne = async (req, callback) => {
   try {
    let employerId=req.query.employerId;
    // console.log("employer id", employerId);
    // add [id] to get data for particular employer
    conn.query('SELECT count(Job.jobId) as countJobId ,Job.jobTitle from Job,Employer where Employer.id=Job.id  and Job.id =? and YEAR(Job.jobPostedDate) <=YEAR(CURDATE()) and YEAR(Job.jobPostedDate) >= YEAR(CURDATE())-1 group by Job.jobTitle limit 10;',[employerId], async function (err, results) {
      if (err) {
        console.log('error')
        // res.status(400).send('Error ocurred')
        callback(null,err)
      }
    //   return res.send(results)
        callback(null,results)
    })
  }  catch(error) { 
        callback('Cannot get chart 1 details',error);
    }
};


let getEmpChartTwo = async (req, callback) => {
  try {
    let employerId=req.query.employerId;
    // add [id] for a employer
    conn.query('SELECT count(AppliedJobs.id) as countAppId,status,AppliedJobs.companyId,Company.companyName as companyName from AppliedJobs,Employer,Company where AppliedJobs.companyId=Employer.companyId and AppliedJobs.companyId=Company.companyId and Employer.id=? group by status, AppliedJobs.companyId;',[employerId], async function (err, results) {
      if (err) {
        console.log('error')
        // res.status(400).send('Error ocurred')
        callback(null,err)
      }
    //   return res.send(results)
    callback(null,results)
    })
  } catch(error) { 
        callback('Cannot get chart 2 details',error);
    }
};

module.exports ={
    getEmpChartOne,
    getEmpChartTwo
}