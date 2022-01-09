//edit company details
"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
let editCompanyDetails = async (req, callback) => {
    try {
            const companyId = req.body['companyId'];
            const companyName = req.body['companyName'];
            const about = req.body['about'];
            const ceo = req.body['ceo'];
            const founded = req.body['founded'];
            const companySize = req.body['companySize'];
            const revenue = req.body['revenue'];
            const industry = req.body['industry'];
            const companyDescription = req.body['companyDescription'];
            const mission = req.body['mission'];
            const workCulture = req.body['workCulture'];
            const companyValues = req.body['companyValues'];
            const website = req.body['website'];
            const headquarters = req.body['headquarters'];
            const companyType = req.body['companyType'];
            const employerId = req.body['employerId'];
            const logo=req.body['logo'];
            let sql1 = "UPDATE Company SET companyName = " +mysql.escape(companyName)
                    +" ,about =  "+mysql.escape(about)
                    +",ceo = "+mysql.escape(ceo)
                    +",founded = "+mysql.escape(founded)
                    +",companySize = "+mysql.escape(companySize)
                    +",revenue = "+mysql.escape(revenue)
                    +",companyType = "+mysql.escape(companyType)
                    +",headquarters = "+mysql.escape(headquarters)
                    +",companyValues = "+mysql.escape(companyValues)
                    +",workCulture = "+mysql.escape(workCulture)
                    +",mission = "+mysql.escape(mission)
                    +",companyDescription = "+mysql.escape(companyDescription)
                    +",industry = "+mysql.escape(industry)
                    +",website = "+mysql.escape(website)
                    +",logo = "+mysql.escape(logo)
                    +" WHERE companyId = " +mysql.escape(companyId);
            let query = conn.query(sql1, (error, result) => {
                if (error) {
                    callback(error,null)
                } else {
                    callback(null,"Success");
                }            
            });
    
    } catch(err) {
        
        callback('Cannot edit company details',err);
    }
};
exports.editCompanyDetails = editCompanyDetails;


// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require("../config/mysql_connection");

// router.post("/editCompanyDetails", (req, res) => {
//     console.log(req.body)
//         const companyId = req.body['companyId'];
//         const companyName = req.body['companyName'];
//         const about = req.body['about'];
//         const ceo = req.body['ceo'];
//         const founded = req.body['founded'];
//         const companySize = req.body['companySize'];
//         const revenue = req.body['revenue'];
//         const industry = req.body['industry'];
//         const companyDescription = req.body['companyDescription'];
//         const mission = req.body['mission'];
//         const workCulture = req.body['workCulture'];
//         const companyValues = req.body['companyValues'];
//         const website = req.body['website'];
//         const headquarters = req.body['headquarters'];
//         const companyType = req.body['companyType'];
//         const employerId = req.body['employerId'];
      
//         let sql1 = "UPDATE Company SET companyName = " +mysql.escape(companyName)
//         +" ,about =  "+mysql.escape(about)
//         +",ceo = "+mysql.escape(ceo)
//         +",founded = "+mysql.escape(founded)
//         +",companySize = "+mysql.escape(companySize)
//         +",revenue = "+mysql.escape(revenue)
//         +",companyType = "+mysql.escape(companyType)
//         +",headquarters = "+mysql.escape(headquarters)
//         +",companyValues = "+mysql.escape(companyValues)
//         +",workCulture = "+mysql.escape(workCulture)
//         +",mission = "+mysql.escape(mission)
//         +",companyDescription = "+mysql.escape(companyDescription)
//         +",industry = "+mysql.escape(industry)
//         +",website = "+mysql.escape(website)
//         +" WHERE companyId = " +mysql.escape(companyId);
//         //console.log(sql1);
//         let query = connection.query(sql1, (error, result) => {
//             if (error) {
//                 res.writeHead(500,{
//                     'Content-Type' : 'application/json'
//                 });
//                 //console.log(error.message);
//                 res.end("Server Error. Please Try Again! ");
//             } else {
//                 res.writeHead(200,{
//                     'Content-Type' : 'application/json'
//                 });
//                 res.end("Company Details Edited!");
//             }            
//         });
//     });
//     module.exports = router;