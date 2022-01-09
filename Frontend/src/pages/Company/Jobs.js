import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/styles'
import Autocomplete from '@mui/material/Autocomplete'
import axios from 'axios'
import backendServer from '../../webConfig'
import ReactPaginate from 'react-paginate'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CompanyTabs from './CompanyTabs'
import Pagination from '../JobSeeker/Pagination'

class CompanyJobs extends Component {
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
      noJobs: false,
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
    let companyName = this.props.companyInfo.compName
    this.setState(
      {
        companyName: companyName,
      },
      () => {
        this.getAllData()
      },
    )
  }

  async getAllData() {
    await this.getPaginatedData()

    let job
    let companyName = this.state.companyName
    const data = { companyName }
    console.log(this.props.companyInfo.compName)
    await axios.post(backendServer + '/jobs/companyJobs', data).then(
      (response) => {
        console.log(response.data, response.status)
        if (response.status === 200 && response.data.length > 0) {
          let jobTitles = response.data.map((job) => {
            return job.jobTitle
          })

          console.log('Job Titles: ')
          console.log(jobTitles)

          // let companyNames = response.data.map((job) => {
          //   return job.companyName
          // })

          // console.log('Company Names: ')
          // console.log(companyNames)

          let whatSearch = jobTitles
          // .concat(companyNames)

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

          this.calculateDaysSincePosted()

          this.getAppliedStatus(job.jobId)
        } else
          this.setState({
            noJobs: true,
          })
      },
      (error) => {
        console.log(error)
      },
    )
  }

  getPaginatedData() {
    let data = {
      currentPage: this.state.currentPage,
      companyName: this.state.companyName,
    }
    axios.post(backendServer + '/jobs/paginatedData', data).then((response) => {
      console.log(response.data, response.status)
      if (response.status === 200 && response.data.length > 0) {
        this.setState({
          jobs: response.data,
        })
      }
    })
  }

  calculateDaysSincePosted() {
    let jobs = this.state.jobs
    for (let x in jobs) {
      jobs[x].jobPostedDate = this.calculateDays(jobs[x].jobPostedDate)
    }

    this.setState({
      jobs: jobs,
    })
  }

  calculateDays(jobPostedDate) {
    console.log(jobPostedDate)
    const oneDay = 24 * 60 * 60 * 1000 // hours*minutes*seconds*milliseconds
    const jobDate = new Date(jobPostedDate)
    const firstDate = new Date(
      jobDate.getFullYear(),
      jobDate.getMonth() + 1,
      jobDate.getDate(),
    )
    const today = new Date()
    const secondDate = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    )
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay))
    console.log('Posted difference days')
    console.log(diffDays)
    return diffDays
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

  async handleFindJobs() {
    console.log('In find')
    console.log(this.state.whereVal, this.state.whatVal)
    let job = []
    let totalCount = 0
    let currentPage = this.state.currentPage
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
        companyName: this.state.companyName,
      }
      await axios
        .post(backendServer + '/jobs/filterOnLocationAndTitle', data)
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
              this.setState(
                {
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
                },
                () => {
                  this.calculateDaysSincePosted()
                },
              )
            }
          }
        })
    } else if (this.state.whereVal.length && !this.state.whatVal) {
      console.log('only where')
      let data = {
        currentPage: 1,
        keyword: this.state.whereVal,
        companyName: this.state.companyName,
      }
      await axios
        .post(backendServer + '/jobs/filterOnLocation', data)
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
              this.setState(
                {
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
                },
                () => {
                  this.calculateDaysSincePosted()
                },
              )
            }
          }
        })
    } else if (!this.state.whereVal.length && this.state.whatVal) {
      console.log('only what')
      let data = {
        currentPage: 1,
        keyword: this.state.whatVal,
        companyName: this.state.companyName,
      }
      await axios
        .post(backendServer + '/jobs/filterOnJobTitleOrCompanyName', data)
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
              this.setState(
                {
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
                },
                () => {
                  this.calculateDaysSincePosted()
                },
              )
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
        this.getAppliedStatus(job.jobId)
      },
    )
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

  // paginate = (pageNumber) => {
  //   console.log(pageNumber)
  //   this.setState(
  //     {
  //       currentPage: pageNumber,
  //     },
  //     () => {
  //       this.getPaginatedData()
  //     },
  //   )
  // }
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
    return (
      <div>
        <CompanyTabs />
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
                      //sx={{ width: 180, borderBottom: 'none' }}
                      value={this.state.whatVal}
                      onChange={this.handleWhatVal.bind(this)}
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
                      onChange={this.handleWhereVal}
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
                        style={{ width: '32px', height: '32px' }}
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
                      <p class="card-text">{job.shortJobDescription}</p>
                      <br />
                      <p class="card-text">{job.jobPostedDate} days ago</p>
                    </div>
                  </div>
                ))}
              </div>
              {this.state.noJobs ? null : (
                <div class="col-5">
                  <div class="card cardStyle">
                    <div class="card-body">
                      <h4 class="card-title">{this.state.roleName}</h4>
                      <h6 class="card-title">{this.state.companyName}</h6>
                      <h6 class="card-title">
                        {this.state.city}, {this.state.state}
                      </h6>
                      <h6 class="card-title">{this.state.zip}</h6>
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="Third group"
                      >
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
                      <h6 style={{ fontWeight: 'bold' }}>
                        What you will need:
                      </h6>
                      <h6 style={{ whiteSpace: 'pre-wrap', color: '#262626' }}>
                        {this.state.qualifications}
                      </h6>
                      <br />
                      <h6 style={{ fontWeight: 'bold' }}>
                        Why You’ll love working:
                      </h6>
                      <h6 style={{ whiteSpace: 'pre-wrap', color: '#262626' }}>
                        {this.state.loveJobRole}
                      </h6>
                      <br />
                    </div>
                  </div>
                </div>
              )}
              <div class="col-1"></div>
            </div>
          </div>
        </div>
        {/* <Pagination
          postsPerPage={5}
          totalPosts={this.state.totalPosts}
          paginate={this.paginate}
        /> */}{' '}
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
  companyInfo: state.company,
  userInfo: state.userInfo,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CompanyJobs))
