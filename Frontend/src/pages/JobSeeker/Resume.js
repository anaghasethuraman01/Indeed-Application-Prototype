import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector, useDispatch } from 'react-redux'
import JobSeekerNavbar from './JobSeekerNavbar'
import backendServer from '../../webConfig.js'
import { Redirect } from 'react-router'
import React, { useEffect } from 'react'
import { Button, Form, Dropdown } from 'react-bootstrap'
import { useState } from 'react'
import { userActionCreator } from '../../reduxutils/actions.js'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import ErrorMsg from '../Error/ErrorMsg'
import SuccessMsg from '../Success/SuccessMsg'
import JobSeekerLoggedInNavbar from './JobSeekerLoggedInNavbar'

function Resume(props) {
  const dispatch = useDispatch()
  const [hideSkip, setHideSkip] = useState(false)
  const [redirectTo, setRedirectTo] = useState(null)
  const [hideDiv, setHideDiv] = useState(true)
  const [errMsg, setErrMsg] = useState('')
  const [resumeHeading, setResumeHeading] = useState('Add a resume to Indeed')
  const [resumeTextUpload, setResumeTextUpload] = useState('Upload your resume')
  const [resumeTextCreate, setResumeTextCreate] = useState(
    'Create a new resume',
  )
  const [hideContactDiv, setHideContactDiv] = useState(true)
  const [resumeFileName, setResumeFileName] = useState('')

  const token = useSelector((state) => state.userInfo.token)
  let fullname = useSelector((state) => state.userInfo.name)
  const id = useSelector((state) => state.userInfo.id)
  const phone = useSelector((state) => state.userInfo.phone)
  const email = useSelector((state) => state.userInfo.email)
  const resumeUrl = useSelector((state) => state.userInfo.resumeUrl)

  const logout = bindActionCreators(userActionCreator.logout, dispatch)
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
    setHideSkip(true)
    setHideDiv(false)
  }
  let collapseContactInfo = () => {
    setHideContactDiv(true)
  }
  let expandContactInfo = () => {
    setHideContactDiv(false)
  }
  let updateBasicInfo = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const fname = formData.get('fname')
    const lname = formData.get('lname')
    const name = fname + ' ' + lname
    const emailId = formData.get('email')
    const phoneno = formData.get('phone')
    const data = {}
    if (name != fullname) data.name = name
    if (phoneno != phone) data.jobSeekerContact = phoneno
    if (email != emailId) data.email = emailId
    if (Object.keys(data).length > 0) {
      axios.defaults.headers.common['authorization'] = token
      axios
        .post(backendServer + '/api/updateJobSeekerProfile', {
          id: id,
          data: data,
        })
        .then((res) => {
          if (res.data.code == '200') {
            setEmail(emailId)
            setName(name)
            setPhone(phoneno)
            showSuccessModal(true)
            if (email != emailId) {
              showSuccessModal(true)
              setErrMsg(
                'Successfully updated user data. Since you changed email, you will be logged out. Please login again.',
              )
              setTimeout(function () {
                logout(true)
                setRedirectTo(<Redirect to="/landingPage" />)
              }, 1500)
            } else setErrMsg('Successfully updated user data')
          } else {
            setErrMsg(res.data.msg)
            showErrorModal(true)
            console.log(res.data.err)
          }
        })
        .catch((err) => {
          console.log(err)
          setErrMsg(
            'Failed to update Profile. Please refer console for more details',
          )
          showErrorModal(true)
        })
    }
  }

  const hiddenFileInput = React.useRef(null)
  const [noResume, setNoResume] = useState(true)
  let uploadResume = async (e) => {
    hiddenFileInput.current.click()
  }

  let handleResumeUpload = (e) => {
    const fileUploaded = e.target.files[0]
    if (fileUploaded != null) {
      const filename = fileUploaded.name
      //console.log('Successfully uploaded ',filename);
      var data = new FormData()
      data.append('file', fileUploaded)
      axios.defaults.headers.common['authorization'] = token
      axios
        .post(backendServer + '/api/uploadResume/' + id, data)
        .then((res) => {
          console.log(res)
          if (res.data.code == '200') {
            setResumeUrl(res.data.location)
            setNoResume(false)
            hideResumeUpdate()
            if (
              res.data.location != null &&
              res.data.location.trim().length > 0
            ) {
              let keyarr = res.data.location.split('/')
              let key = keyarr[keyarr.length - 1]
              setResumeFileName(key)
            }
          } else {
            console.log('Error while uploading file', res.data)
            showErrorModal(true)
            let ermsg =
              'Failed to Upload resume. Please refer console for more details'
            if (res.data.msg.message != null) ermsg = res.data.msg.message
            else if (res.data.msg != null) ermsg = res.data.msg
            setErrMsg(ermsg)
            //setNoResume(true);
          }
        })
    }
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
        <div
          className="row"
          hidden={hideDiv}
          style={{
            border: '1px solid darkgray',
            boxShadow: '1px 1px 1px 1px darkgray',
            padding: '20px 20px 5px 20px',
          }}
        >
          <b>
            Contact Information{' '}
            <img
              src="/images/pencil.png"
              height="15px"
              width="15px"
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={expandContactInfo}
            />
          </b>
          <p></p>
          <div hidden={hideContactDiv}>
            <p>
              <span style={{ color: 'red' }}>* </span>
              <small style={{ color: 'darkgray' }}>Required Fields</small>
            </p>
            <Form onSubmit={updateBasicInfo}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>First Name </b>
                  <span style={{ color: 'red' }}>* </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  defaultValue={fname}
                  required
                  maxLength="45"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>Last Name </b>
                  <span style={{ color: 'red' }}>* </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  defaultValue={lname}
                  required
                  maxLength="45"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>Email Address </b>
                  <img src="/images/padlock.png" height="15px" width="15px" />
                  <span style={{ color: 'darkgray', fontSize: '12px' }}>
                    only provided to employers you apply or respond to.
                  </span>
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  defaultValue={email}
                  required
                  maxLength="45"
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>Phone Number (optional)</b>
                  <img src="/images/padlock.png" height="15px" width="15px" />
                  <span style={{ color: 'darkgray', fontSize: '12px' }}>
                    only provided to employers you apply or respond to.
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  defaultValue={phone}
                  pattern="[0-9]{10}"
                  title="Please enter a 10 digit phone number"
                  maxLength="10"
                ></Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Save
              </Button>
              &nbsp;
              <Button variant="primary" onClick={collapseContactInfo}>
                Cancel
              </Button>
            </Form>
          </div>
          <div hidden={!hideContactDiv}>
            <p>
              {email}{' '}
              <img src="/images/padlock.png" height="15px" width="15px" />
            </p>
            {phone != null && phone.length > 0 && (
              <p>
                {phone}{' '}
                <img src="/images/padlock.png" height="15px" width="15px" />
              </p>
            )}
            {(phone == null || phone.length == 0) && (
              <p>
                <small>
                  <b>Add phone number</b>
                </small>
              </p>
            )}
          </div>
          <p></p>
        </div>
        <br></br>
        <div
          className="row"
          hidden={hideDiv}
          style={{
            border: '1px solid darkgray',
            boxShadow: '1px 1px 1px 1px darkgray',
            padding: '20px 20px 5px 20px',
          }}
        >
          <b>
            Job Preferences{' '}
            <img
              src="/images/pencil.png"
              height="15px"
              width="15px"
              style={{ float: 'right', cursor: 'pointer' }}
              onClick={() => setRedirectTo(<Redirect to="/preferences" />)}
            />
          </b>
          <p></p>
          <p></p>
          <p>
            <small style={{ color: 'darkgray' }}>
              Save specific details like desired pay and schedule that help us
              match you with better jobs
            </small>
          </p>
        </div>
        <br></br>
      </div>
      <p></p>
      <p style={{ textAlign: 'center' }}>
        <b>
          <u
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={hideResumeUpdate}
            hidden={hideSkip}
          >
            Skip for now
          </u>
        </b>
      </p>
    </div>
  )
}

export default Resume
