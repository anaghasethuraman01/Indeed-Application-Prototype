const conn = require('../../config/mysql_connection')

let jobsFilterOnJobTitleOrCompanyName = async (req, callback) => {
  var res = {}
  try {
    console.log(JSON.stringify(req.body))
    const { companyName } = req.body
    const jobTitle = req.body.keyword
    const postsPerPage = 5
    const currentPage = req.body.currentPage
    conn.query(
      'select * from Job where jobTitle = ? and companyName = ? limit ?,?',
      [jobTitle, companyName, (currentPage - 1) * postsPerPage, postsPerPage],
      async function (err, results) {
        await conn.query(
          'select count(*) as count from Job where jobTitle = ? and companyName = ?',
          [jobTitle, companyName],
          (err2, count) => {
            if (count && count.length <= 0) {
              console.log('Not found')
              callback('Job details not found', err)
            }
            if (err2) {
              console.log('error')
              callback('Error ocurred', err)
            }
            //console.log(JSON.stringify(count), JSON.stringify(results))
            res = { result: results, count: count }
            callback(null, res)
          },
        )
        if (results && results.length <= 0) {
          console.log('Not found')
          callback('Job details not found', err)
        }
        if (err) {
          console.log('error')
          callback('Error ocurred', err)
        }
      },
    )
  } catch (err) {
    callback('Cannot filter jobs', err)
  }
}

exports.jobsFilterOnJobTitleOrCompanyName = jobsFilterOnJobTitleOrCompanyName
