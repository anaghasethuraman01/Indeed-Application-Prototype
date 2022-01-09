const connection = require("../../config/mysql_connection");
var mysql = require("mysql");
const url = require('url');
require('../../models/Company');

const mongoose = require("mongoose");
const Company = mongoose.model("Company");
let searchReview = async (req, callback) => {
    try {
        const companyName = req.body.companyName;
    const location = req.body.location;
    console.log(companyName);
    console.log(location);
    let companyIds = [];
    let sql ='';
    if(companyName !== '' && companyName !== undefined && location != '' && location !== undefined){
        sql = "SELECT companyId FROM Company WHERE companyName LIKE "+mysql.escape('%'+companyName+'%') +" and headquarters = "+mysql.escape(location) ;
    }else if(companyName !== '' && companyName !== undefined ){
        sql = "SELECT companyId FROM Company WHERE companyName LIKE "+mysql.escape('%'+companyName+'%');
    }else if(location != '' && location !== undefined){
        sql = "SELECT companyId FROM Company WHERE headquarters = "+mysql.escape(location);
    }
    console.log("sql :" +sql);
    connection.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
        }
        else if(results.length > 0){
            for(let i=0; i<results.length; i++){
                companyIds.push(results[i].companyId);
            }
            console.log("company Ids: "+companyIds);
        }
        Company.find({ companyId: { $in: companyIds }}, (error, data) => {
            if (error) {
                callback(error, null);
            }
            else if(data.length > 0){
                var res = {};
                res.data= data;
                res.status = '200';
                console.log("results :"+data);
                callback(null, res);
                
            }else{
                var res = {};
                res.data= "No reviews available";
                res.status = '400';
                callback(null, res);
            }
        });	
    });
  
    } catch(err) {
        
        callback('Cannot get reviews',err);
    }

};
exports.searchReview = searchReview;



