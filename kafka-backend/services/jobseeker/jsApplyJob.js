const conn = require('../../config/mysql_connection')

let jsApplyJob = async (req, callback) => {
  var res = {}
  try {
    let { appliedDate, jobId, id, companyId } = req.body
    console.log('Job Seeker Applying to a job.....')
    console.log(req.body)
    conn.query(
      "insert into AppliedJobs (status, appliedDate, jobId, id, companyId) values ('Applied',?,?,?,?) ",
      [appliedDate, jobId, id, companyId],
      async function (err, results) {
        if (results && results.length <= 0) {
          console.log('Not found')
          callback('Cannot insert job to applied table', err)
        }
        if (err) {
          callback('Cannot apply to jobs', err)
        }
        res = results
        callback(null, res)
      },
    )
  } catch (err) {
    callback('Cannot apply to jobs', err)
  }
}

exports.jsApplyJob = jsApplyJob
