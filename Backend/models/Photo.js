const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
  jobSeekerId: {
    type: Number,
    required: true
  },
  companyId: {
    type: Number,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  imageLocation: {
    type: String,
    required: true
  },
  photoAdminReviewedStatus: {
    type: String,
    required: true
  }
});
module.exports = mongoose.model('Photo', PhotoSchema);