const conn = require('../../config/mysql_connection')

let jsFilterOnLocation = async (req, callback) => {
  var res = {}
  try {
    console.log('Job Seeker filter On location.....')
    console.log(JSON.stringify(req.body))
    const city = req.body.keyword
    const state = req.body.keyword
    const zip = req.body.keyword
    const postsPerPage = 5
    const currentPage = req.body.currentPage
    conn.query(
      'select * from Job where city = ? or state = ? or zip = ? limit ?,?',
      [city, state, zip, (currentPage - 1) * postsPerPage, postsPerPage],
      async function (err, results) {
        await conn.query(
          'select count(*) as count from Job where city = ? or state = ? or zip = ?',
          [city, state, zip],
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

exports.jsFilterOnLocation = jsFilterOnLocation
