const conn = require('../../config/mysql_connection')

let jobsPaginatedData = async (req, callback) => {
  console.log('Job Seeker getting paginated data.....')
  var res = {}
  try {
    const postsPerPage = 5
    const currentPage = req.body.currentPage
    const { companyName } = req.body
    // console.log(req.body)
    conn.query(
      'select * from Job where companyName = ? limit ?,?',
      [companyName, (currentPage - 1) * postsPerPage, postsPerPage],
      async function (err, results) {
        if (results && results.length <= 0) {
          console.log('Not found')
          callback('Job details not found', err)
        }
        if (err) {
          console.log('error')
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

exports.jobsPaginatedData = jobsPaginatedData
