"use strict";
const { getCompanyDetails } = require("./getCompanyDetails");
const { getCompanyDetailsPaginated } = require("./getCompanyDetailsPaginated");
const { searchAdminCompany } = require("./searchAdminCompany");
const { companyJobStatistics } = require("./companyJobStatistics");
const { getAllReviewsByCompanyId } = require("./getAllReviewsByCompanyId");
const {snapshot} = require("./snapshot");
const {featuredReviews}  = require('./featuredReviews');
const {   getSalaryReview,
    addSalaryReview } =require("./addSalaryReview");


function handle_request(msg, callback) {
    switch (msg.route) {
        case "featuredReviews":    
            featuredReviews(msg,callback); 
            break;
        case "snapshot":    
            snapshot(msg,callback); 
            break;
        case "getCompanyDetails":    
            getCompanyDetails(msg,callback); 
            break;
        case "getCompanyDetailsPaginated":    
            getCompanyDetailsPaginated(msg,callback); 
            break;
        case "searchAdminCompany":    
            searchAdminCompany(msg,callback); 
            break; 
        case "companyJobStatistics":    
            companyJobStatistics(msg,callback); 
            break;  
        case "getAllReviewsByCompanyId":    
            getAllReviewsByCompanyId(msg,callback); 
            break; 
        case "getSalaryReview":    
            getSalaryReview(msg,callback); 
            break; 
        case "addSalaryReview":    
            addSalaryReview(msg,callback); 
            break;  
    }
    
}

exports.handle_request = handle_request;