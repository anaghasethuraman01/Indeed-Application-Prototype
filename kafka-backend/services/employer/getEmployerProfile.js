// get employer profile
"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
let getEmployerProfile = async (req, callback) => {
    try {
        const employerid = req.body.empid;  
        let sql1 = "SELECT * FROM Employer e JOIN Company c ON e.companyId=c.companyId WHERE id = "+mysql.escape(employerid) ;
        let query = conn.query(sql1, (error, result) => {
    
        if (error) {
            callback(error,null)
            }
       else{
            callback(null,JSON.stringify(result));
            //res.status(200).send(JSON.stringify(result));	
            }
        });
  
    } catch(err) {
        
        callback('Cannot get employer',err);
    }

};
exports.getEmployerProfile = getEmployerProfile;


// const express = require("express");
// const router = express.Router();
// const connection = require("../config/mysql_connection");
// var mysql = require("mysql");
// router.post('/getEmployerProfile', function(req,res){
//     const employerid = req.body.empid;   
//     console.log("****")
//     console.log(employerid)
// 	let sql1 = "SELECT * FROM Employer e JOIN Company c ON e.companyId=c.companyId WHERE id = "+mysql.escape(employerid) ;
//     let query = connection.query(sql1, (error, result) => {

//     if (error) {
        
//         res.status(400).send("Server Error. Please Try Again! ");
//         }
   
//         else{
        
//             res.status(200).send(JSON.stringify(result));	
//         }
		
		
// 	});
   
    
// });
// module.exports = router;






