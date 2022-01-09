"use strict";
const conn = require("../../config/mysql_connection");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const JobSeeker = mongoose.model("JobSeeker");
const Company = mongoose.model("Company");

const signup = (req, callback) => {
  try {
    const name = req.name
    const emailId = req.email;
    const pwd = req.password;
    const accountType = req.accountType;
    if ("JobSeeker" === accountType) {
      conn.query(
        "Select * from JobSeeker where email = ?",
        [emailId],
        async function (err, rows) {
            console.log(rows);
          if (err) {
              console.log('Error while signing up:',err)
            return callback("Unknown error occured",{msg:"Unknown error occured",code:'203'});
          }
          else if (rows!=null && rows.length>=1) {
            console.log("already registered");
            callback("JobSeeker already registered with this emailId",{msg:"JobSeeker already registered with this emailId",code:'203'});
          } else {
            const salt = await bcrypt.genSalt(10);
            const hashPwd = await bcrypt.hash(pwd, salt);

            const insertQuery =
              "insert into JobSeeker (name, email, password, accountType) values (?, ?, ?, ?)";
            conn.query(
              insertQuery,
              [name, emailId, hashPwd, accountType],
              function (err, rows) {
                if (err) {
                  callback("Unknown error occured",{msg:"Unknown error occured",code:'203'});
                } else {
                  const selectQuery = "select * from JobSeeker where email=?";
                  conn.query(selectQuery, [emailId], function (err, rows) {
                    if (err) {
                        console.log('Error while registering jobseeker:',err)
                      callback("Unknown error occured",{msg:"Unknown error occured",code:'203'});
                    } else {
                      // callback(null,rows[0]);
                      callback(null,{code:'200',row:rows[0]});
                    }
                  })
                }
              });
          }
        });
    } else if ("Employer" === accountType) {
      conn.query(
        "Select * from Employer where email = ?",
        [emailId],
        async function (err, rows) {
          if (err) {
            return callback("Unknown error occured",{msg:"Unknown error occured",code:'203'});
          }
          else if (rows!=null && rows.length>=1) {
            console.log("already registered");
            callback("Employer already registered with this emailId",{msg:"Employer already registered with this emailId",code:'203'});
          } else {
            const salt = await bcrypt.genSalt(10);
            const hashPwd = await bcrypt.hash(pwd, salt);
            const insertQuery =
              "insert into Employer (name, email, password, accountType) values (?, ?, ?, ?)";
            conn.query(
              insertQuery,
              [name, emailId, hashPwd, accountType],
              function (err, rows) {
                callback(null,{code:'200',row:rows[0]});
               // callback(null,"Employer registered successfully" + rows);
              }
            );
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return callback("Error while registering",{msg:"Error while registering",code:'203'});
  }
};

const signupJobSeekerMongo =  async (req, callback) => {
  try {
    const { jobSeekerId, resumeUrl, jobPreference, savedJobs } = req;
    //resumeUrl="";
    console.log(req);
    const jobSeekerDtls = new JobSeeker({
      jobSeekerId,
      resumeUrl,
      //jobPreference,
      savedJobs
    });
    jobSeekerDtls
      .save()
      .then((result) => {
        console.log(jobSeekerDtls)
        callback(null,{ jobSeekerDtls: result , code:"200"});
      })
      .catch((err) => {
          console.log(err);
        callback("Error occured",{ msg: "Error while inserting job seeker details in mongoDB"  ,code:'203'});
      });
  } catch (err) {
      console.log('Error occured while registering user',err);
    callback("Error occured",{ msg: "Error Ocuured while registering user" ,code:'203'});
  }
};


const createCompanyMongo = async (req, callback) => {
  console.log(req)
  try {
    const { compid } = req;
    const { companyname } = req;
    const { logo } = req;
    const companyDtls = new Company({
      companyId : compid,
      companyName:companyname,
      logo:logo,
      avgWorkHappinessScore: 0.00,
      avgLearningScore: 0.00,
      avgAppreciationScore: 0.00,
      noOfReviews: 0,
      companyAvgRating: 0.00,
      ceoAvgRating: 0.00

    });
    companyDtls
      .save()
      .then((result) => {
        console.log(companyDtls)
        callback(null,{ companyDtls: result });
      })
      .catch((err) => {
        callback("Error Occured",{ error: "Error while inserting company details in mongoDB" + err });
      });
  } catch (err) {
    //console.log(err.message)
    callback("Error Occured",{ error: "error" });
  }
};


exports.signup = signup;
exports.createCompanyMongo = createCompanyMongo;
exports.signupJobSeekerMongo = signupJobSeekerMongo;