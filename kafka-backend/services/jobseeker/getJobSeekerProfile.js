
"use strict";
const conn = require("../../config/mysql_connection");
var mysql = require("mysql");
const jobSeeker = require('../../models/JobSeeker');
let getJobSeekerProfile = async (req, callback) => {
    try {

        var jobseekerData = [];
        const jobSeekerId = req.body.id;
        console.log(req.body.id)
        let sql1 = "SELECT email,jobSeekerContact from JobSeeker WHERE id = " + mysql.escape(jobSeekerId);
        let query = conn.query(sql1, (error, result) => {
    
            if (error) {
    
                callback(error,null)
            }
    
            else {
    
                let profile = {
                    email: result[0].email,
                    jobSeekerContact: result[0].jobSeekerContact,
    
                };
                jobseekerData.push(profile);
    
                console.log(jobseekerData)
                	
            }
        });
        jobSeeker.find({ jobSeekerId: req.body.id }, (error, getjobpreference) => {

          if (error) {
              
              callback(null, error)
          }
         
          // console.log(getjobpreference[0].jobPreference['Work Schedules'])
          if (getjobpreference) {
              //jobseekerData.concat(getjobpreference[0].jobPreference)
  
              let profile1 = {
                  JobTitle: getjobpreference[0].jobPreference['Job Title'],
                  JobTypes: getjobpreference[0].jobPreference['Job Types'],
                  WorkSchedules: getjobpreference[0].jobPreference['Work Schedules'],
                  pay: getjobpreference[0].jobPreference['Pay'],
                  relocation: getjobpreference[0].jobPreference['Relocation'],
                  remote: getjobpreference[0].jobPreference['Remote'],
              };
              jobseekerData.push(profile1);
          }
          callback(null,jobseekerData)
         // res.status(200).send(jobseekerData)
      })
  
    } catch(err) {
        
        callback('Cannot get jobseeker details',err);
    }

};
exports.getJobSeekerProfile = getJobSeekerProfile;








