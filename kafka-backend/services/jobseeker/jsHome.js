const conn = require('../../config/mysql_connection')

let jsHome = async (req, callback) => {
  var res = {}
  try {
    conn.query('select * from Job;', async function (err, results) {
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
    })
  } catch (err) {
    callback('Cannot get all jobs', err)
  }
}

exports.jsHome = jsHome
