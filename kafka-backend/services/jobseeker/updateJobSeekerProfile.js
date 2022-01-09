const conn = require("../../config/mysql_connection");
const updateJobSeekerProfile= (req, callback)=> {
    try {
        const cid = req.id;
        const data = req.data;
        let queryKeys = '';
        let queryVal = [];
        let respData = {
            msg: 'success',
            code: '200'
        }
        for(let key in data) {
            if(queryKeys.length == 0) {
                queryKeys = key+'=?';
            } else {
                queryKeys += ','+key+'=?';;
            }

            queryVal.push(data[key]);
        }
        if(queryKeys.length == 0) {
            respData.code = '203';
            respData.msg = 'No data came from the client';
            callback('No data came from the client',respData);
        }
        queryVal.push(cid);
        const queryStr = 'UPDATE JobSeeker SET '+queryKeys+' WHERE id=?';
        console.log(queryStr);
        conn.query(queryStr,queryVal,(err,result)=> {
            if(err) {
                console.log(err);
                respData.code = '203';
                respData.msg = 'Failed to update profile for the job seeker.';
                respData.err = err;
                callback('Failed to update profile for the job seeker.',respData);
            } else {
                callback(null,respData);
            }
        })
        
    }
    catch (error) {
        console.log("ERROR while updating job seeker",error);
        respData.code = '203';
        respData.msg = 'Failed to update profile for the job seeker.';
        respData.err = err;
        callback('Failed to update profile for the job seeker.',respData);
    }
}
exports.updateJobSeekerProfile = updateJobSeekerProfile;