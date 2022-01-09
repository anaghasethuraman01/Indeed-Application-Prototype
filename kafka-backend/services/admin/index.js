"use strict";
const { getAdminPhotos } = require("./getAdminPhotos");
const { setPhotoStatus } = require("./setPhotoStatus");
const { getAdminReviews } = require("./getAdminReviews");
const { setReviewStatus } = require("./setReviewStatus");
const { getChartOne, 
        getChartTwo ,
        getChartThree, 
        getChartFour, 
        getChartFive,
        getChartSix } = require("./getAdminAnalytics");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "getAdminPhotos":    
            getAdminPhotos(msg,callback); 
            break;
        case "setPhotoStatus":    
            setPhotoStatus(msg,callback); 
            break; 
        case "getAdminReviews":    
            getAdminReviews(msg,callback); 
            break;  
        case "setReviewStatus":    
            setReviewStatus(msg,callback); 
            break; 
        case "getChartOne":
            getChartOne(msg,callback);
            break;
        case "getChartTwo":
            getChartTwo(msg,callback);
            break;
        case "getChartThree":
            getChartThree(msg,callback);
            break;
        case "getChartFour":
            getChartFour(msg,callback);
            break;
        case "getChartFive":
            getChartFive(msg,callback);
            break;
        case "getChartSix":
            getChartSix(msg,callback);
            break;
    }
}

exports.handle_request = handle_request;