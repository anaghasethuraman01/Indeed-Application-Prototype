const connection = require("../../config/mysql_connection");
var mysql = require("mysql");
const url = require('url');
require('../../models/Company');

const mongoose = require("mongoose");
const Company = mongoose.model("Company");
let allReviews = async (req, callback) => {
    try {
        Company.find((error, data) => {
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
  
    } catch(err) {
        
        callback('Cannot get reviews',err);
    }

};
exports.allReviews = allReviews;



