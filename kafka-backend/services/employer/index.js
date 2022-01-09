"use strict";
const { addEmployerDetails } = require("./addEmployerDetails");
const { addCompanyDetails } = require("./addCompanyDetails");
const { addCompanyIdToEmployer } = require("./addCompanyIdToEmployer");
const { editEmployerDetails } = require("./editEmployerDetails");
const { editCompanyDetails } = require("./editCompanyDetails");
const { getEmployerProfile } = require("./getEmployerProfile");
const { allCompanyReviewsPaginated } = require("./allCompanyReviewsPaginated");
const { allCompanyReviews } = require("./allCompanyReviews");
const { updateFeaturedReviews } = require("./updateFeaturedReviews");
const { getApplicantsName } = require("./getApplicantsName");
const {getEmpChartOne, getEmpChartTwo } = require("./getEmployerAnalytics")
const { updateJobSeekerStatus } = require("./updateJobSeekerStatus");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "addEmployerDetails":
            addEmployerDetails(msg,callback);
            break;
        case "addCompanyDetails":
            addCompanyDetails(msg,callback);
            break;  
        case "addCompanyIdToEmployer":
            addCompanyIdToEmployer(msg,callback);
            break;  
        case "editEmployerDetails":    
            editEmployerDetails(msg,callback); 
            break;       
        case "editCompanyDetails":    
            editCompanyDetails(msg,callback); 
            break;   
        case "getEmployerProfile":    
            getEmployerProfile(msg,callback); 
            break;
           
        case "allCompanyReviewsPaginated":    
            allCompanyReviewsPaginated(msg,callback); 
            break;
        case "allCompanyReviews":    
            allCompanyReviews(msg,callback); 
            break;
        case "updateFeaturedReviews":    
            updateFeaturedReviews(msg,callback); 
            break;
        case "getApplicantsName":    
            getApplicantsName(msg,callback); 
            break;
        case "getEmpChartOne":    
            getEmpChartOne(msg,callback); 
            break;
        case "getEmpChartTwo":    
            getEmpChartTwo(msg,callback); 
            break;
        case "updateJobSeekerStatus":    
            updateJobSeekerStatus(msg,callback); 
            break;
            
    }
}

exports.handle_request = handle_request;