const conn = require('../../config/mysql_connection')

let jsUpdateNoOfViews = async (req, callback) => {
  console.log('Job Seeker updating no of views.....')
  var res = {}
  const { id, viewDate } = req.body
  console.log(JSON.stringify(req.body))
  try {
    // Company.updateOne({ companyId: id }, { $inc: { noOfViews: 1 } })
    //   .then((result) => {
    //     console.log(result)
    //     res = results
    //     callback(null, res)
    //   })
    //   .catch((err) => {
    //     console.log('Error occured while querying' + err)
    //     callback('Error ocurred', err)
    //   })
    conn.query(
      'select * from CompanyView where viewDate = ? and companyId = ?',
      [viewDate, id],
      async function (err, results) {
        if (results && results.length > 0) {
          console.log(
            '\n\ncompany view data is already present for that day.....\n\n',
          )
          conn.query(
            'update CompanyView set viewCount = viewCount + 1 where companyId = ? and viewDate = ?',
            [id, viewDate],
            async function (err, results) {
              if (results && results.length <= 0) {
                console.log('Not found')
                callback('could not update view count', err)
              }
              if (err) {
                console.log('error')
                callback('Error ocurred', err)
              }
              res = results
              callback(null, res)
            },
          )
        } else {
          console.log(
            '\n\ncompany view data is not present for that day.....\n\n',
          )
          conn.query(
            'insert into CompanyView (companyId, viewDate, viewCount) values (?,?,?)',
            [id, viewDate, 1],
            async function (err, results) {
              if (results && results.length <= 0) {
                console.log('Not found')
                callback('could not update view count', err)
              }
              if (err) {
                console.log('error')
                callback('Error ocurred', err)
              }
              res = results
              callback(null, res)
            },
          )
        }
      },
    )
  } catch {
    ;(err) => {
      callback('Cannot update views', err)
    }
  }
}

exports.jsUpdateNoOfViews = jsUpdateNoOfViews
