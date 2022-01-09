"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");


let getSalaryReview = async (req, callback) => {
    let companyId=req.query.companyId;
    try {
        // conn.query('select avg(salaryDetails) as annualPay,jobTitle,companyName,companyId from Job where companyId=1 group by jobTitle;', async function (err, results) {
          conn.query('select avg(annualPay) as annualPay ,jobTitle,companyName,companyId from SalaryReview where companyId=? group by jobTitle;',[companyId], async function (err, results) {
          if (results.length <= 0) {
            console.log('Salary review not found')
            // res.status(400).send('Salary details not found')
          }
          if (err) {
            console.log('error')
            // res.status(400).send('Error ocurred')
            callback(null,err)
          }
        //   return res.send(results)
        callback(null,results)
        })
      }   catch(error) { 
         callback('Cannot get salary details',error);
     }
 };

let addSalaryReview = async (req, callback) => {
    try {
        conn.query(
            "Select companyId,companyName from Company where companyName = ?",
            [req.body.companyName],
            async function (err, rows) {
            if (err) {
              res.status(400).send("Unknown error occured");
            }
            if (rows.length==0) {
              console.log("Company not registered");
              res.status(400).send(`Unable to add salary review since company ${req.body.companyName} is not registered in the company table`);
            } else {
              console.log(rows);
              const registeredCompanyId = rows[0].companyId;
              const insertQuery ='insert into SalaryReview (currentlyWorking,endDate,companyName,jobTitle,jobLocation,annualPay,yrsOfExp,benefits,jobSeekerId,companyId) values (?,?,?,?,?,?,?,?,?,?);'
              conn.query(insertQuery,
                          [req.body.currentlyWorking,
                            req.body.endDate,
                            req.body.companyName,
                            req.body.jobTitle,
                            req.body.jobLocation,
                            req.body.annualPay,
                            req.body.yrsOfExp,
                            req.body.benefits,
                            req.body.jobSeekerId,
                            registeredCompanyId],
                        function (err, rows) {
                          if(err) {
                            console.log(err);
                            // res.status(400).send("Failed to add salary review.");
                            callback(null,err);
                          }
                          else {
                          // res.status(200).send("Salary Review added successfully" + rows);
                          callback(null,rows);
                          }
                        }
                        );
                      }
                    })
         } catch(error) { 
         callback('Cannot get salary details',error);
     }
};

module.exports ={
    getSalaryReview,
    addSalaryReview
}