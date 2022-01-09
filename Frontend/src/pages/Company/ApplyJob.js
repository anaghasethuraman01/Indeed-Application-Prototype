import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from 'react-redux'
import backendServer from '../../webConfig.js'
import { Redirect } from 'react-router'
import React, { useEffect } from 'react'
import { Button, Form, Dropdown } from 'react-bootstrap'
import { useState } from 'react'
import {
  userActionCreator,
  companyActionCreator,
} from '../../reduxutils/actions.js'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import { RatingView } from 'react-simple-star-rating'
import ErrorMsg from '../Error/ErrorMsg'
import SuccessMsg from '../Success/SuccessMsg'
import JobSeekerLoggedInNavbar from '../JobSeeker/JobSeekerLoggedInNavbar'

function ApplyJobs(props) {
  const dispatch = useDispatch()
  const [redirectTo, setRedirectTo] = useState(null)
  const [hideDiv, setHideDiv] = useState(true)
  const [errMsg, setErrMsg] = useState('')
  const [resumeHeading, setResumeHeading] = useState('Add a resume to Indeed')
  const [resumeTextUpload, setResumeTextUpload] = useState('Upload your resume')
  const [resumeTextCreate, setResumeTextCreate] = useState(
    'Create a new resume',
  )
  const [resumeFileName, setResumeFileName] = useState('')
  const [roleName, setRoleName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [rating, setRating] = useState('')
  const [reviewCount, setReviewCount] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [jobType, setJobType] = useState('')
  const [salary, setSalary] = useState('')
  const [location, setLocation] = useState('')
  const [responsibilities, setResponsibilities] = useState('')
  const [qualifications, setQualifications] = useState('')
  const [loveJobRole, setLoveJobRole] = useState('')
  const [applied, setApplied] = useState('')

  const token = useSelector((state) => state.userInfo.token)
  let fullname = useSelector((state) => state.userInfo.name)
  const id = useSelector((state) => state.userInfo.id)
  const phone = useSelector((state) => state.userInfo.phone)
  const email = useSelector((state) => state.userInfo.email)
  const resumeUrl = useSelector((state) => state.userInfo.resumeUrl)
  const jobId = useSelector((state) => state.company.jobid)
  const companyId = useSelector((state) => state.company.compid)

  const logout = bindActionCreators(userActionCreator.logout, dispatch)
  const setCompId = bindActionCreators(companyActionCreator.setCompId, dispatch)
  const setCompName = bindActionCreators(
    companyActionCreator.setCompName,
    dispatch,
  )
  const showSuccessModal = bindActionCreators(
    userActionCreator.showSuccessModal,
    dispatch,
  )
  const setEmail = bindActionCreators(userActionCreator.setEmail, dispatch)
  const showErrorModal = bindActionCreators(
    userActionCreator.showErrorModal,
    dispatch,
  )
  const setName = bindActionCreators(userActionCreator.setName, dispatch)
  const setPhone = bindActionCreators(userActionCreator.setPhone, dispatch)
  const setResumeUrl = bindActionCreators(
    userActionCreator.setResumeUrl,
    dispatch,
  )
  //const[showContactDiv, setShowContactDiv] = useState(true);

  useEffect(() => {
    if (resumeUrl != null && resumeUrl.length > 0) {
      let keyarr = resumeUrl.split('/')
      let key = keyarr[keyarr.length - 1]
      setResumeFileName(key)
      hideResumeUpdate()
    }
    getAllData()
  }, [])

  let nameArr = fullname.split(/\s+/)
  const [fname, ...lnames] = nameArr
  let lname = ''
  for (let ln of lnames) {
    lname += ln
  }
  let hideResumeUpdate = () => {
    if (resumeUrl != null && resumeUrl.length > 0) {
      setNoResume(false)
      let keyarr = resumeUrl.split('/')
      let key = keyarr[keyarr.length - 1]
      setResumeFileName(key)
      setResumeHeading('Resume')
    } else {
      setResumeTextUpload('Upload a resume')
      setResumeTextCreate('Build a resume')
      setResumeHeading('Get Started')
    }
    setHideDiv(false)
  }

  const hiddenFileInput = React.useRef(null)
  const [noResume, setNoResume] = useState(true)
  let uploadResume = async (e) => {
    hiddenFileInput.current.click()
  }

  let getAllData = async () => {
    await axios.get(backendServer + '/jobSeeker/home').then(
      (response) => {
        if (response.status === 200 && response.data.length > 0) {
          console.log(response.data, response.status)
          //let jobId = parseInt(jobId)
          console.log('filtering jobs for job id: ' + jobId)

          let job = response.data.filter((job) => job.jobId === jobId)
          console.log(typeof jobId)

          console.log('filtered job id: ')
          console.log(job)
          if (job.length > 0) {
            job = job[0]
            console.log('filtered job id: ')
            console.log(job)
            setRoleName(job.jobTitle)
            setCompanyName(job.companyName)
            setCity(job.city)
            setState(job.state)
            setZip(job.zip)
            setJobType(job.jobMode)
            setSalary(job.salaryDetails)
            setLocation(job.city)
            setResponsibilities(job.responsibilities)
            setQualifications(job.qualifications)
            setLoveJobRole(job.loveJobRole)

            let companyId = parseInt(job.companyId)

            getReviewsAndRatings(companyId)
          }
        }
      },
      (error) => {
        console.log(error)
      },
    )
  }

  let getReviewsAndRatings = (companyId) => {
    console.log('getting reviews for....: ' + companyId)
    const data = { companyId: companyId }
    axios
      .post(backendServer + '/jobSeeker/getCompanyRatingAndReviews', data)
      .then(
        (response) => {
          console.log('Ratings and Reviews')
          console.log(response.data, response.status)
          if (response.status === 200 && response.data.length > 0) {
            setRating(response.data[0].companyAvgRating)
            setReviewCount(response.data[0].noOfReviews)
          }
        },
        (error) => {
          console.log(error)
        },
      )
  }

  let getCurrentDate = () => {
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
    return year + '-' + (dateObj.getMonth() + 1) + '-' + day
  }

  let handleCompanyLink = async (e) => {
    setCompName(companyName)
    setCompId(companyId)

    let data = { id: companyId }
    console.log(data)
    await axios
      .post(backendServer + '/jobSeeker/updateNoOfViews', data)
      .then((response) => {
        console.log(response.data, response.status)
      })

    setRedirectTo(<Redirect to="/snapshot" />)
  }

  let handleApply = (e) => {
    const appliedDate = getCurrentDate()
    const data = { appliedDate, jobId, id, companyId }
    console.log(data)
    axios.defaults.headers.common['authorization'] = token
    axios.post(backendServer + '/jobSeeker/applyJob', data).then((response) => {
      console.log(response.data, response.status)
      if (response.status === 200) {
        setApplied(true)
      }
    })
  }

  let handleResumeUpload = (e) => {
    const fileUploaded = e.target.files[0]
    const filename = fileUploaded.name
    console.log('Successfully uploaded ', filename)
    var data = new FormData()
    data.append('file', fileUploaded)
    axios.defaults.headers.common['authorization'] = token
    axios.post(backendServer + '/api/uploadResume/' + id, data).then((res) => {
      console.log(res)
      if (res.data.code == '200') {
        setResumeUrl(res.data.location)
        setNoResume(false)
        hideResumeUpdate()
      } else {
        console.log('Error while uploading file', res.data)
        showErrorModal(true)
        setErrMsg(
          'Failed to upload file. Please refer browser console for more details',
        )
        setNoResume(true)
      }
    })
  }
  let handleResumeReplace = (e) => {
    e.preventDefault()
    //handleResumeDelete(e);
    uploadResume()
  }
  let handleResumeDelete = async (e) => {
    e.preventDefault()
    let keyarr = resumeUrl.split('/')
    let key = keyarr[keyarr.length - 1]
    axios.defaults.headers.common['authorization'] = token
    await axios
      .delete(backendServer + '/api/deleteResume/' + key + '/' + id)
      .then((res) => {
        console.log(res)
        if (res.status == '200') {
          setNoResume(true)
          setResumeUrl('')
        } else {
          showErrorModal(true)
          setErrMsg(res.data)
        }
      })
  }

  let handleResumeDownload = (e) => {
    e.preventDefault()
    let keyarr = resumeUrl.split('/')
    let key = keyarr[keyarr.length - 1]
    axios.get(backendServer + '/api/downloadResume/' + key).then((res) => {
      console.log(res)
      if (res.status == '200') {
        download(res.data)
      } else {
        showErrorModal(true)
        setErrMsg(res.data)
      }
    })
  }
  function download(url) {
    let keyarr = resumeUrl.split('/')
    console.log(keyarr)
    let key = keyarr[keyarr.length - 1]
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${key}`)
    document.body.appendChild(link)
    link.click()
  }
  return (
    <div>
      {redirectTo}
      <ErrorMsg err={errMsg}></ErrorMsg>
      <SuccessMsg msg={errMsg}></SuccessMsg>
      <JobSeekerLoggedInNavbar />
      <div
        className="container-fullwidth"
        style={{
          marginTop: '5%',
          marginRight: 'auto',
          marginLeft: 'auto',
          width: '50%',
        }}
      >
        <div className="row" hidden={hideDiv}>
          <h3 style={{ color: 'darkgray' }}>
            <b>Your Name</b>
          </h3>
        </div>
        <div
          className="row"
          style={{
            border: '1px solid darkgray',
            boxShadow: '1px 1px 1px 1px darkgray',
            padding: '20px 20px 5px 20px',
          }}
          hidden={noResume}
        >
          <b>{resumeHeading} </b>
          <p></p>
          <div className="col" style={{ float: 'left' }}>
            <img src="/images/docs.png" height="40px" width="40px"></img>
            {resumeFileName}
          </div>
          <div className="col">
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-light"
                id="dropdown-basic"
                style={{ float: 'right' }}
              >
                <img src="/images/dots.png" height="20px" width="20px"></img>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleResumeDownload}>
                  Download
                </Dropdown.Item>
                <Dropdown.Item onClick={handleResumeDelete}>
                  Delete
                </Dropdown.Item>
                <Dropdown.Item onClick={handleResumeReplace}>
                  Replace
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <p></p>
        </div>
        <br></br>
        <div
          className="row"
          style={{
            border: '1px solid darkgray',
            boxShadow: '1px 1px 1px 1px darkgray',
            padding: '20px 20px 5px 20px',
          }}
          hidden={!noResume}
        >
          <h3>
            <b>{resumeHeading}</b>
          </h3>
          <p></p>
          <div className="col">
            <input
              type="file"
              id="resumeupload"
              style={{ display: 'none' }}
              ref={hiddenFileInput}
              onChange={handleResumeUpload}
            ></input>
            <Button
              type="primary"
              style={{ borderRadius: '15px 15px 15px 15px' }}
              onClick={uploadResume}
            >
              {resumeTextUpload}
            </Button>
          </div>
          <div className="col">
            <Button
              type="primary"
              style={{ borderRadius: '15px 15px 15px 15px' }}
            >
              {resumeTextCreate}
            </Button>
          </div>
          <p></p>
          <p>
            <small style={{ color: 'darkgray' }}>
              By continuing, you agree to create a public resume and agree to
              receiving job opportunities from employers.
            </small>
          </p>
        </div>
        <br></br>

        <div class="col-5">
          <div class="card cardStyle" style={{ width: '700px' }}>
            <div class="card-body">
              <h4 class="card-title">{roleName}</h4>
              <h6 class="card-title companyNameCss" onClick={handleCompanyLink}>
                {companyName}
              </h6>
              <RatingView ratingValue={rating} />
              <br />
              <h6 class="card-title">{reviewCount} reviews</h6>
              <h6 class="card-title">
                {city}, {state}
              </h6>
              <h6 class="card-title">{zip}</h6>
              <br />
              <br />
              <div class="btn-group" role="group" aria-label="Third group">
                {applied ? (
                  <button
                    type="button"
                    class="btn applybtn"
                    id={jobId}
                    disabled
                  >
                    <h5 style={{ marginTop: '4px', color: 'white' }}>
                      Applied
                    </h5>
                  </button>
                ) : (
                  <button
                    type="button"
                    class="btn applybtn"
                    onClick={handleApply}
                    id={jobId}
                  >
                    <h5 style={{ marginTop: '4px', color: 'white' }}>Apply</h5>
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
              <h6>{jobType}</h6> <br />
              <h6 style={{ fontWeight: 'bold' }}>Salary:</h6>
              <h6>${salary}</h6>
              <br />
              <hr />
              <h5 class="card-title">Full Job Description</h5>
              <br />
              <h6 style={{ fontWeight: 'bold' }}>Location:</h6>
              <h6>{location}</h6>
              <br />
              <h6 style={{ fontWeight: 'bold' }}>What you will do:</h6>
              <h6 style={{ whiteSpace: 'pre-wrap', color: '#262626' }}>
                {responsibilities}
              </h6>
              <br />
              <h6 style={{ fontWeight: 'bold' }}>What you will need:</h6>
              <h6 style={{ whiteSpace: 'pre-wrap', color: '#262626' }}>
                {qualifications}
              </h6>{' '}
              <br />
              <h6 style={{ fontWeight: 'bold' }}>Why You’ll love working:</h6>
              <h6 style={{ whiteSpace: 'pre-wrap', color: '#262626' }}>
                {loveJobRole}
              </h6>{' '}
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplyJobs
