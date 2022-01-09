"use strict";
const JobSeeker = require('../../models/JobSeeker');

const savedjobs  = async (req, callback) => {
    let respData = {
        code: '200',
        msg: 'success'
    }
    try {
        const jobSeekerId = req.jobSeekerId;
        
        console.log("cid :"+ jobSeekerId)
        await JobSeeker.find({jobSeekerId:jobSeekerId}).select('-_id savedJobs').then(result=> {
            let savedjobs = result[0];
            console.log(savedjobs);
            respData.row  = savedjobs;
            callback(null,respData);
        }).catch(err=> {
            console.log(err)
            respData.code=  '203';
            respData.msg = 'Failed while searching for saved jobs for the jobseeker'
            callback('Failed while searching for saved jobs for the jobseeker', respData);
        })
    }
    catch (error) {
        console.log(error)
        respData.code=  '203';
        respData.msg = 'Failed while searching for saved jobs for the jobseeker'
        callback('Failed while searching for saved jobs for the jobseeker', respData);
    }
};

exports.savedjobs = savedjobs;