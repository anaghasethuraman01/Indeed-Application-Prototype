
const mongoose = require('mongoose')
const JobSeeker = mongoose.model('JobSeeker')
const setJobPreferences= (req, callback)=> {
    try {
        const jid = req.id;
        const data = req.data;
        let respData = {
            msg: 'success',
            code: '200'
        }
        const prefKeys = ['Job Title','Job Types','Work Schedules','Pay','Relocation','Remote'];
        let updateKey = '';
        for(let key in data) {
            updateKey = key;
            if(!prefKeys.includes(key)) {
                respData.code = '400';
                respData.msg = 'Invalid job preference "'+key+'" sent from client';
                return callback(respData.msg,res.send(respData));
            } 
            // else {
            //     let upArr = updateKey.split(' ');
            //     if(upArr.length  ==  2) {
            //         updateKey = upArr[0]+upArr[1];
            //     }
            // }
        }
        let upJson = {};
        upJson['jobPreference.'+updateKey] = data[updateKey];
        console.log('updating:',upJson)
        JobSeeker.findOneAndUpdate({jobSeekerId:jid},{$set: upJson}).then(result=> {
            return callback(null,respData);
        }).catch(err=> {
            console.log(err);
            respData.err = err;
            respData.code = '400';
            respData.msg = 'Failed to update job preference. Please refer console for more details';
            callback(respData.msg,respData);
        })
        
    }
    catch (error) {
        console.log("ERROR!!!!!",error);
        respData.err = error;
        respData.code = '400';
        respData.msg = 'Failed to update job preference. Please refer console for more details';
        return callback('Failed to update jobseeker preference',respData);
    }
}
exports.setJobPreferences = setJobPreferences;