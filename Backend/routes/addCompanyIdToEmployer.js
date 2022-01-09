// add company id to employer profile
const express = require("express");
const router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require("../config/passport");

router.post('/addCompanyIdToEmployer',checkAuth,function (req, res) {
   console.log("addCompanyIdToEmployer.....")
    let msg = {};
    msg.route = "addCompanyIdToEmployer";
    msg.body = req.body;
    //msg = req.body;
    kafka.make_request("employer", msg, function (err, results) {
        if (err) {
            console.log(err);
            return res.send({...results,err:err});
        }
        else {
            res.status(200).end("Company Details Added!");
            
        }
    });
});

module.exports = router;








// const express = require("express");
// const router = express.Router();
// var mysql = require("mysql");
// const connection = require("../config/mysql_connection");

// router.post("/addCompanyIdToEmployer", (req, res) => {
//         const employerId = req.body.employerId;
//         const companyId = req.body.companyid;
//         console.log(companyId)
//         let sql1 = "UPDATE Employer SET companyId = " +mysql.escape(companyId)
//          +" WHERE id = " +mysql.escape(employerId);
//         // //console.log(sql1);
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
//                 res.end("Company ID Added!");
//             }            
//         });
//     });
//     module.exports = router;