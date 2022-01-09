'use strict'
const express = require('express')
const router = express.Router()
const conn = require('./../config/mysql_connection')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const Company = mongoose.model('Company')
const JobSeeker = mongoose.model('JobSeeker')
const kafka = require('../kafka/client')
const { checkAuth } = require('../config/passport')

router.get('/jobSeeker/home', (req, res) => {
  console.log('Job Seeker home.....')
  let msg = {}
  msg.route = 'home'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobSeeker/paginatedData', (req, res) => {
  console.log('Job Seeker getting paginated data.....')
  let msg = {}
  msg.route = 'paginatedData'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobSeeker/filterOnJobTitleOrCompanyName', (req, res) => {
  console.log('Job Seeker filter On JobTitle Or CompanyName.....')
  let msg = {}
  msg.route = 'filterOnJobTitleOrCompanyName'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobSeeker/filterOnLocation', (req, res) => {
  console.log('Job Seeker filter On location.....')
  let msg = {}
  msg.route = 'filterOnLocation'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobSeeker/filterOnLocationAndTitle', (req, res) => {
  console.log('Job Seeker filter On location and title.....')
  let msg = {}
  msg.route = 'filterOnLocationAndTitle'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobSeeker/getCompanyRatingAndReviews', (req, res) => {
  console.log('Job Seeker get company reviews.....')
  let msg = {}
  msg.route = 'getCompanyRatingAndReviews'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.get('/jobSeeker/getCompanyReviews', (req, res) => {
  console.log('Job Seeker get company reviews.....')
  let msg = {}
  msg.route = 'getCompanyReviews'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.get('/jobSeeker/getCompanyRating', (req, res) => {
  console.log('Job Seeker get company rating.....')
  let msg = {}
  msg.route = 'getCompanyRating'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobSeeker/updateNoOfViews', (req, res) => {
  console.log('Job Seeker updating no of views.....')
  let msg = {}
  msg.route = 'updateNoOfViews'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobSeeker/saveJob', checkAuth, (req, res) => {
  console.log('Job Seeker saving to jobs array.....')
  let msg = {}
  msg.route = 'saveJob'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      res.status(200).send(results)
    }
  })
})

router.post('/jobSeeker/unsaveJob', checkAuth, (req, res) => {
  console.log('Job Seeker removing jobs array.....')
  let msg = {}
  msg.route = 'unsaveJob'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      console.log('Unsave success')
      res.status(200).send(results)
    }
  })
})

router.post('/jobSeeker/checkSavedStatus', checkAuth, (req, res) => {
  console.log('Job Seeker checking saved status.....')
  let msg = {}
  msg.route = 'checkSavedStatus'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      console.log(results)
      return res.status(results.status).send(results)
    }
  })
})

router.post('/jobSeeker/applyJob', checkAuth, (req, res) => {
  console.log('Job Seeker Applying to a job.....')
  let msg = {}
  msg.route = 'applyJob'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      return res.status(200).send(results)
    }
  })
})

router.post('/jobSeeker/checkAppliedStatus', checkAuth, (req, res) => {
  console.log('Job Seeker checking applies status.....')
  let msg = {}
  msg.route = 'checkAppliedStatus'
  msg.body = req.body
  kafka.make_request('jobseeker', msg, function (err, results) {
    if (err) {
      console.log(err)
      return res.status(400).send(err)
    } else {
      console.log(results)
      return res.status(results.status).send(results)
    }
  })
})

module.exports = router
