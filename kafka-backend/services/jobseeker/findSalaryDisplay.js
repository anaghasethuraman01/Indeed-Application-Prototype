"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");

let findSalDisplay = async (req, callback) => {
    try {
    conn.query('select companyId,avg(salaryDetails) as salaryDetails,jobId,jobTitle,companyName,city,state,zip,industry from Job group by jobTitle;', async function (err, results) {
      if (err) {
        console.log('findSalDisplay error')
        // res.status(400).send('Error ocurred')
        callback(null,err)
      }
    //   return res.send(results)
        callback(null,results)
    })
  } catch(error) { 
        callback('Cannot get Salary details',error);
    }
};


let findSalByTitleDisplay = async (req, callback) => {
    var count = 0;
    let data1=[];
    let cmpnyId=[];
    var subquery1Result = [], subquery2Result;
    const query ="select logo,Job.companyId,avg(salaryDetails) as salaryDetails,Job.jobId,Job.jobTitle,Job.companyName,Job.city,Job.state,Job.zip,Job.industry from Job,Company where Job.companyId=Company.companyId and lower(jobTitle) like lower(?) group by jobTitle,companyId  order by salaryDetails  DESC limit 5 ;";
    const subquery1 ='select round(avg(Review.rating),2) as rating,count(Review.reviewId) as revCnt, companyId from Review where Review.companyId =?;';
    const subquery2='select count(SalaryReview.companyId) as salRevCnt, companyId from SalaryReview where SalaryReview.companyId =? ;'; 
try {
  const jobTitle = req.jobTitles;
  conn.query(query,[jobTitle],function (err, results) {
    if (err) {
        console.log('error')
        // res.status(400).send('Error ocurred')
        callback(null,err)
    }
    else {
      // console.log(results);
        results.forEach(dataObj => {
            // conn.query(subquery1,[dataObj.companyId],  async function(err, rows1) {
            cmpnyId.push(dataObj.companyId);
            conn.query(subquery1,[dataObj.companyId], function(err, results1) {
                if (err) {
                console.log('error')
                // res.status(400).send('Error ocurred')
                }
            else {  
            // console.log(results1);
            if(results1[0].companyId !== null) {
            subquery1Result.push(results1[0]);
            }
            else {
              subquery1Result.push({ salRevCnt: 0, rating: 0, companyId: dataObj.companyId })
            }
            // console.log("subquery1Result: ",subquery1Result);
            conn.query(subquery2,[dataObj.companyId], function (err, results2) {
              if (err) {
                console.log('error')
              //  res.status(400).send('Error ocurred')
              }
              else {
              // console.log(results2);
              subquery2Result = {salRevCnt: results2[0].salRevCnt, companyId: dataObj.companyId };
              // console.log("subquery2Result:",subquery2Result);
              var filteredSubq1Res = subquery1Result.filter(obj => {
                return obj.companyId === subquery2Result.companyId;
              });
              // console.log("filteredSubq1Res:",filteredSubq1Res);
              data1.push({"logo":dataObj.logo,"companyId":dataObj.companyId,"salaryDetails":dataObj.salaryDetails,"jobId":dataObj.jobId,"jobTitle":dataObj.jobTitle,"companyName":dataObj.companyName,"city":dataObj.city,"state":dataObj.state,"zip":dataObj.zip,"industry":dataObj.industry,"rating":filteredSubq1Res[0].rating,"revCnt":filteredSubq1Res[0].revCnt, "salRevCnt":subquery2Result.salRevCnt});
              // console.log(data1);
              count++;
              if(count === results.length) {
                // console.log(data1);
                // res.status(200).send(data1);
                callback(null,data1)
                }
              }               
            });
            }
          });
        });
    }
  })
} catch(error) { 
        callback('Details of Salary by Title not found',error);
    }
};

module.exports ={
    findSalDisplay,
    findSalByTitleDisplay
}