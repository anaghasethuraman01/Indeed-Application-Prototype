const conn = require('../../config/mysql_connection')

let jobsCompanyJobs = async (req, callback) => {
  var res = {}
  try {
    const { companyName } = req.body
    console.log(req.body)
    conn.query(
      'select * from Job where companyName = ?',
      [companyName],
      async function (err, results) {
        if (results && results.length <= 0) {
          console.log('Not found')
          callback('Job details not found', err)
        }
        if (err) {
          console.log('error ' + err)
          callback('Error ocurred', err)
        }
        res = results
        callback(null, res)
      },
    )
  } catch (err) {
    callback('Cannot get all jobs', err)
  }
}

exports.jobsCompanyJobs = jobsCompanyJobs
