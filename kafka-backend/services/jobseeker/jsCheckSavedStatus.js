const conn = require('../../config/mysql_connection')
const mongoose = require('mongoose')
const JobSeeker = mongoose.model('JobSeeker')

let jsCheckSavedStatus = async (req, callback) => {
  console.log('Job Seeker checking saved status.....')
  var res = {}
  let { companyId, jobId, userId } = req.body
  companyId = parseInt(companyId)
  console.log(JSON.stringify(req.body))
  const data = { companyId: companyId, jobId: jobId }
  try {
    JobSeeker.findOne(
      { jobSeekerId: userId },
      { savedJobs: { $elemMatch: data } },
    )
      .then((result) => {
        console.log(result)
        if (result) {
          console.log(result.savedJobs.length)
          if (result.savedJobs.length > 0) {
            res = { result: result, status: 200 }
            callback(null, res)
          } else {
            res = { result: 'Cannot find in saved table', status: 201 }
            callback(null, res)
          }
        } else {
          res = { result: 'Cannot find in saved table', status: 201 }
          callback(null, res)
        }
      })
      .catch((err) => {
        console.log('Error occured while querying find saved jobs' + err)
        return res
          .status(400)
          .send('Error occurred while retrieving saved jobs')
      })
  } catch {
    ;(err) => {
      return res.status(400).json({ error: err })
    }
  }
}

exports.jsCheckSavedStatus = jsCheckSavedStatus
