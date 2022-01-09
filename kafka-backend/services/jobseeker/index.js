'use strict'
const { getAllUsrReviews } = require('./getAllUsrReviews')
const { updateJobSeekerProfile } = require('./updateJobSeekerProfile')
const { setJobPreferences } = require('./setJobPreferences')
const { appliedjobs } = require('./appliedjobs')
const { companyReviews } = require('./companyReviews')
const { companyReviewsPaginated } = require('./companyReviewsPaginated')
const { companyReviewsRatingSort } = require('./companyReviewsRatingSort')
const { companyReviewsDateSort } = require('./companyReviewsDateSort')
const { companyReviewsHelpfulSort } = require('./companyReviewsHelpfulSort')
const { companyReviewsRatingFilter } = require('./companyReviewsRatingFilter')
const {
  companyReviewsRatingFilterTotal,
} = require('./companyReviewsRatingFilterTotal')
const { updateHelpfulCount } = require('./updateHelpfulCount')
const { saveReview } = require('./saveReview')
const { allReviews } = require('./allReviews')
const { searchReview } = require('./searchReview')
const { reviewsByProfile } = require('./reviewsByProfile')
const { reviewsByProfilePaginated } = require('./reviewsByProfilePaginated')
const { jsApplyJob } = require('./jsApplyJob')
const {
  jsFilterOnJobTitleOrCompanyName,
} = require('./jsFilterOnJobTitleOrCompanyName')
const { jsFilterOnLocation } = require('./jsFilterOnLocation')
const { jsFilterOnLocationAndTitle } = require('./jsFilterOnLocationAndTitle')
const {
  jsGetCompanyRatingAndReviews,
} = require('./jsGetCompanyRatingAndReviews')
const { jsGetCompanyReviews } = require('./jsGetCompanyReviews')
const { jsHome } = require('./jsHome')
const { jsPaginatedData } = require('./jsPaginatedData')
const { jsSaveJob } = require('./jsSaveJob')
const { jsUpdateNoOfViews } = require('./jsUpdateNoOfViews')
const { jsCheckAppliedStatus } = require('./jsCheckAppliedStatus')
const { jsCheckSavedStatus } = require('./jsCheckSavedStatus')
const { savedjobs } = require('./savedjobs')
const {
  saveConversation,
  getConversationById,
  getJobSeekerById,
  getEmployerById,
} = require('./conversationRoute')
const {
  addNewMessage,
  getMessagesByConversationId,
  getAllJobSeekers,
} = require('./messageRoute')
const { uploadCompanyPhotos } = require('./uploadCompanyPhotos')
const { getAllPhotos } = require('./getAllPhotos')
const { findSalDisplay, findSalByTitleDisplay } = require('./findSalaryDisplay')
const { jobsApplyJob } = require('./jobsApplyJob')
const { jobsCompanyJobs } = require('./jobsCompanyJobs')
const {
  jobsFilterOnJobTitleOrCompanyName,
} = require('./jobsFilterOnJobTitleOrCompanyName')
const { jobsFilterOnLocation } = require('./jobsFilterOnLocation')
const {
  jobsFilterOnLocationAndTitle,
} = require('./jobsFilterOnLocationAndTitle')
const { jobsGetCompanyImage } = require('./jobsGetCompanyImage')
const { jobsPaginatedData } = require('./jobsPaginatedData')
const { getJobSeekerPhotos } = require('./getJobSeekerPhotos')
const { getJobSeekerProfile } = require('./getJobSeekerProfile')
const { jsUnsavejob } = require('./jsUnsavejob')

