"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
require('../../models/Photo');
const mongoose = require("mongoose");
const Company = mongoose.model('Company')

// The number of reviews per day.
let getChartOne = async (req, callback) => {
    try {
        conn.query('SELECT count(reviewId) as revId ,DATE_FORMAT(postedDate,"%Y-%m-%d") as postedDate from Review group by postedDate order by postedDate LIMIT 7;', async function (err, results) {
            // return res.send(results);
        if (err) {
            console.log('error')
            // res.status(400).send('Error ocurred')
            callback(null,err)
        }
        // console.log(results);
        callback(null,results)
    })
  } catch(error) { 
        callback('Cannot get chart 1 details',error);
    }
};

// Top 5 most reviewed companies.
let getChartTwo = async (req, callback) => {
    try {
       Company.find()
        .sort({noOfReviews: -1})
        .limit(5)
        .then((result) => {
            // console.log(result)
            //   return res.status(200).json(result)
            callback(null,result)
        })
        .catch((err) => {
          // console.log(err);
          console.log('Error occured while querying')
            //   return res.status(400).send('Error occurred while fetching review count')
         callback(null,err)
        })
  } catch(error) { 
        callback('Cannot get chart 2 details',error);
    }
};

//  Top 5 companies based on average rating.
let getChartThree = async (req, callback) => {
    try {
         Company.find()
            .sort({companyAvgRating: -1})
            .limit(5)
            .then((result) => {
            // console.log(result)
            // return res.status(200).json(result)
            callback(null,result)
        })
        .catch((err) => {
          // console.log(err);
          console.log('Error occured while querying')
            //   return res.status(400).send('Error occurred while fetching review count')
         callback(null,err)
        })
  } catch(error) { 
        callback('Cannot get chart 3 details',error);
    }
};

// Top 5 job seekers based on total accepted reviews made.
let getChartFour = async (req, callback) => {
    try {
        conn.query('SELECT  count(reviewId) as revId, JobSeeker.name as name from Review,JobSeeker where Review.jobSeekerId = JobSeeker.id and adminReviewStatus= "APPROVED"  group by jobSeekerId order by revId DESC LIMIT 5;', async function (err, results) {
      if (err) {
        // console.log('error')
        // res.status(400).send('Error ocurred')
      callback(null,err)
        }
        // console.log(results);
        callback(null,results)
     })
    } catch(error) { 
        callback('Cannot get chart 4  details',error);
    }
};

// Top 10 CEO based on rating
let getChartFive = async (req, callback) => {
  let data=[];
  let cmpny=[];
  let finalResults=[];
  try {
    // Company.aggregate({companyId})
    Company.find()
      .sort({ceoAvgRating: -1})
      .limit(10)
      .then( (result) => {
        result.forEach((dataObj) => {
          // console.log(dataObj.ceoAvgRating);
        data.push({"rating":dataObj.ceoAvgRating,"companyId":dataObj.companyId});
        cmpny.push(dataObj.companyId)
        //  console.log("data",data);
         
      })
      // console.log(cmpny)
      conn.query('SELECT  ceo,companyId from Company where companyId in (?)',[cmpny], async (err, results) =>{
        // console.log("check",results);
            if(err) {
              return res.status(400).send('Failed to get details');
          }
          // console.log("Check2",results)
        finalResults = results.map((item, i) => Object.assign({}, item, data[i]));
        //   return res.status(200).send(finalResults);
        callback(null,finalResults)
        })
    })
  } catch(error) { 
        callback('Cannot get chart 5 details',error);
    }
};

// Top 10 companies based on views per day.
let getChartSix = async (req, callback) => {
    try {
      conn.query('select  viewCount,Company.companyName as companyName,viewDate from CompanyView, Company where Company.companyId=CompanyView.companyId group by viewDate,companyName order by viewCount DESC limit 10;', async function (err, results) {
        if (err) {
          console.log('error')
        //   res.status(400).send('Error ocurred')
        callback(null,err)
        }
        // return res.send(results)
        callback(null,results)
      })
    } catch(error) { 
        callback('Cannot get chart 5 details',error);
    }
  };

module.exports ={
    getChartOne,
    getChartTwo,
    getChartThree, 
    getChartFour,
    getChartFive,
    getChartSix};