const conn = require('../../config/mysql_connection')
const mongoose = require('mongoose')
const Company = mongoose.model('Company')
let jobsGetCompanyImage = async (req, callback) => {
  var res = {}
  let { companyId } = req.body
  console.log(req.body)
  try {
    Company.findOne({ companyId: companyId })
      .then((result) => {
        console.log('sending Image response ............')
        console.log(result)
        res = result
        callback(null, res)
      })
      .catch((err) => {
        console.log('Error occured while querying' + err)
        callback('Cannot get company image', err)
      })
  } catch {
    ;(err) => {
      callback('Cannot get company image', err)
    }
  }
}

exports.jobsGetCompanyImage = jobsGetCompanyImage
