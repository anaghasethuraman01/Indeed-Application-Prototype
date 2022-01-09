const conn = require('../../config/mysql_connection')
const mongoose = require('mongoose')
const JobSeeker = mongoose.model('JobSeeker')

let jsSaveJob = async (req, callback) => {
  console.log('Job Seeker saving to jobs array.....')
  var res = {}
  let {
    companyId,
    city,
    state,
    zip,
    jobType,
    salary,
    location,
    jobId,
    userId,
    roleName,
    companyName,
  } = req.body
  companyId = parseInt(companyId)
  console.log(JSON.stringify(req.body))
  const data = {
    companyId: companyId,
    jobId: jobId,
    city: city,
    state: state,
    zip: zip,
    jobType: jobType,
    salary: salary,
    location: location,
    roleName: roleName,
    companyName: companyName,
  }
  try {
    console.log('exec')
    JobSeeker.update({ jobSeekerId: userId }, { $push: { savedJobs: data } })
      .then((result) => {
        console.log(result)
        res = results
        callback(null, res)
      })
      .catch((err) => {
        console.log('Error occured while querying' + err)
        callback('Error ocurred', err)
      })
  } catch {
    ;(err) => {
      callback('Cannot save job', err)
    }
  }
}

exports.jsSaveJob = jsSaveJob
