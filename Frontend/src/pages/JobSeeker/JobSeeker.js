// Job Seeker Landing Page
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../CSS/JobSeekerLanding.css'
import TextField from '@mui/material/TextField'
import { RatingView } from 'react-simple-star-rating'
import { makeStyles } from '@material-ui/styles'
import Autocomplete from '@mui/material/Autocomplete'
import axios from 'axios'
import backendServer from '../../webConfig'
import ReactPaginate from 'react-paginate'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'
import JobSeekerNavbar from './JobSeekerNavbar'
import JobSeekerLoggedInNavbar from './JobSeekerLoggedInNavbar'
import { Link } from 'react-router-dom'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
//       // Default transform is "translate(14px, 20px) scale(1)""
//       // This lines up the label with the initial cursor position in the input
//       // after changing its padding-left.
//       transform: 'translate(34px, 20px) scale(1);',
//       width: '',
//     },
//   },
//   inputRoot: {
//     color: 'purple',
//     // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
//     '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
//       // Default left padding is 6px
//       paddingLeft: 26,
//     },
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'green',
//     },
//     '&:hover .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'red',
//     },
//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'purple',
//     },
//   },
// }))

class JobSeekerLandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      month: '',
      day: '',
      year: '',
      whatVal: '',
      whereVal: '',
      allJobs: [],
      jobs: [],
      whatSearch: [],
      whereSearch: [],
      noOfCompanyReviews: [],
      avgCompanyRating: [],
      roleName: '',
      companyName: '',
      companyId: '',
      jobId: '',
      city: '',
      state: '',
      zip: '',
      rating: 0,
      reviewCount: 0,
      jobType: '',
      salary: '',
      location: '',
      responsibilities: '',
      qualifications: '',
      loveJobRole: '',
      applied: false,
      saved: false,
      currentPage: 1,
      totalPosts: 0,
      pageCount: 0,
      filterOn: false,
    }
    this.getCurrentDate()
  }

  getCurrentDate() {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    var dateObj = new Date()
    var month = monthNames[dateObj.getMonth()]
    var day = dateObj.getUTCDate()
    var year = dateObj.getUTCFullYear()
    console.log(month + ' ' + day + ' ' + year)

    this.state.month = month
    this.state.day = day
    this.state.year = year
    return year + '-' + (dateObj.getMonth() + 1) + '-' + day
  }

  componentDidMount() {
    this.getAllData()
  }

  async getAllData() {
    let job
    await axios.get(backendServer + '/jobSeeker/home').then(
      (response) => {
        if (response.status === 200 && response.data.length > 0) {
          console.log(response.data, response.status)
          let jobTitles = response.data.map((job) => {
            return job.jobTitle
          })

          console.log('Job Titles: ')
          console.log(jobTitles)

          let companyNames = response.data.map((job) => {
            return job.companyName
          })

          console.log('Company Names: ')
          console.log(companyNames)

          let whatSearch = jobTitles.concat(companyNames)

          whatSearch = whatSearch.filter(
            (job, index, self) => index === self.findIndex((j) => j === job),
          )

          let city = response.data.map((job) => {
            return job.city
          })
          let state = response.data.map((job) => {
            return job.state
          })
          let zip = response.data.map((job) => {
            return job.zip
          })
          let whereSearch = city.concat(state, zip)

          // remove duplicate job titles
          whereSearch = whereSearch.filter(
            (job, index, self) => index === self.findIndex((j) => j === job),
          )

          job = response.data[0]

          const pageCount = Math.ceil(response.data.length / 5)
          console.log(
            'Total data =' +
              response.data.length +
              ' Page count = ' +
              pageCount,
          )
          this.setState({
            allJobs: this.state.allJobs.concat(response.data),
            whatSearch: whatSearch,
            whereSearch: whereSearch,
            roleName: job.jobTitle,
            companyName: job.companyName,
            companyId: job.companyId,
            jobId: job.jobId,
            city: job.city,
            state: job.state,
            zip: job.zip,
            jobType: job.jobMode,
            salary: job.salaryDetails,
            location: job.city,
            responsibilities: job.responsibilities,
            qualifications: job.qualifications,
            loveJobRole: job.loveJobRole,
            totalPosts: response.data.length,
            pageCount: pageCount,
          })
        }
      },
      (error) => {
        console.log(error)
      },
    )

    let companyId = parseInt(job.companyId)

    await this.getReviewsAndRatings(companyId)

    await this.getAppliedStatus(job.jobId)

    await this.getSavedJobStatus(job.jobId)

    await this.getPaginatedData()
  }

  getReviewsAndRatings(companyId) {
    console.log('getting reviews for....: ' + companyId)
    const data = { companyId: companyId }
    axios
      .post(backendServer + '/jobSeeker/getCompanyRatingAndReviews', data)
      .then(
        (response) => {
          console.log('Ratings and Reviews')
          console.log(response.data, response.status)
          if (response.status === 200 && response.data.length > 0) {
            this.setState({
              rating: response.data[0].companyAvgRating,
              reviewCount: response.data[0].noOfReviews,
            })
          }
        },
        (error) => {
          console.log(error)
        },
      )
  }

  getPaginatedData() {
    console.log('Getting paginated data')
    console.log(this.state.currentPage)
    let data = { currentPage: this.state.currentPage }
    axios
      .post(backendServer + '/jobSeeker/paginatedData', data)
      .then((response) => {
        console.log(response.data, response.status)
        if (response.status === 200 && response.data.length > 0) {
          this.setState({
            jobs: response.data,
          })
        }
      })
  }

  getAppliedStatus(jobId) {
    const userInfo = this.props.userInfo
    const companyId = this.state.companyId
    const appliedDate = this.getCurrentDate()
    console.log(
      'Checking applied status with company id ' +
        companyId +
        ' and jobid ' +
        jobId,
    )
    if (userInfo.email !== '' && userInfo.accountType === 'JobSeeker') {
      console.log('User has signed in')
      const id = userInfo.id
      //console.log(id)
      const data = { appliedDate, jobId, id, companyId }
      //console.log(data)
      console.log(
        'Checking applied status for userid ' +
          userInfo.id +
          ' with company id ' +
          companyId +
          ' and jobid ' +
          jobId,
      )
      axios.defaults.headers.common['authorization'] = this.props.userInfo.token
      axios
        .post(backendServer + '/jobSeeker/checkAppliedStatus', data)
        .then((response) => {
          console.log(response.data, response.status)
          if (response.status === 200) {
            console.log('User has already applies to job')
            this.setState({
              applied: true,
            })
          } else {
            this.setState({
              applied: false,
            })
          }
        })
    } else {
      this.setState({
        applied: false,
      })
    }
  }

  getSavedJobStatus(jobId) {
    const userInfo = this.props.userInfo
    if (userInfo.email !== '' && userInfo.accountType === 'JobSeeker') {
      console.log(
        'Checking saved status for userid ' +
          userInfo.id +
          ' and jobid ' +
          jobId,
      )
      const userId = userInfo.id
      const {
        companyId,
        city,
        state,
        zip,
        jobType,
        salary,
        location,
        roleName,
        companyName,
      } = this.state
      const data = {
        companyId,
        city,
        state,
        zip,
        jobType,
        salary,
        location,
        roleName,
        companyName,
        jobId,
        userId,
      }
      axios.defaults.headers.common['authorization'] = this.props.userInfo.token
      axios
        .post(backendServer + '/jobSeeker/checkSavedStatus', data)
        .then((response) => {
          console.log(response.data, response.status)
          if (response.status === 200) {
            console.log('User has already saved this job')
            this.setState({
              saved: true,
            })
          } else {
            this.setState({
              saved: false,
            })
          }
        })
    } else {
      this.setState({
        saved: false,
      })
    }
  }

  handleWhatVal = (evt, value) => {
    // console.log(evt.target.value)
    // console.log(value)
    if (value)
      this.setState({
        whatVal: value,
      })
    if (evt.target.value)
      this.setState({
        whatVal: evt.target.value,
      })
  }

  handleWhereVal = (evt, value) => {
    // console.log(evt.target.value)
    // console.log(value)

    if (value)
      this.setState({
        whereVal: value,
      })
    if (evt.target.value)
      this.setState({
        whereVal: evt.target.value,
      })
  }

  handleFindJobs() {
    console.log('In find')
    console.log(this.state.whereVal, this.state.whatVal, this.state.currentPage)
    let job = []
    let currentPage = this.state.currentPage
    let totalCount = 0
    //check if filter is on or off
    if (!this.state.filterOn) {
      currentPage = 1
      this.setState({
        filterOn: true,
      })
    }

    if (this.state.whereVal.length && this.state.whatVal) {
      console.log('What and where')
      let data = {
        currentPage: currentPage,
        wherekeyword: this.state.whereVal,
        whatkeyword: this.state.whatVal,
      }
      axios
        .post(backendServer + '/jobSeeker/filterOnLocationAndTitle', data)
        .then((response) => {
          console.log(response.data, response.status)
          if (response.status === 200 && response.data) {
            job = response.data.result
            totalCount = response.data.count[0].count
            const pageCount = Math.ceil(totalCount / 5)
            console.log(
              'Total data =' + totalCount + ' Page count = ' + pageCount,
            )
            if (job.length > 0) {
              console.log('setting jobs')
              this.setState({
                jobs: job,
                totalPosts: totalCount,
                pageCount: pageCount,
                roleName: job[0].jobTitle,
                companyName: job[0].companyName,
                companyId: job[0].companyId,
                jobId: job[0].jobId,
                city: job[0].city,
                state: job.state,
                zip: job[0].zip,
                jobType: job[0].jobMode,
                salary: job[0].salaryDetails,
                location: job[0].city,
                responsibilities: job[0].responsibilities,
                qualifications: job[0].qualifications,
                loveJobRole: job[0].loveJobRole,
              })
              let companyId = parseInt(job[0].companyId)

              this.getReviewsAndRatings(companyId)
            }
          }
        })
    } else if (this.state.whereVal.length && !this.state.whatVal) {
      console.log('only where')
      let data = { currentPage: 1, keyword: this.state.whereVal }
      axios
        .post(backendServer + '/jobSeeker/filterOnLocation', data)
        .then((response) => {
          console.log(response.data, response.status)
          if (response.status === 200 && response.data) {
            job = response.data.result
            totalCount = response.data.count[0].count
            const pageCount = Math.ceil(totalCount / 5)
            console.log(
              'Total data =' + totalCount + ' Page count = ' + pageCount,
            )
            if (job.length > 0) {
              console.log('setting jobs')
              this.setState({
                jobs: job,
                totalPosts: totalCount,
                pageCount: pageCount,
                roleName: job[0].jobTitle,
                companyName: job[0].companyName,
                companyId: job[0].companyId,
                jobId: job[0].jobId,
                city: job[0].city,
                state: job.state,
                zip: job[0].zip,
                jobType: job[0].jobMode,
                salary: job[0].salaryDetails,
                location: job[0].city,
                responsibilities: job[0].responsibilities,
                qualifications: job[0].qualifications,
                loveJobRole: job[0].loveJobRole,
              })
              let companyId = parseInt(job[0].companyId)

              this.getReviewsAndRatings(companyId)
            }
          }
        })
    } else if (!this.state.whereVal.length && this.state.whatVal) {
      console.log('only what')
      let data = { currentPage: 1, keyword: this.state.whatVal }
      axios
        .post(backendServer + '/jobSeeker/filterOnJobTitleOrCompanyName', data)
        .then((response) => {
          if (response.status === 200 && response.data) {
            console.log(
              response.data.result,
              response.status,
              response.data.count[0].count,
            )
            job = response.data.result
            totalCount = response.data.count[0].count
            const pageCount = Math.ceil(totalCount / 5)
            console.log(
              'Total data =' + totalCount + ' Page count = ' + pageCount,
            )
            if (job.length > 0) {
              console.log('setting jobs')
              this.setState({
                jobs: job,
                totalPosts: totalCount,
                pageCount: pageCount,
                roleName: job[0].jobTitle,
                companyName: job[0].companyName,
                companyId: job[0].companyId,
                jobId: job[0].jobId,
                city: job[0].city,
                state: job.state,
                zip: job[0].zip,
                jobType: job[0].jobMode,
                salary: job[0].salaryDetails,
                location: job[0].city,
                responsibilities: job[0].responsibilities,
                qualifications: job[0].qualifications,
                loveJobRole: job[0].loveJobRole,
              })
              let companyId = parseInt(job[0].companyId)

              this.getReviewsAndRatings(companyId)
            }
          }
        })
    }
  }

  handleCardClick = (evt) => {
    console.log(evt.currentTarget.id)
    let jobId = parseInt(evt.currentTarget.id)
    let job = this.state.allJobs.filter((job) => job.jobId === jobId)[0]

    console.log(job.jobTitle)
    console.log(job.companyId)
    let companyId = job.companyId
    console.log(
      'No oof company reviews: ' +
        this.state.noOfCompanyReviews.length +
        ' ratings: ' +
        this.state.avgCompanyRating.length,
    )
    let reviews = this.state.noOfCompanyReviews.filter(
      (reviews) => reviews.companyId === companyId,
    )

    console.log(reviews.length + ' for company id ' + companyId)
    if (reviews.length > 0) {
      reviews = reviews[0]
      console.log(reviews.NoOfReviews)
      this.setState({ reviewCount: reviews.NoOfReviews })
    } else this.setState({ reviewCount: 0 })
    let avgrating = this.state.avgCompanyRating.filter(
      (rating) => rating.companyId === companyId,
    )
    if (avgrating.length > 0) {
      avgrating = avgrating[0]
      console.log(avgrating.avgRating)
      this.setState({ rating: avgrating.avgRating })
    } else this.setState({ rating: 0 })

    this.setState(
      {
        roleName: job.jobTitle,
        companyName: job.companyName,
        companyId: job.companyId,
        jobId: job.jobId,
        city: job.city,
        state: job.state,
        zip: job.zip,
        jobType: job.jobMode,
        salary: job.salaryDetails,
        location: job.city,
        responsibilities: job.responsibilities,
        qualifications: job.qualifications,
        loveJobRole: job.loveJobRole,
      },
      () => {
        let companyId = parseInt(job.companyId)

        this.getReviewsAndRatings(companyId)
        this.getAppliedStatus(job.jobId)
        this.getSavedJobStatus(job.jobId)
      },
    )
  }

  async handleCompanyLink() {
    const payload1 = this.state.companyName

    this.props.companyName(payload1)

    const payload2 = this.state.companyId

    this.props.companyId(payload2)

    let data = { id: this.state.companyId, viewDate: this.getCurrentDate() }
    console.log(data)
    await axios
      .post(backendServer + '/jobSeeker/updateNoOfViews', data)
      .then((response) => {
        console.log(response.data, response.status)
      })

    this.props.history.push('/snapshot')
  }

  handleApply(evt) {
    console.log(evt.currentTarget.id)
    const jobId = parseInt(evt.currentTarget.id)
    const userInfo = this.props.userInfo
    const companyId = parseInt(this.state.companyId)
    //const appliedDate = this.getCurrentDate()
    console.log(userInfo)
    if (userInfo.email !== '' && userInfo.accountType === 'JobSeeker') {
      console.log('User has signed in')
      const payload1 = jobId

      this.props.jobId(payload1)

      const payload2 = companyId

      this.props.companyId(payload2)

      this.props.history.push('/applyJobs')
    } else {
      console.log("User didn't sign in")
      this.props.history.push('/login')
    }
  }

  async handleSaveJob(evt) {
    console.log(evt.currentTarget.id)
    const companyId = evt.currentTarget.id
    const jobId = this.state.jobId
    const userInfo = this.props.userInfo
    const {
      city,
      state,
      zip,
      jobType,
      salary,
      location,
      roleName,
      companyName,
    } = this.state

    console.log(userInfo)
    if (userInfo.email !== '' && userInfo.accountType === 'JobSeeker') {
      console.log('User has signed in')
      const userId = userInfo.id
      const data = {
        companyId,
        city,
        state,
        zip,
        jobType,
        salary,
        location,
        roleName,
        companyName,
        jobId,
        userId,
      }
      axios.defaults.headers.common['authorization'] = this.props.userInfo.token
      await axios
        .post(backendServer + '/jobSeeker/saveJob', data)
        .then((response) => {
          console.log(response.data, response.status)
          if (response.status === 200) {
            this.setState({
              saved: true,
            })
          }
        })
    } else {
      console.log("User didn't sign in")
      this.props.history.push('/login')
    }
  }

  async handleUnsaveJob(evt) {
    console.log(evt.currentTarget.id)
    const companyId = evt.currentTarget.id
    const jobId = this.state.jobId
    const userInfo = this.props.userInfo
    const {
      city,
      state,
      zip,
      jobType,
      salary,
      location,
      roleName,
      companyName,
    } = this.state

    console.log(userInfo)
    if (userInfo.email !== '' && userInfo.accountType === 'JobSeeker') {
      console.log('User has signed in')
      const userId = userInfo.id
      const data = {
        companyId,
        city,
        state,
        zip,
        jobType,
        salary,
        location,
        roleName,
        companyName,
        jobId,
        userId,
      }
      axios.defaults.headers.common['authorization'] = this.props.userInfo.token
      await axios
        .post(backendServer + '/jobSeeker/unsaveJob', data)
        .then((response) => {
          console.log(response.data, response.status)
          if (response.status === 200) {
            this.setState({
              saved: false,
            })
          }
        })
    } else {
      console.log("User didn't sign in")
      this.props.history.push('/login')
    }
  }

  handlePageClick = (event) => {
    // const newOffset = (event.selected * 2) % this.state.totalCount
    console.log(`User requested page number ${event.selected + 1}`)
    //setItemOffset(newOffset);
    this.setState(
      {
        currentPage: event.selected + 1,
      },
      () => {
        if (this.state.filterOn) this.handleFindJobs()
        else this.getPaginatedData()
      },
    )
  }

  render() {
    const userInfo = this.props.userInfo
    return (
      <div>
        {userInfo.email !== '' && userInfo.accountType === 'JobSeeker' ? (
          <JobSeekerLoggedInNavbar />
        ) : (
          <JobSeekerNavbar />
        )}
        <div id="Second" class="row searchNav">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-9">
              <div class="row">
                <div class="col-4">
                  <div class="input-group mb-3">
                    <button
                      class="btn noLeftborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <h6 style={{ marginTop: '10px' }}>What</h6>
                    </button>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      sx={{
                        width: 180,
                        borderBottom: 'none',
                        borderWidth: '0 0 0 0',
                      }}
                      value={this.state.whatVal}
                      onChange={this.handleWhatVal.bind(this)}
                      onInputChange={this.handleWhatVal.bind(this)}
                      options={this.state.whatSearch.map((option) => option)}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        // <TextField
                        //   {...params}
                        //   sx={{ width: 180, borderBottom: 'none' }}
                        //   //class="whatSearch2"
                        //   onChange={this.handleWhatVal.bind(this)}
                        //   value={this.state.whatVal}
                        // />
                        <div ref={params.InputProps.ref}>
                          <input
                            type="text"
                            {...params.inputProps}
                            // style={{ height: '50px' }}
                            class="whatSearch2"
                          />
                        </div>
                      )}
                    />
                    <button
                      class="btn noRightborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <i
                        class="bi bi-search"
                        style={{ width: '32px', height: '32px' }}
                      ></i>
                    </button>
                  </div>
                </div>
                <div class="col-4">
                  <div class="input-group mb-3">
                    <button
                      class="btn noLeftborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <h6 style={{ marginTop: '10px' }}>Where</h6>
                    </button>
                    <Autocomplete
                      id="free-solo-demo"
                      freeSolo
                      //sx={{ width: 180, borderBottom: 'none' }}
                      value={this.state.whereVal}
                      onChange={this.handleWhereVal.bind(this)}
                      onInputChange={this.handleWhereVal.bind(this)}
                      options={this.state.whereSearch.map((option) => option)}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        // <TextField
                        //   {...params}
                        //   sx={{ width: 180, borderBottom: 'none' }}
                        //   //class="whatSearch2"
                        //   value={this.state.whereVal}
                        //   onChange={this.handleWhereVal}
                        // />
                        <div ref={params.InputProps.ref}>
                          <input
                            type="text"
                            {...params.inputProps}
                            // style={{ height: '50px' }}
                            class="whatSearch2"
                          />
                        </div>
                      )}
                    />
                    <button
                      class="btn noRightborder"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
                      <i
                        class="bi bi-geo-alt"
                        style={{ width: '32px', height: '51px' }}
                      ></i>
                    </button>
                  </div>
                </div>
                <div class="col-1">
                  <button
                    type="button"
                    class="btn findbtn"
                    onClick={this.handleFindJobs.bind(this)}
                  >
                    <h5 style={{ marginTop: '4px', color: 'white' }}>
                      Find Jobs
                    </h5>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-4"></div>
            <div class="col-4">
              <h5>
                <span class="hoverUnderline" style={{ color: '#003399' }}>
                  {userInfo.email !== '' &&
                  userInfo.accountType === 'JobSeeker' ? (
                    <Link
                      to="/resume"
                      style={{ textDecoration: 'none', color: '#003399' }}
                    >
                      {' '}
                      Post your resume{' '}
                    </Link>
                  ) : (
                    'Post your resume'
                  )}
                </span>
                &nbsp;- It only takes a few seconds
              </h5>
            </div>
            <div class="col-4"></div>
          </div>

          <div class="row" style={{ marginTop: '10px' }}>
            <div class="col-4"></div>
            <div class="col-4">
              <h5 style={{ marginLeft: '120px' }}>
                Employers:
                <span class="hoverUnderline" style={{ color: '#003399' }}>
                  Post a Job
                </span>
              </h5>
            </div>
            <div class="col-4"></div>
          </div>
        </div>
        <hr />
        <div id="third" class="row" style={{ marginTop: '10px' }}>
          <div class="row">
            <div class="col-4"></div>
            <div class="col-7">
              <div class="row">
                <div class="col-3">
                  <h3
                    class="headinghoverUnderline"
                    style={{ color: '#003399' }}
                  >
                    <u style={{ color: '#003399' }}>Job feed </u>
                  </h3>
                </div>
                <div class="col-4">
                  <h3 class="headinghoverUnderline">Recent Searches</h3>
                </div>
              </div>
            </div>
            <div class="col-1"></div>
          </div>
        </div>
        <div
          id="third"
          class="row "
          style={{ backgroundColor: '#f7f7f7', marginTop: '20px' }}
        >
          <div class="row">
            <div class="col-2"></div>
            <div class="col-4" style={{ marginLeft: '0px' }}>
              <h4 style={{ marginTop: '10px' }}>
                {this.state.month} {this.state.day}, {this.state.year}
              </h4>
              Job based on your searches
              {this.state.jobs.map((job) => (
                <div
                  class="card cardStyle2"
                  id={job.jobId}
                  onClick={this.handleCardClick}
                >
                  <div class="card-body">
                    <h4 class="card-title">{job.jobTitle}</h4>
                    <h6 class="card-title">{job.companyName}</h6>
                    <h6 class="card-title">
                      {job.city}, {job.state}, {job.zip}
                    </h6>
                    <h6 class="card-title">$ {job.salaryDetails}</h6>
                    <br />
                    <br />
                    <p class="card-text">{job.shortJobDescription}</p>
                  </div>
                </div>
              ))}
            </div>

            <div class="col-5">
              <div class="card cardStyle">
                <div class="card-body">
                  <h4 class="card-title">{this.state.roleName}</h4>
                  <h6
                    class="card-title companyNameCss"
                    onClick={this.handleCompanyLink.bind(this)}
                  >
                    {this.state.companyName}
                  </h6>
                  <RatingView ratingValue={this.state.rating} />
                  <br />
                  <h6 class="card-title">{this.state.reviewCount} reviews</h6>
                  <h6 class="card-title">
                    {this.state.city}, {this.state.state}
                  </h6>
                  <h6 class="card-title">{this.state.zip}</h6>
                  You must create an Indeed account before continuing to the
                  company website to apply
                  <br />
                  <br />
                  <div class="btn-group" role="group" aria-label="Third group">
                    {this.state.applied ? (
                      <button
                        type="button"
                        class="btn applybtn"
                        id={this.state.jobId}
                        disabled
                      >
                        <h5 style={{ marginTop: '4px', color: 'white' }}>
                          Applied to Company
                        </h5>
                      </button>
                    ) : (
                      <button
                        type="button"
                        class="btn applybtn"
                        onClick={this.handleApply.bind(this)}
                        id={this.state.jobId}
                      >
                        <h5 style={{ marginTop: '4px', color: 'white' }}>
                          Apply On Company Site
                        </h5>
                      </button>
                    )}
                  </div>
                  <div class="btn-group" role="group" aria-label="Third group">
                    {this.state.saved ? (
                      <button
                        type="button"
                        class="btn undosavebtn"
                        id={this.state.companyId}
                        onClick={this.handleUnsaveJob.bind(this)}
                      >
                        <h5 style={{ marginTop: '4px', color: 'white' }}>
                          Undo Save
                        </h5>
                      </button>
                    ) : (
                      <button
                        type="button"
                        class="btn savebtn"
                        id={this.state.companyId}
                        onClick={this.handleSaveJob.bind(this)}
                      >
                        <h5 style={{ marginTop: '4px', color: 'white' }}>
                          Save
                        </h5>
                      </button>
                    )}
                  </div>
                  <br />
                  <br />
                  <hr />
                  <br />
                  <h5 class="card-title">Job details</h5>
                  <br />
                  <h6 style={{ fontWeight: 'bold' }}>Job Type:</h6>
                  <h6>{this.state.jobType}</h6> <br />
                  <h6 style={{ fontWeight: 'bold' }}>Salary:</h6>
                  <h6>${this.state.salary}</h6>
                  <br />
                  <hr />
                  <h5 class="card-title">Full Job Description</h5>
                  <br />
                  <h6 style={{ fontWeight: 'bold' }}>Location:</h6>
                  <h6>{this.state.location}</h6>
                  <br />
                  <h6 style={{ fontWeight: 'bold' }}>What you will do:</h6>
                  <h6 style={{ whiteSpace: 'pre-wrap', color: '#262626' }}>
                    {this.state.responsibilities}
                  </h6>
                  <br />
                  <h6 style={{ fontWeight: 'bold' }}>What you will need:</h6>
                  <h6 style={{ whiteSpace: 'pre-wrap', color: '#262626' }}>
                    {this.state.qualifications}
                  </h6>{' '}
                  <br />
                  <h6 style={{ fontWeight: 'bold' }}>
                    Why You’ll love working:
                  </h6>
                  <h6 style={{ whiteSpace: 'pre-wrap', color: '#262626' }}>
                    {this.state.loveJobRole}
                  </h6>{' '}
                  <br />
                </div>
              </div>
            </div>
            <div class="col-1"></div>
          </div>
        </div>
        {/* <Pagination
          postsPerPage={5}
          totalPosts={this.state.totalPosts}
          paginate={this.paginate}
        /> */}
        <div style={{ marginLeft: '50%' }}>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={this.handlePageClick.bind(this)}
            pageRangeDisplayed={5}
            pageCount={this.state.pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log('dispatching props')
  return {
    companyName: (payload) => {
      dispatch({ type: 'setCompName', payload })
    },
    companyId: (payload) => {
      dispatch({ type: 'setCompId', payload })
    },
    jobId: (payload) => {
      dispatch({ type: 'setJobId', payload })
    },
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(JobSeekerLandingPage))
