"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
let addCompanyIdToEmployer = async (req, callback) => {
    try {
        const employerId = req.body.employerId;
        const companyId = req.body.companyid;
        console.log(companyId)
        let sql1 = "UPDATE Employer SET companyId = " +mysql.escape(companyId)
         +" WHERE id = " +mysql.escape(employerId);
        
         let query = conn.query(sql1, (error, result) => {
            if (error) {
                callback(error,null)
            }
             else {
                callback(null,"Success")  
            }            
        });
    } catch(err) {
        
        callback('Cannot add company details',err);
    }
};
exports.addCompanyIdToEmployer = addCompanyIdToEmployer;

  
