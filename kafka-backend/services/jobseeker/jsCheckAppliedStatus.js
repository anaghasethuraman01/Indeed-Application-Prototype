const conn = require('../../config/mysql_connection')

let jsCheckAppliedStatus = async (req, callback) => {
  console.log('Job Seeker checking applies status.....')
  var res = {}
  try {
    let { appliedDate, jobId, id, companyId } = req.body
    console.log(req.body)
    conn.query(
      'select * from AppliedJobs where jobId = ? and id = ? and companyId = ? and status <> "Rejected"',
      [jobId, id, companyId],
      async function (err, results) {
        if (results && results.length <= 0) {
          console.log('Not found')
          res = { result: 'Cannot find in applied table', status: 201 }
          callback(null, res)
        } else {
          res = { result: results, status: 200 }
          callback(null, res)
        }
        if (err) {
          console.log('error' + err)
          callback('Error ocurred', err)
        }
      },
    )
  } catch {
    ;(err) => {
      callback('Cannot check applied job', err)
    }
  }
}

exports.jsCheckAppliedStatus = jsCheckAppliedStatus
