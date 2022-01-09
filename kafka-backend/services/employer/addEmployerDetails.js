"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
let addEmployerDetails = async (req, callback) => {
    try {
       
        const employerId = req.body.employerId;
        const employerName = req.body.employerName;
        const roleInCompany = req.body.roleInCompany;
        const address = req.body.address;
        const city = req.body.city;
        const state = req.body.state;
        const country = req.body.country;
        const zipcode = req.body.zipcode;
        let sql1 = "UPDATE Employer SET name = " +mysql.escape(employerName)
        +" ,roleInCompany =  "+mysql.escape(roleInCompany)
        +",address = "+mysql.escape(address)
        +",state = "+mysql.escape(state)
        +",country = "+mysql.escape(country)+
        ",city = "+mysql.escape(city)+
        ",zipcode = "+mysql.escape(zipcode)+
        " WHERE id = "+mysql.escape(employerId);
        //console.log(sql1);
        let query = conn.query(sql1, (error, result) => {
            if (error) {
                callback(error,null)
              
            } else {
                callback(null,"Success");
            }            
         });
    
    } catch(err) {
        console.log('Cannot get user reviews',err)
        callback('Cannot get user reviews',err);
    }

};
exports.addEmployerDetails = addEmployerDetails;

  
