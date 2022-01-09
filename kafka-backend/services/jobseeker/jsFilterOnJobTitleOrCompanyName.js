const conn = require('../../config/mysql_connection')

let jsFilterOnJobTitleOrCompanyName = async (req, callback) => {
  var res = {}
  try {
    console.log('Job Seeker filter On JobTitle Or CompanyName.....')
    console.log(JSON.stringify(req.body))
    const companyName = req.body.keyword
    const jobTitle = req.body.keyword
    const postsPerPage = 5
    const currentPage = req.body.currentPage
    conn.query(
      'select * from Job where jobTitle = ? or companyName = ? limit ?,?',
      [jobTitle, companyName, (currentPage - 1) * postsPerPage, postsPerPage],
      async function (err, results) {
        await conn.query(
          'select count(*) as count from Job where jobTitle = ? or companyName = ?',
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

exports.jsFilterOnJobTitleOrCompanyName = jsFilterOnJobTitleOrCompanyName
