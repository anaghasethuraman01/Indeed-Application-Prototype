const conn = require('../../config/mysql_connection')
const mongoose = require('mongoose')
const Company = mongoose.model('Company')
let jsGetCompanyRatingAndReviews = async (req, callback) => {
  var res = {}
  try {
    console.log('Job Seeker jsGetCompanyRatingAndReviews.....')
    console.log(req.body)
    let { companyId } = req.body
    console.log(typeof companyId)
    companyId = parseInt(companyId)
    console.log('Getting Ratings and reviews for company id ' + companyId)
    // conn.query(
    //   "select CAST(avg(rating)AS DECIMAL(10,2)) as avgRating,companyId from Review where adminReviewStatus = 'APPROVED' group by companyId",
    //   async function (err, results) {
    //     if (results.length <= 0) {
    //       console.log('Not found')
    //       callback('Rating not found', err)
    //     }
    //     if (err) {
    //       console.log('error')
    //       callback('Error ocurred', err)
    //     }
    //     res = results
    //     callback(null, res)
    //   },
    // )

    Company.find(
      { companyId: companyId },
      { noOfReviews: 1, companyAvgRating: 1, _id: 0 },
    )
      .then((result) => {
        console.log(result)
        if (result) {
          res = result
          callback(null, res)
        } else {
          console.log('Not found')
          callback('Rating not found', err)
        }
      })
      .catch((err) => {
        console.log('Error occured while querying' + err)
        callback('Error ocurred', err)
      })
  } catch (err) {
    callback('Cannot get ratings', err)
  }
}

exports.jsGetCompanyRatingAndReviews = jsGetCompanyRatingAndReviews