function handle_request(msg, callback) {
  switch (msg.route) {
    case 'setJobPreferences':
      setJobPreferences(msg, callback)
      break
    case 'updateJobSeekerProfile':
      updateJobSeekerProfile(msg, callback)
      break
    case 'savedjobs':
      savedjobs(msg, callback)
      break
    case 'appliedjobs':
      appliedjobs(msg, callback)
      break
    case 'getAllUsrReviews':
      getAllUsrReviews(msg, callback)
      break
    case 'companyReviews':
      companyReviews(msg, callback)
      break
    case 'companyReviewsPaginated':
      companyReviewsPaginated(msg, callback)
      break
    case 'companyReviewsRatingSort':
      companyReviewsRatingSort(msg, callback)
      break
    case 'companyReviewsDateSort':
      companyReviewsDateSort(msg, callback)
      break
    case 'companyReviewsHelpfulSort':
      companyReviewsHelpfulSort(msg, callback)
      break
    case 'companyReviewsRatingFilter':
      companyReviewsRatingFilter(msg, callback)
      break
    case 'companyReviewsRatingFilterTotal':
      companyReviewsRatingFilterTotal(msg, callback)
      break
    case 'updateHelpfulCount':
      updateHelpfulCount(msg, callback)
      break
    case 'saveReview':
      saveReview(msg, callback)
      break
    case 'allReviews':
      allReviews(msg, callback)
      break
    case 'searchReview':
      searchReview(msg, callback)
      break
    case 'reviewsByProfile':
      reviewsByProfile(msg, callback)
      break
    case 'reviewsByProfilePaginated':
      reviewsByProfilePaginated(msg, callback)
      break
    case 'applyJob':
      jsApplyJob(msg, callback)
      break
    case 'filterOnJobTitleOrCompanyName':
      jsFilterOnJobTitleOrCompanyName(msg, callback)
      break
    case 'filterOnLocation':
      jsFilterOnLocation(msg, callback)
      break
    case 'filterOnLocationAndTitle':
      jsFilterOnLocationAndTitle(msg, callback)
      break
    case 'getCompanyRatingAndReviews':
      jsGetCompanyRatingAndReviews(msg, callback)
      break
    case 'getCompanyReviews':
      jsGetCompanyReviews(msg, callback)
      break
    case 'home':
      jsHome(msg, callback)
      break
    case 'paginatedData':
      jsPaginatedData(msg, callback)
      break
    case 'saveJob':
      jsSaveJob(msg, callback)
      break
    case 'updateNoOfViews':
      jsUpdateNoOfViews(msg, callback)
      break
    case 'checkSavedStatus':
      jsCheckSavedStatus(msg, callback)
      break
    case 'checkAppliedStatus':
      jsCheckAppliedStatus(msg, callback)
      break

    case 'findSalDisplay':
      findSalDisplay(msg, callback)
      break
    case 'findSalByTitleDisplay':
      findSalByTitleDisplay(msg, callback)
      break
    case 'saveConversation':
      saveConversation(msg, callback)
      break
    case 'getConversationById':
      getConversationById(msg, callback)
      break
    case 'getJobSeekerById':
      getJobSeekerById(msg, callback)
      break
    case 'getEmployerById':
      getEmployerById(msg, callback)
      break
    case 'addNewMessage':
      addNewMessage(msg, callback)
      break
    case 'getMessagesByConversationId':
      getMessagesByConversationId(msg, callback)
      break
    case 'getAllJobSeekers':
      getAllJobSeekers(msg, callback)
      break
    case 'uploadCompanyPhotos':
      uploadCompanyPhotos(msg, callback)
      break
    case 'getAllPhotos':
      getAllPhotos(msg, callback)
      break

    case 'companyJobs':
      jobsCompanyJobs(msg, callback)
      break
    case 'jobsApplyJob':
      jobsApplyJob(msg, callback)
      break

    case 'jobsFilterOnJobTitleOrCompanyName':
      jobsFilterOnJobTitleOrCompanyName(msg, callback)
      break
    case 'jobsFilterOnLocation':
      jobsFilterOnLocation(msg, callback)
      break

    case 'jobsFilterOnLocationAndTitle':
      jobsFilterOnLocationAndTitle(msg, callback)
      break
    case 'getCompanyImage':
      jobsGetCompanyImage(msg, callback)
      break

    case 'jobsPaginatedData':
      jobsPaginatedData(msg, callback)
      break

    case 'getJobSeekerPhotos':
      getJobSeekerPhotos(msg, callback)
      break

    case 'unsaveJob':
      jsUnsavejob(msg, callback)
      break
    case 'getJobSeekerProfile':
      getJobSeekerProfile(msg, callback)
      break
  }
}

exports.handle_request = handle_request
