"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
let addCompanyDetails = async (req, callback) => {
    try {
        console.log(req.body.logo)
        let addCompany_sql = 'INSERT INTO Company(companyName, website, companySize, about, ceo, companyValues, workCulture, founded, revenue, mission, headquarters,industry,companyDescription,companyType,logo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        let compDetails = [req.body.companyName, req.body.website, req.body.companySize, req.body.about, req.body.ceo, req.body.companyValues, req.body.workCulture, req.body.founded, req.body.revenue, req.body.mission, req.body.headquarters,req.body.industry,
		req.body.companyDescription, req.body.companyType,req.body.logo];

        conn.query(addCompany_sql, compDetails, (error, result) => {
				if (error) {
					callback(error,null)
				} else {
					
					console.log("Company Added ")
                    const companyId = result.insertId;
                    
                    // res.send(200).json({companyId:companyId})
					//res.end("Company Added  successfully!");
                    let sql_companyid = "SELECT companyId,companyName,logo FROM Company WHERE companyId = "+mysql.escape(companyId) ;
                    let query1 = conn.query(sql_companyid, (error, result_id) => {
                    
                        if (error) {
                            callback(error,null)
                            }
                        if(result_id){
                            callback(null,JSON.stringify(result_id))
                            //res.status(200).end(JSON.stringify(result_id))
                            
                        }
                    })
                    let sql1 = "UPDATE Employer SET companyId = " +mysql.escape(companyId)+
                    " WHERE id = "+mysql.escape(req.body.employerId);

                    let query = conn.query(sql1, (error, result) => {
                        if (error) {
                            callback(error,null)
                        } else {
                           // callback(null,"Company ID updated!");
                            
                        }            
                    });
				}
                
	});
	
       
    
    } catch(err) {
        
        callback('Cannot add company details',err);
    }
};
exports.addCompanyDetails = addCompanyDetails;

  
