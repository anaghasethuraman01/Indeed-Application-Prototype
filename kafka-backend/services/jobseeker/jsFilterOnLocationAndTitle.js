const conn = require('../../config/mysql_connection')

let jsFilterOnLocationAndTitle = async (req, callback) => {
  var res = {}
  try {
    console.log('Job Seeker filter On location and title.....')
    console.log(JSON.stringify(req.body))
    const city = req.body.wherekeyword
    const state = req.body.wherekeyword
    const zip = req.body.wherekeyword
    const companyName = req.body.whatkeyword
    const jobTitle = req.body.whatkeyword
    const postsPerPage = 5
    const currentPage = req.body.currentPage
    conn.query(
      'select * from Job where (city = ? or state = ? or zip = ?) and (jobTitle = ? or companyName = ?) limit ?,?',
      [
        city,
        state,
        zip,
        jobTitle,
        companyName,
        (currentPage - 1) * postsPerPage,
        postsPerPage,
      ],
      async function (err, results) {
        await conn.query(
          'select count(*) as count from Job where (city = ? or state = ? or zip = ?) and (jobTitle = ? or companyName = ?)',
          [city, state, zip, jobTitle, companyName],
          (err2, count) => {
            if (count && count.length <= 0) {
              console.log('Not found')
              callback('Job details not found', err)
            } else if (err2) {
              console.log('error')
              callback('Error ocurred', err)
            }
            //console.log(JSON.stringify(count), JSON.stringify(results))
            else {
              res = { result: results, count: count }
              callback(null, res)
            }
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

exports.jsFilterOnLocationAndTitle = jsFilterOnLocationAndTitle
