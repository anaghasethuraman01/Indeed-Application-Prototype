const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jsSchema = new Schema({
    jobSeekerId: {
        type: Number,
        required: true
    },
    resumeUrl: {
        type: String,
    },
    jobPreference: { 
        type: Schema.Types.Mixed, default: {} 
    },
    savedJobs: [{
        type: Array,
    }]
}, { minimize: false });

const JobSeeker = mongoose.model('JobSeeker',jsSchema);
module.exports = JobSeeker;