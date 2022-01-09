const conn = require('../../config/mysql_connection')

let jsGetCompanyReviews = async (req, callback) => {
  var res = {}
  try {
    console.log('Job Seeker get company reviews.....')
    conn.query(
      "select count(reviewId) as NoOfReviews,companyId from Review where adminReviewStatus = 'APPROVED' group by companyId",
      async function (err, results) {
        if (results.length <= 0) {
          console.log('Not found')
          callback('Reviews not found', err)
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
    callback('Cannot get reviews', err)
  }
}

exports.jsGetCompanyReviews = jsGetCompanyReviews
