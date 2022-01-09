const express = require('express')
const router = express.Router()
const conn = require('./../config/mysql_connection')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const Company = mongoose.model('Company')
const kafka = require('../kafka/client')
const { checkAuth } = require('../config/passport')

router.post('/jobs/companyJobs', (req, res) => {
  console.log('Job company jobs.....')
  let msg = {}
  msg.route = 'companyJobs'
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

router.post('/jobs/paginatedData', (req, res) => {
  console.log('Job paginated data.....')
  let msg = {}
  msg.route = 'jobsPaginatedData'
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

router.post('/jobs/filterOnJobTitleOrCompanyName', (req, res) => {
  console.log('Job filterOnJobTitleOrCompanyName data.....')
  let msg = {}
  msg.route = 'jobsFilterOnJobTitleOrCompanyName'
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

router.post('/jobs/filterOnLocation', (req, res) => {
  console.log('Job filterOnLocation data.....')
  let msg = {}
  msg.route = 'jobsFilterOnLocation'
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

router.post('/jobs/filterOnLocationAndTitle', (req, res) => {
  console.log('Job filterOnLocationAndTitle data.....')
  let msg = {}
  msg.route = 'jobsFilterOnLocationAndTitle'
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

router.post('/jobs/applyJob', checkAuth, (req, res) => {
  console.log('Job applyJob data.....')
  let msg = {}
  msg.route = 'jobsApplyJob'
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

router.post('/jobs/getCompanyImage', (req, res) => {
  console.log('Job getCompanyImage data.....')
  let msg = {}
  msg.route = 'getCompanyImage'
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

module.exports = router
