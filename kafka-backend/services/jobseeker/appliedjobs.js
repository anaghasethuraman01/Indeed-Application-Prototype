const conn = require('../../config/mysql_connection')

let appliedjobs = async (req, callback) => {
  var respData = {
      code: '200',
      msg: 'success'
  }
  try {
    let userId = req.userId;
    let sql = "SELECT ap.status, j.jobTitle, j.companyName, j.streetAddress, j.state, j.country, j.jobMode from AppliedJobs ap INNER JOIN Job j ON ap.jobId= j.jobId  WHERE ap.id=?";
    conn.query(sql,[userId],
      async function (err, results) {
        if (err) {
            console.log(err);
            respData.code  = '203';
            respData.msg  = 'Cannot fetch applied jobs data';
            return callback('Cannot fetch applied jobs', respData)
        }
        else if (results==null || results.length <= 0) {
          respData.row = [];
        } else {
            respData.row = results;
        }
        callback(null, respData);
      },
    )
  } catch (err) {
    console.log(err);
    respData.code  = '203';
    respData.msg  = 'Cannot fetch applied jobs data';
    callback('Cannot fetch applied jobs', respData)
  }
}

exports.appliedjobs = appliedjobs
