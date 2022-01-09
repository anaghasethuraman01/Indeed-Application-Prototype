const conn = require("../../config/mysql_connection");
const mongoose = require('mongoose')
const Company = mongoose.model('Company')
let snapshot = async (req, callback) => {
    let respData =  {
        code: '200',
        msg: 'success'
    }
    try {
        const cid = req.companyId;
        //const cid = 68;
        console.log("cid :"+ cid)
        Company.find({companyId:cid}).then(result=> {
            console.log(result);
            let cmpny = result[0];
            console.log("company :"+ cmpny)
            const companyQuery = 'SELECT * FROM Company WHERE companyId=?';
            conn.query(companyQuery,[cid], (error,details)=> {
                console.log(details);
                if(error) {
                    respData.code = '400';
                    respData.msg =  'Failed to get company details';
                    return callback('Failed to get company details',respData);
                }
                else {
                    details = details[0];
                    details.whScore = cmpny.avgWorkHappinessScore;
                    details.lScore = cmpny.avgLearningScore;
                    details.apScore = cmpny.avgAppreciationScore;
                    details.noOfReviews = cmpny.noOfReviews;
                    respData.details = details
                    return callback(null,respData);
                }
            })
        }).catch(err=> {
            console.log(err)
            respData.code = '503';
            respData.msg =  'Failed to get company details';
            return callback('Failed to get company details',respData);
        })
        
    }
    catch (error) {
        console.log("ERROR!!!!!" +error);
        respData.code = '400';
        respData.msg =  'Failed to get company details';
        return callback('Failed to get company details',respData);
    }
};
exports.snapshot = snapshot;