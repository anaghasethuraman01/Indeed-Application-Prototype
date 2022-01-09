// Job Seeker Landing Page
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../CSS/JobSeekerLanding.css'
import TextField from '@mui/material/TextField'
import { makeStyles } from '@material-ui/styles'
import Autocomplete from '@mui/material/Autocomplete'
import axios from 'axios'
import JobSeekerNavbar from './JobSeekerNavbar'
import backgroundImg from '../../CSS/findSalary.png'
import Card from "react-bootstrap/Card";
import backendServer from '../../webConfig';
import '../../CSS/FindSalary.css'
import JobSeekerLoggedInNavbar from './JobSeekerLoggedInNavbar'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class FindSalaries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      whatVal: '',
      whereVal: '',
      allJobs: [],
      jobs: [],
      whatSearch: [],
      whereSearch: [],
      roleName: '',
      companyName: '',
      city: '',
      state: '',
      zip: '',
      jobType: '',
      salary: '',
      location: '',
      isLoggedIn: false,
    }
  }


  checkLoggedInStatus() {
    const userInfo = this.props.userInfo
    console.log(userInfo)
    if (userInfo.email !== '' && userInfo.accountType === 'JobSeeker') {
      console.log('JobSeeker is signed in')
      this.setState({
        isLoggedIn: true,
      })
    }
  }

  componentDidMount() {
    this.checkLoggedInStatus()
    axios.get(`${backendServer}/findSalaries`).then(
      (response) => {
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

        let job = response.data[0]

        this.setState({
          jobs: this.state.jobs.concat(response.data),
          allJobs: this.state.allJobs.concat(response.data),
          whatSearch: whatSearch,
          whereSearch: whereSearch,
          roleName: job.jobTitle,
          companyName: job.companyName,
          city: job.city,
          state: job.state,
          zip: job.zip,
          jobType: job.jobMode,
          salary: job.salaryDetails,
          location: job.city,
        })
      },
      (error) => {
        console.log(error)
      },
    )
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
    console.log(this.state.whereVal, this.state.whatVal)
    let job = []
    if (this.state.whereVal.length && this.state.whatVal) {
      console.log('What and where')
      job = this.state.allJobs.filter(
        (job) =>
          (job.city === this.state.whereVal ||
            job.state === this.state.whereVal ||
            job.zip === this.state.whereVal) &&
          (job.jobTitle === this.state.whatVal ||
            job.location === this.state.whatVal ||
            job.companyName === this.state.whatVal),
      )
    } else if (this.state.whereVal.length && !this.state.whatVal) {
      console.log('only where')
      job = this.state.allJobs.filter(
        (job) =>
          job.city === this.state.whereVal ||
          job.state === this.state.whereVal ||
          job.zip === this.state.whereVal,
      )
    } else if (!this.state.whereVal.length && this.state.whatVal) {
      console.log('only what')
      job = this.state.allJobs.filter(
        (job) =>
          job.jobTitle === this.state.whatVal ||
          job.location === this.state.whatVal ||
          job.companyName === this.state.whatVal,
      )
    }

    if (job.length > 0)
      this.setState({
        jobs: job,
        roleName: job[0].jobTitle,
        companyName: job[0].companyName,
        city: job[0].city,
        state: job.state,
        zip: job[0].zip,
        jobType: job[0].jobMode,
        salary: job[0].salaryDetails,
        location: job[0].city,
      })
  }

  handleCardClick = (evt) => {
    console.log(evt.currentTarget.id)
    let jobTitle = parseInt(evt.currentTarget.id)
    let job = this.state.allJobs.filter((job) => job.jobTitle === jobTitle)[0]

    // console.log(job.jobTitle)

    this.setState({
      roleName: job.jobTitle,
      companyName: job.companyName,
      city: job.city,
      state: job.state,
      zip: job.zip,
      jobType: job.jobMode,
      salary: job.salaryDetails,
      location: job.city,
    })
  }

  render() {
    return (
      <div>
        <div style={{ backgroundImage: `url(${backgroundImg})`,objectFit:'contain'}}>
        {this.state.isLoggedIn ? (
          <JobSeekerLoggedInNavbar />
        ) : (
          <JobSeekerNavbar />
        )}
          <div id="Second" class="row searchNav" >
          <div class="row">
            <div class="col-1"></div>
                <div class="col-3">
                  <h5>
                    <span style={{ color: '#003399' , fontWeight: 'bolder', fontSize: '30px'}}>
                    Find a career you'll love
                    </span>
                  </h5>
                </div>
            <div class="col-4"></div>
          </div>

          <div class="row" style={{ marginTop: '10px',marginBottom: '20px'  }}>
          <div class="col-1"></div>
              <div class="col-5">
                <h5>
                Explore which careers have the highest job satisfaction, best salaries, and more.
                </h5>
              </div>
          <div class="col-4"></div>
          </div>
        </div>

      {/* Search bars */}

        <div class="row" >
          <div class="col-1"></div>
            <div class="col-9">
              <div class="row" >
                <div class="col-4">
                  <div class="input-group mb-3" >
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
                      sx={{ width: 180, borderBottom: 'none' }}
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
                      sx={{ width: 180, borderBottom: 'none' }}
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
                      Search
                    </h5>
                  </button>
                </div>
              </div>
            </div>
        </div>
      <hr />
    </div>  

    {/* render details */}

<div className="App">
    <div className="card-container">
        {this.state.jobs.map((job) => (  
            <div class="card" id={job.jobTitle} 
            // onClick={this.handleCardClick}
            style={{marginTop:'1.5rem',marginInline:'1.5rem',width:'250px'}}>
                <div class="card-body">
                    <h5 class="card-title" 
                    style={{"&hover":"pointer"}}
                    onClick={() => {
                          window.location = `/findSalByTitle/${job.jobTitle}`;
                        }}>{job.jobTitle} </h5>
                    {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                    <p class="card-text">Average Salary ${job.salaryDetails}/year</p>
                    <hr/>
                    {/* <p>Skills</p> */}
                    <a href="#" class="card-link">Skills</a>
                    <a href="/landingPage" class="card-link" >Job Openings</a>
                </div>
            </div>
          ))}
        </div>
     </div>    
</div> 

    )
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
})
// export default FindSalaries
export default connect(
  mapStateToProps
)(withRouter(FindSalaries))

