"use strict";
const { login } = require("./login");
const { signup, signupJobSeekerMongo, createCompanyMongo } = require("./signup");

function handle_request(msg, callback) {
    switch (msg.route) {
        case "login":
            login(msg,callback);
            break;
        case "signup":
            signup(msg,callback);
            break;
        case "createCompanyMongo":
            createCompanyMongo(msg,callback);
            break;
        case "signupJobSeekerMongo":
            signupJobSeekerMongo(msg,callback);
            break;
    }
}


exports.handle_request = handle_request;